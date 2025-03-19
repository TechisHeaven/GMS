import { ChevronRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../components/EditProfileModal";
import { useState } from "react";
import EditAddressModal from "../components/EditAddressModal";

const orders = [
  {
    id: "#GR30501",
    date: "Today, 10:30 AM",
    status: "In Progress",
    items: [
      {
        name: "Italian Avocado",
        quantity: 1,
        price: 14.29,
        image:
          "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=80&h=80&fit=crop",
      },
      {
        name: "Fresh Carrots",
        quantity: 2,
        price: 27.29,
        image:
          "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=80&h=80&fit=crop",
      },
    ],
    total: 41.58,
  },
  {
    id: "#GR30500",
    date: "Yesterday, 2:45 PM",
    status: "Delivered",
    items: [
      {
        name: "Beetroot",
        quantity: 1,
        price: 17.29,
        image:
          "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=80&h=80&fit=crop",
      },
    ],
    total: 17.29,
  },
];

const ProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "99928372927",
  });
  const [addressData, setAddressData] = useState<{
    street: string;
    apartment: string;
    city: string;
    state: string;
    zip: string;
  }>({
    street: "Gali no 7",
    apartment: "Vipin Garden Extension",
    city: "New Delhi",
    state: "New Delhi",
    zip: "110078",
  });
  const navigate = useNavigate();
  const handleTrackOrder = (id: string) => {
    const cleanId = id.startsWith("#") ? id.slice(1) : id;
    navigate(`/track/${cleanId}`);
  };

  const handleSaveProfile = (newData: typeof profileData) => {
    setProfileData(newData);
  };
  const handleSaveAddress = (newData: typeof addressData) => {
    setAddressData(newData);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-2xl mx-auto py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile Info */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className=" h-16 w-16 aspect-square items-center flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="user-image"
                className="rounded-full"
              />
            </div>
            <div className="w-full">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {profileData.displayName}
                </h2>
                <button
                  className="text-orange-600 cursor-pointer"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit
                </button>
              </div>
              <p className="text-gray-600">{profileData.phone}</p>
              <p className="text-gray-600">{profileData.email}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800">Delivery Address</h3>
            <button
              className="text-orange-600 cursor-pointer"
              onClick={() => setIsAddressModalOpen(true)}
            >
              Edit
            </button>
          </div>
          <p className="text-gray-600">{addressData.street}</p>
          <p className="text-gray-600">{addressData.apartment}</p>
          <p className="text-gray-600">
            {addressData.city}, {addressData.state}, {addressData.zip}
          </p>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="font-medium text-gray-800 mb-4">Order History</h3>
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border-b border-b-gray-200 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-medium text-gray-800">
                      {order.id}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {order.date}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "In Progress"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-gray-800">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-medium text-gray-800">
                    Total: ${order.total}
                  </span>
                  <button
                    onClick={() => handleTrackOrder(order.id)}
                    className="text-orange-600 flex items-center gap-1 cursor-pointer"
                  >
                    Track Order
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="py-4">
            <button className="w-full flex-1 bg-main-bg text-main-text py-3 px-6 rounded-lg font-medium cursor-pointer">
              Load More
            </button>
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={profileData}
        onSave={handleSaveProfile}
      />
      <EditAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        initialData={addressData}
        onSave={handleSaveAddress}
      />
    </div>
  );
};

export default ProfilePage;
