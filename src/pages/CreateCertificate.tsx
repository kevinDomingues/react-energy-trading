import React, { FC, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { apiURL } from '../constants/apiURL';

interface CertificateFormData {
  usableMonth: number;
  usableYear: number;
  regulatoryAuthorityID: string;
}

const CreateCertificate: FC = () => {
  const { token } = useAuth(); 
  const [formData, setFormData] = useState<CertificateFormData>({
    usableMonth: 12,
    usableYear: 2024,
    regulatoryAuthorityID: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'usableMonth' || name === 'usableYear' ? parseInt(value) : value,
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

      await axios.post(
        `${apiURL}/certificate/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Certificate created successfully!");
      setFormData({ usableMonth: 12, usableYear: 2024, regulatoryAuthorityID: '' });
    } catch (err) {
      setError("Failed to create certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Create Energy Certificate</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Usable Month</label>
          <input
            type="number"
            name="usableMonth"
            value={formData.usableMonth}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            min={1}
            max={12}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Usable Year</label>
          <input
            type="number"
            name="usableYear"
            value={formData.usableYear}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            min={2023}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Regulatory Authority ID</label>
          <input
            type="text"
            name="regulatoryAuthorityID"
            value={formData.regulatoryAuthorityID}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          {loading ? 'Creating...' : 'Create Certificate'}
        </button>
      </form>
    </div>
  );
};

export default CreateCertificate;
