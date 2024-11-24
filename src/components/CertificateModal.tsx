import React, { FC, useEffect, useState } from 'react';
import ReusableForm from './ReusableForm';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  getPrice: (quantity: number) => Promise<number>;
  loading: boolean;
}

const CertificateModal: FC<CertificateModalProps> = ({ isOpen, onClose, onSubmit, loading, getPrice }) => {
  const [formData, setFormData] = useState({
    quantity: 1
  });
  const [price, setPrice] = useState(0);

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
  };

  useEffect(() => {
    const fetchPrice = async () => {
      if (formData.quantity != null) {
        try {
          const price = await getPrice(formData.quantity);
          if (price != null && price !== 0) {
            setPrice(price);
          }
        } catch (err) {
          console.log(err)
        }
      }
    }

    fetchPrice();
  }, [formData.quantity])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Buy Energy Certificate</h2>
        <div className="max-w-md mx-auto mb-4 px-6">
          <label className="block text-gray-700">Expected average energy price</label>
            <input
              type={'text'}
              name={"price"}
              value={price}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              disabled
            />
        </div>

        <ReusableForm
          fields={fields}
          onSubmit={handleSubmit}
          onChange={handleChange}
          error={''}
          successMessage={''}
          loading={loading}
          buttonText="Buy"
          isSecondary={true}
        />
      </div>
    </div>
  );
};

export default CertificateModal;
