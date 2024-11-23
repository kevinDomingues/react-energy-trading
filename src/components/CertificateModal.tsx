import React, { FC, useState } from 'react';
import ReusableForm from './ReusableForm';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;  // Add appropriate type for formData if desired
}

const CertificateModal: FC<CertificateModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    quantity: 1
  });

  const fields = [
    {
      label: 'Quantity',
      type: 'number',
      name: 'quantity',
      value: formData.quantity,
      min: 1,
      required: true,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'usableMonth' || name === 'usableYear' || name === 'energyType' ? parseInt(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Buy Energy Certificate</h2>

        <ReusableForm
          fields={fields}
          onSubmit={handleSubmit}
          onChange={handleChange}
          error={''}
          successMessage={''}
          loading={false}
          buttonText="Create Certificate"
        />
      </div>
    </div>
  );
};

export default CertificateModal;
