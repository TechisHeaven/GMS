import React, { useState } from "react";
import Modal from "./Modal";

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    street: string;
    apartment: string;
    city: string;
    state: string;
    zip: string;
  };
  onSave: (data: any) => void;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Address">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            className="w-full px-3 py-2 border-gray-200 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apartment
          </label>
          <input
            type="text"
            value={formData.apartment}
            onChange={(e) =>
              setFormData({ ...formData, apartment: e.target.value })
            }
            className="w-full px-3 py-2 border-gray-200 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-3 py-2 border-gray-200 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            className="w-full px-3 py-2 border-gray-200 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            value={formData.zip}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            className="w-full px-3 py-2 border-gray-200 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-800 text-white font-medium rounded-md hover:bg-teal-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditAddressModal;
