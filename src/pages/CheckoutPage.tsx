import { Pencil, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import EditDeliveryInformationModal from "../components/EditDeliveryInformationModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../providers/cart.provider";
import { StoreType } from "../types/store";
import { ProductInfoType } from "../types/product";
// import { useFetchProductsById } from "../service/product.service";
import { OrderService } from "../service/order.service";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../providers/auth.provider";
import { stopPropagation } from "../utils/mouseEvent.utils";
import { useFetchProduct } from "../service/product.service";
import { UserService } from "../service/user.service";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  type PaymentSelectedType = "cash";
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isCartCheckout = searchParams.get("isCartCheckout") === "true";
  const productId = searchParams.get("product");

  // const { data: allProducts } = useFetchProductsById(productIds);

  const {
    cart,
    clearCart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const { data: product, isLoading: isProductLoading } = useFetchProduct(
    productId!
  );

  const { user, isLoading: isUserLoading, isAuthenticated } = useAuth();
  const [directProductQuantity, setDirectProductQuantity] = useState(1);

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentSelectedType>("cash");
  const [isDeliveryInformationModalOpen, setIsDeliveryInformationModalOpen] =
    useState(false);
  const [deliveryInformation, setDeliveryInformation] = useState({
    fullName: "",
    address: user?.address?.address || "",
    phone: user?.phoneNumber || "",
    useAsBilling: true,
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pin: user?.address?.pin || "",
    country: user?.address?.country || "",
  });

  const updateAddressMutation = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: (data) => {
      toast.success("Address Updated Successfully");
      setDeliveryInformation((prev) => ({
        ...prev,
        ...data,
      }));
    },
    onError: (error: Error) => {
      toast.error("Error updating address");
      console.error("Error updating address:", error.message);
    },
  });

  const handleSaveDeliveryInformation = (
    newData: typeof deliveryInformation
  ) => {
    setDeliveryInformation(newData);
    updateAddressMutation.mutate({
      address: newData,
    });
  };

  const mutation = useMutation({
    mutationFn: OrderService.placeOrder,
    onSuccess: (data: { _id: string; orderNumber: string }) => {
      toast.success("Order placed successfully ");
      navigate(`/confirm-order/${data._id || data.orderNumber}`);
      clearCart();
    },
    onError: (error: Error) => {
      console.error("Error placing order:", error.message);
    },
  });

  const checkoutItems = isCartCheckout
    ? cart
    : product
    ? [
        {
          product: product,
          quantity: directProductQuantity,
          price: product.price * directProductQuantity,
        },
      ]
    : [];

  const handleConfirmOrder = () => {
    const orders = Object.values(
      checkoutItems.reduce((acc, item) => {
        if (typeof item.product !== "string" && item.product.store) {
          const storeId = item.product.store._id;

          if (!acc[storeId]) {
            acc[storeId] = {
              store: item.product.store._id,
              customer: {
                _id: user?._id,
                name: deliveryInformation.fullName,
                phone: deliveryInformation.phone,
                email: user?.email,
                shippingAddress: deliveryInformation.address,
              },
              items: [],
              totalAmount: 0,
              paymentMethod: selectedPayment,
              notes: "",
              totalQuantity: 0, // Added totalQuantity field
            };
          }
          acc[storeId].items.push({
            product: item.product._id,
            quantity: item.quantity, // Store quantity in items
            price: item.price,
            totalPrice: item.quantity * item.price, // Add totalPrice for each item
          });

          acc[storeId].totalAmount += item.quantity * item.price;
          acc[storeId].totalQuantity += item.quantity; // Increment totalQuantity
        }
        return acc;
      }, {} as Record<string, any>)
    );

    mutation.mutate(orders as any);

    // if (checkoutItems.length > 1) {
    //   clearCart();
    // }
    // navigate(`/confirm-order/1111`);
  };

  const allValuesNotNull = user
    ? Object.values(user).every((value) => value !== "") &&
      deliveryInformation.phone &&
      deliveryInformation.phone.toString().length >= 8
    : false;

  const handleIncrease = (
    product: ProductInfoType,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    stopPropagation(e);
    if (isCartCheckout) {
      const cartItem = cart.find(
        (item) =>
          typeof item.product !== "string" && item.product._id === product._id
      );
      const newQuantity = (cartItem?.quantity || 0) + 1;

      if (newQuantity === 1) {
        addToCart({
          price: product.price,
          product: product._id,
          quantity: 1,
        });
      } else {
        if (cartItem) updateQuantity(cartItem._id!, newQuantity);
      }
    } else {
      setDirectProductQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = (
    product: ProductInfoType,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    stopPropagation(e);
    if (isCartCheckout) {
      const cartItem = cart.find(
        (item) =>
          typeof item.product !== "string" && item.product._id === product._id
      );
      if (cartItem && cartItem.quantity > 0) {
        const newQuantity = cartItem.quantity - 1;
        if (newQuantity === 0) {
          removeFromCart(cartItem._id!);
        } else {
          updateQuantity(cartItem._id!, newQuantity);
        }
      }
    } else {
      setDirectProductQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const subtotal = checkoutItems.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    if (checkoutItems.length <= 0 && !isProductLoading && !isLoading)
      navigate(-1);
  }, [checkoutItems]);

  useEffect(() => {
    if (user?.address) {
      setDeliveryInformation((prev) => ({
        ...prev,
        fullName: prev.fullName || user.fullName || "", // Ensure fullName updates
        address: user.address?.address || "",
        phone: user.phoneNumber || "",
        useAsBilling: prev.useAsBilling,
        city: user.address?.city || "",
        state: user.address?.state || "",
        pin: user.address?.pin || "",
        country: user.address?.country || "",
      }));
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="pb-4">
        <h1 className="text-xl font-semibold">Checkout</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Order Details */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Delivery information</h2>

              <button
                onClick={() => setIsDeliveryInformationModalOpen(true)}
                className="text-orange-600 flex items-center gap-1 cursor-pointer"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
            </div>
            {isUserLoading ? (
              <div className="flex gap-4 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ) : allValuesNotNull && user ? (
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  🗺️
                </div>
                <div>
                  <h6 className="text-gray-500">
                    Name: {deliveryInformation.fullName}
                  </h6>
                  <div className="text-gray-500">
                    Address: {deliveryInformation.phone}
                  </div>
                  <div className="text-gray-500">
                    {deliveryInformation.address}
                    {deliveryInformation.city} {deliveryInformation.state}{" "}
                    {deliveryInformation.country} {deliveryInformation.pin}
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsDeliveryInformationModalOpen(true)}
                className="w-full p-2 bg-black text-white rounded-lg font-medium mb-6"
              >
                Add Delivery Information{" "}
              </button>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Review item by store</h2>

            {isLoading || isProductLoading ? (
              <div className="mb-6 last:mb-0 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-medium bg-gray-200 h-4 w-32 rounded"></div>
                    <div className="text-sm text-gray-500 bg-gray-200 h-3 w-48 rounded mt-1"></div>
                  </div>
                </div>

                {Array.from({ length: 3 }).map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="font-medium bg-gray-200 h-4 w-40 rounded mb-2"></div>
                      <div className="text-sm text-gray-500 bg-gray-200 h-3 w-24 rounded mb-2"></div>
                      <div className="flex justify-between items-center">
                        <div className="font-bold bg-gray-200 h-6 w-16 rounded"></div>
                        <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
                          <div className="p-1 bg-gray-200 h-4 w-4 rounded"></div>
                          <div className="px-2 bg-gray-200 h-4 w-6 rounded"></div>
                          <div className="p-1 bg-gray-200 h-4 w-4 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              Object.values(
                checkoutItems.reduce(
                  (acc, item) => {
                    if (
                      typeof item.product !== "string" &&
                      item.product.store
                    ) {
                      const storeId = item.product.store._id;

                      if (!acc[storeId]) {
                        acc[storeId] = {
                          store: item.product.store,
                          items: [],
                        };
                      }
                      acc[storeId].items.push({
                        price: item.price,
                        quantity: item.quantity,
                        product: item.product,
                      });
                    }
                    return acc;
                  },
                  {} as Record<
                    string,
                    {
                      store: StoreType;
                      items: {
                        price: number;
                        quantity: number;
                        product: ProductInfoType;
                      }[];
                    }
                  >
                )
              ).map(({ store, items }, storeIndex) => (
                <div key={storeIndex} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={store?.image}
                      alt={store?.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{store?.name}</div>
                      <div className="text-sm text-gray-500">
                        {store?.description}
                      </div>
                    </div>
                  </div>

                  {items?.map(
                    (
                      item: {
                        product: ProductInfoType;
                        price: number;
                        quantity: number;
                      },
                      itemIndex
                    ) => (
                      <div
                        key={itemIndex}
                        className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                      >
                        <img
                          src={item.product?.images?.[0]}
                          alt={item.product?.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">
                            {item.product?.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {item.product?.weight}g
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-2xl">
                              {Math.floor(item.price)}.
                              <sup className="text-base">
                                {(item.price % 1).toFixed(2).substring(2)}₹
                              </sup>
                            </span>
                            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
                              <button
                                onClick={(e) => handleDecrease(item.product, e)}
                                className="p-1"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-2">{item.quantity}</span>
                              <button
                                onClick={(e) => handleIncrease(item.product, e)}
                                className="p-1"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Order summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="payment"
                  id="cash"
                  checked={selectedPayment === "cash"}
                  onChange={() => setSelectedPayment("cash")}
                  className="text-teal-600"
                />
                <label htmlFor="cash">Cash on delivery</label>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Add Promo"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-100"
              />
              <button className="px-6 py-2 bg-teal-800 text-white rounded-lg">
                Apply
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {subtotal <= 500 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery fee</span>
                  <span>₹10.00</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">GST (8%)</span>
                <span>₹{(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CGST (8%)</span>
                <span>₹{(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-3 border-t">
                <span>Total</span>
                <span>
                  ₹
                  {(
                    subtotal +
                    (subtotal <= 500 ? 10 : 0) +
                    subtotal * 0.08 +
                    subtotal * 0.08
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            {isAuthenticated ? (
              <button
                disabled={
                  !allValuesNotNull ||
                  !deliveryInformation.phone ||
                  deliveryInformation.phone.length < 8
                }
                onClick={handleConfirmOrder}
                className={`w-full py-3 bg-main-bg text-main-text rounded-lg font-medium mb-6  cursor-pointer hover:bg-main-hover-bg transition-colors ${
                  !allValuesNotNull ||
                  !deliveryInformation.phone ||
                  deliveryInformation.phone.length < 8
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Confirm order
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 bg-main-bg text-main-text rounded-lg font-medium mb-6 cursor-pointer hover:bg-main-hover-bg transition-colors"
              >
                Login to Continue
              </button>
            )}
          </div>
        </div>
      </div>
      <EditDeliveryInformationModal
        initialData={deliveryInformation}
        isOpen={isDeliveryInformationModalOpen}
        onClose={() => setIsDeliveryInformationModalOpen(false)}
        onSave={handleSaveDeliveryInformation}
      />
    </div>
  );
}
