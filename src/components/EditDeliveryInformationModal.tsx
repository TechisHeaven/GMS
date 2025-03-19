import React, { useState } from "react";
import Modal from "./Modal";

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    fullName: string;
    country: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    useAsBilling: boolean;
  };
  onSave: (data: any) => void;
}

const EditDeliveryInformationModal: React.FC<EditAddressModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [formData, setFormData] =
    useState<EditAddressModalProps["initialData"]>(initialData);
  const [errors, setErrors] = useState<
    Partial<EditAddressModalProps["initialData"]>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<EditAddressModalProps["initialData"]> = {};
    if (!formData.fullName) newErrors.fullName = "Required";
    if (!formData.address) newErrors.address = "Required";
    if (!formData.city) newErrors.city = "Required";
    if (!formData.state) newErrors.state = "Required";
    if (!formData.zipCode) newErrors.zipCode = "Required";
    if (!formData.phone) newErrors.phone = "Required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Handle form submission
    }
    onSave(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is edited
    if (errors[name as keyof EditAddressModalProps["initialData"]]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Delivery Information">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Evan"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>
        </div>

        {/* Country Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination/Region <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            defaultValue={"India (IND)"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="India (IND)">India (IND)</option>
          </select>
        </div>

        {/* Address Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter delivery address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Apartment, suite, etc. (optional)"
            />
          </div>

          <button type="button" className="text-blue-500 text-sm">
            Add another address
          </button>
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Lagos"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-500">{errors.state}</p>
            )}
          </div>
        </div>

        {/* Zip Code and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.zipCode ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="100001"
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+91 8034582047"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Billing Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="useAsBilling"
            name="useAsBilling"
            checked={formData.useAsBilling}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="useAsBilling"
            className="ml-2 block text-sm text-gray-700"
          >
            Use as billing address
          </label>
        </div>

        {/* Submit Button */}
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

export default EditDeliveryInformationModal;
