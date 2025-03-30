import { ChevronRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../components/EditProfileModal";
import { useEffect, useState } from "react";
import EditAddressModal from "../components/EditAddressModal";
import { useFetchOrders } from "../service/order.service";
import { useAuth } from "../providers/auth.provider";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserProps, User } from "../types/user";
import { UserService } from "../service/user.service";
import ProfileInfoSkeleton from "../components/Skeletons/ProfileInfoSkeleton";
import ProfileInfoContainer from "../components/Profile/ProfileInfoContainer";
import { formatTimeAgo } from "../utils/time.utilts";
import OrdersSkeleton from "../components/Skeletons/OrdersSkeleton";
import toast from "react-hot-toast";
import ProfileAddressSkeleton from "../components/Skeletons/ProfileAddressSkeleton";

const ProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const { user, isLoading, isAuthenticated, verifyUser } = useAuth();
  const [addressData, setAddressData] = useState<UpdateUserProps["address"]>(
    user?.address
  );

  useEffect(() => {
    if (user) setAddressData(user?.address);
  }, [user]);
  const { data: orders, isLoading: isOrdersLoading } = useFetchOrders();
  const navigate = useNavigate();
  const handleTrackOrder = (id: string) => {
    const cleanId = id.startsWith("#") ? id.slice(1) : id;
    navigate(`/track/${cleanId}`);
  };

  const mutation = useMutation({
    mutationFn: async (newUser: UpdateUserProps) =>
      await UserService.updateUser(newUser),
    onSuccess: (data: { user: User; message: string }) => {
      console.log(data.user);
      verifyUser();
    },
    onError: (error: any) => {
      console.error("Error updating user:", error);
    },
  });

  const handleSaveProfile = (newData: UpdateUserProps) => {
    mutation.mutate({
      fullName: newData.fullName || "",
      email: newData.email || "",
      phoneNumber: newData.phoneNumber || "",
    });
    // setProfileData(newData);
  };

  const updateAddressMutation = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: (data) => {
      toast.success("Address Updated Successfully");
      setAddressData((prev) => ({
        ...prev,
        ...data,
      }));
    },
    onError: (error: Error) => {
      toast.error("Error updating address");
      console.error("Error updating address:", error.message);
    },
  });

  const handleSaveAddress = (newData: typeof addressData) => {
    setAddressData(newData);
    updateAddressMutation.mutate({ address: newData });
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
        {!isAuthenticated && !isLoading ? (
          <button
            className="px-4 p-2 bg-main-bg hover:bg-main-hover-bg rounded-md shadow w-full cursor-pointer transition"
            onClick={() => navigate("/login")}
          >
            Login to Continue
          </button>
        ) : (
          <div>
            {/* Profile Info */}
            {isLoading ? (
              <ProfileInfoSkeleton />
            ) : (
              <ProfileInfoContainer
                callback={setIsEditModalOpen}
                user={user!}
              />
            )}

            {/* Address */}
            {isLoading ? (
              <ProfileAddressSkeleton />
            ) : (
              user?.address && (
                <div className="bg-white rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-800">
                      Delivery Address
                    </h3>
                    <button
                      className="text-orange-600 cursor-pointer"
                      onClick={() => setIsAddressModalOpen(true)}
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-600">{addressData?.address}</p>
                  <p className="text-gray-600">
                    {addressData?.city}, {addressData?.state},{" "}
                    {addressData?.pin}
                  </p>
                </div>
              )
            )}

            {/* Order History */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-medium text-gray-800 mb-4">Order History</h3>
              <div className="space-y-6">
                {isOrdersLoading ? (
                  <OrdersSkeleton />
                ) : (
                  orders?.map((order: typeof orders) => (
                    <div
                      key={order._id}
                      className="border-b border-b-gray-200 pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="inline-flex items-center gap-2">
                            <img
                              src={order.store.image}
                              alt={order.store.name}
                              className="w-6 h-6 rounded-full overflow-hidden"
                            />
                            <span className="font-medium text-gray-800">
                              {order.store.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {formatTimeAgo(order.createdAt)}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === "pending"
                              ? "bg-orange-100 text-orange-600"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {order.items.length > 0 &&
                          order.items?.map(
                            (item: typeof order.items, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-3"
                              >
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-800">
                                    {item.product.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <span className="font-medium text-gray-800">
                                  ${item.product.price * item.quantity}
                                </span>
                              </div>
                            )
                          )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="font-medium text-gray-800">
                          Total: ${order.totalAmount}
                        </span>
                        <button
                          onClick={() => handleTrackOrder(order.orderNumber)}
                          className="text-orange-600 flex items-center gap-1 cursor-pointer"
                        >
                          Track Order
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="py-4">
                <button className="w-full flex-1 bg-main-bg text-main-text py-3 px-6 rounded-lg font-medium cursor-pointer">
                  Load More
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {!isLoading && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={user}
          onSave={handleSaveProfile}
        />
      )}
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
