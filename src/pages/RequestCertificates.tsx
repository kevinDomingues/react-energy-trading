import React, { FC, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { apiURL } from '../constants/apiURL';
import ReusableForm from '../components/ReusableForm';
import CertificateModal from '../components/CertificateModal';
import { getEnergyTypeKey } from '../constants/consumptionUtils';
import { useNavigate } from 'react-router-dom';

interface CertificateItem {
  energyCertificateId: string;
  ownerId: string;
  producerId: string;
  emissionDate: string;
  usableMonth: number;
  usableYear: number;
  regulatoryAuthorityID: string;
  energyType: number;
}

interface CertificatesResponse {
  response: CertificateItem[]
}

interface CertificateFormData {
  usableMonth: number;
  usableYear: number;
  energyType: number;
}

const RequestCertificate: FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); 
  const [formData, setFormData] = useState<CertificateFormData>({
    usableMonth: 12,
    usableYear: 2024,
    energyType: 1,
  });
  const [data, setData] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleBuySubmit = async (buyFormData: any) => {
    setLoading(true);
    try {
      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      const quantity = buyFormData.quantity;
      const availableQuantity = data.length;


      const purchasedQuantity = Math.min(quantity, availableQuantity);
      if (purchasedQuantity === 0) {
        setError("No certificates available for purchase.");
        return;
      }

      const certificatesToBuy = data.slice(0, purchasedQuantity);

      for (const certificate of certificatesToBuy) {
        await axios.post(
          `${apiURL}/certificate/transfer`,
          {
            energyCertificateId: certificate.energyCertificateId,
            quantity: parseInt(quantity),
            availability: availableQuantity
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to create certificate. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        handleCloseModal();
        navigate("/certificates");
      }, 1000)
    }
  };

  const fields = [
    {
      label: 'Usable Month',
      type: 'number',
      name: 'usableMonth',
      value: formData.usableMonth,
      min: 1,
      max: 12,
      required: true,
    },
    {
      label: 'Usable Year',
      type: 'number',
      name: 'usableYear',
      value: formData.usableYear,
      min: 2023,
      required: true,
    },
    {
      label: 'Energy Type',
      type: 'select',
      name: 'energyType',
      value: formData.energyType,
      options: [
        { label: 'Any', value: 0 },
        { label: 'Solar', value: 1 },
        { label: 'Wind', value: 2 },
        { label: 'Hydro', value: 3 },
        { label: 'Geothermal', value: 4 },
        { label: 'Biomass', value: 5 },
      ],
      required: true,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      const urlBuilder = 
       formData.energyType != 0 ? `${formData.usableMonth}/${formData.usableYear}/type/${formData.energyType}` : `${formData.usableMonth}/${formData.usableYear}`

      const response = await axios.get<CertificatesResponse>(
        `${apiURL}/certificate/from/${urlBuilder}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.response);
      setFormData({ usableMonth: 12, usableYear: 2024, energyType: 1 });
    } catch (err) {
      setError("Failed to find certificates. Please try with a different date.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Request Energy Certificates</h1>
      {data.length > 0 ? (
        <div className="w-f">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Producer ID</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Emission Date</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Usable Month</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Usable Year</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Energy Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b">
                <td className="py-3 px-4">{item.producerId}</td>
                <td className="py-3 px-4">
                  {new Date(item.emissionDate).toLocaleDateString("en-US")}
                </td>
                <td className="py-3 px-4">{item.usableMonth}</td>
                <td className="py-3 px-4">{item.usableYear}</td>
                <td className="py-3 px-4">{getEnergyTypeKey(item.energyType)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 w-full container mx-auto text-center">
          <button
            onClick={handleOpenModal}
            disabled={loading}
            className="w-52 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Buy Certificates
          </button>
        </div>
        <CertificateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleBuySubmit}
          loading={loading}
        />
      </div>
      ) : (
        <ReusableForm
          fields={fields}
          onSubmit={handleSubmit}
          onChange={handleChange}
          error={error || ''}
          loading={loading}
          buttonText="Request Certificate"
        />
      )}
    </div>
  );
};

export default RequestCertificate;
