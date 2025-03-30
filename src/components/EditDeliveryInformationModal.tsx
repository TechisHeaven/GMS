import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "./Modal";

const schema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  pin: z.string().nonempty("Pin code is required"),
  phone: z.string().nonempty("Phone is required"),
  useAsBilling: z.boolean(),
  country: z.string().nonempty("Country is required"),
});

type FormData = z.infer<typeof schema>;

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: FormData;
  onSave: (data: FormData) => void;
}

const EditDeliveryInformationModal: React.FC<EditAddressModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof FormData, value);
      });
    }
  }, [initialData]);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    onSave(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Delivery Information">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("fullName")}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Evan"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Country Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination/Region <span className="text-red-500">*</span>
          </label>
          <select
            {...register("country")}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="India">India (IND)</option>
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-500">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Address Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("address")}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter delivery address"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("city")}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Lagos"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("state")}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-500">
                {errors.state.message}
              </p>
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
              {...register("pin")}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.pin ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="100001"
            />
            {errors.pin && (
              <p className="mt-1 text-sm text-red-500">{errors.pin.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register("phone")}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+91 8034582047"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Billing Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("useAsBilling")}
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
