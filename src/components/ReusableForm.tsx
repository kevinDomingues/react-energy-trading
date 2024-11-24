import React, { FC } from 'react';

interface Option {
    label: string;
    value: any;
  }
  
  interface FieldProps {
    label: string;
    type: string; // "text", "number", "select", etc.
    name: string;
    value: any;
    options?: Option[]; // Options for "select" type fields
    min?: number;
    max?: number;
    required?: boolean;
  }
  
  interface ReusableFormProps {
    fields: FieldProps[];
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error?: string;
    successMessage?: string;
    loading?: boolean;
    buttonText?: string;
    isSecondary?: boolean;
  }
  
  const ReusableForm: FC<ReusableFormProps> = ({
    fields,
    onSubmit,
    onChange,
    error,
    successMessage,
    loading = false,
    buttonText = 'Submit',
    isSecondary = false
  }) => {
    return (
      <form onSubmit={onSubmit} className={`max-w-md mx-auto bg-white ${!isSecondary && "shadow-md" } rounded-lg p-6`}>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
  
        {fields.map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-700">{field.label}</label>
            {field.type === 'select' && field.options ? (
              <select
                name={field.name}
                value={field.value}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required={field.required}
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                min={field.min}
                max={field.max}
                required={field.required}
              />
            )}
          </div>
        ))}
  
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          {loading ? 'Loading...' : buttonText}
        </button>
      </form>
    );
  };
  
  export default ReusableForm;
