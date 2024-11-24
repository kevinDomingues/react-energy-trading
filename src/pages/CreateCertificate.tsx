import React, { FC, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { apiURL } from '../constants/apiURL';
import ReusableForm from '../components/ReusableForm';
import { useNavigate } from 'react-router-dom';

interface CertificateFormData {
  usableMonth: number;
  usableYear: number;
  quantity: number;
  energyType: number;
}

const CreateCertificate: FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); 
  const [formData, setFormData] = useState<CertificateFormData>({
    usableMonth: 12,
    usableYear: 2024,
    quantity: 1,
    energyType: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      min: 2024,
      required: true,
    },
    {
      label: 'Quantity',
      type: 'number',
      name: 'quantity',
      value: formData.quantity,
      min: 1,
      required: true,
    },
    {
      label: 'Energy Type',
      type: 'select',
      name: 'energyType',
      value: formData.energyType,
      options: [
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
    setSuccessMessage(null);

    try {
      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${apiURL}/certificate/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.message);
      setFormData({ usableMonth: 12, usableYear: 2024, quantity: 1, energyType: 1 });
    } catch (err) {
      setError("Failed to create certificate. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate("/certificates");
      }, 1000)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Create Energy Certificate</h1>
      <ReusableForm
          fields={fields}
          onSubmit={handleSubmit}
          onChange={handleChange}
          error={error || ''}
          successMessage={successMessage || ''}
          loading={loading}
          buttonText="Create Certificate"
        />
    </div>
  );
};

export default CreateCertificate;
