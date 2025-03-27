import { Pencil, Plus, Minus } from "lucide-react";
import { useState } from "react";
import EditDeliveryInformationModal from "../components/EditDeliveryInformationModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../providers/cart.provider";
import { StoreType } from "../types/store";
import { ProductInfoType } from "../types/product";
import { useFetchProductsById } from "../service/product.service";
import { OrderService } from "../service/order.service";
import { useMutation } from "@tanstack/react-query";

export default function CheckoutPage() {
  type PaymentSelectedType = "cash";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productIds = searchParams.get("items")?.split(",") || [];

  const { data: allProducts } = useFetchProductsById(productIds);

  const { checkoutItems, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentSelectedType>("cash");
  const [isDeliveryInformationModalOpen, setIsDeliveryInformationModalOpen] =
    useState(false);
  const [deliveryInformation, setDeliveryInformation] = useState({
    fullName: "",
    country: "India (IND)",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    useAsBilling: true,
  });
  const handleSaveDeliveryInformation = (
    newData: typeof deliveryInformation
  ) => {
    setDeliveryInformation(newData);
  };

  const mutation = useMutation({
    mutationFn: OrderService.placeOrder,
    onSuccess: (data: { orderId: string }) => {
      console.log("Order placed successfully:", data);
      clearCart();
      navigate(`/confirm-order/${data.orderId}`);
    },
    onError: (error: Error) => {
      console.error("Error placing order:", error.message);
    },
  });

  const handleConfirmOrder = () => {
    console.log("Order placed:", checkoutItems);
    const orders = Object.values(
      checkoutItems.reduce((acc, item) => {
        if (typeof item.product !== "string" && item.product.store) {
          const storeId = item.product.store._id;

          if (!acc[storeId]) {
            acc[storeId] = {
              store: item.product.store._id,
              customer: {
                _id: "67e29e7778a4162b637c0c9d",
                name: deliveryInformation.fullName,
                phone: deliveryInformation.phone,
                email: "test@gmail.com",
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
    console.log("Orders:", orders);

    mutation.mutate(orders as any);

    // if (checkoutItems.length > 1) {
    //   clearCart();
    // }
    // navigate(`/confirm-order/1111`);
  };

  const allValuesNotNull = Object.values(deliveryInformation).every(
    (value) => value !== ""
  );

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
            {allValuesNotNull ? (
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
                    {deliveryInformation.address} {deliveryInformation.address2}{" "}
                    {deliveryInformation.city} {deliveryInformation.state}{" "}
                    {deliveryInformation.country} {deliveryInformation.zipCode}
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

            {Object.values(
              checkoutItems.reduce(
                (acc, item) => {
                  if (typeof item.product !== "string" && item.product.store) {
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
                              {(item.price % 1).toFixed(2).substring(2)}$
                            </sup>
                          </span>
                          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
                            <button className="p-1">
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button className="p-1">
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
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
                <span>$37.65</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery fee</span>
                <span>$16.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coupon Discount</span>
                <span className="text-red-500">-$48.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-3 border-t">
                <span>Total</span>
                <span>$42.65</span>
              </div>
            </div>

            <button className="w-full py-3 bg-gray-100 rounded-lg mb-4 flex items-center justify-center gap-2">
              Continue with
              <img
                src="https://imgs.search.brave.com/HjOd9yVek5ZgD94m_EBCXmFthnCFTRiAMJLW1buVXno/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg5L1Jhem9ycGF5/X2xvZ28uc3Zn"
                alt="RazorPay"
                className="h-4"
              />
            </button>

            <button
              disabled={!allValuesNotNull}
              onClick={handleConfirmOrder}
              className="w-full py-3 bg-main-bg text-main-text rounded-lg font-medium mb-6"
            >
              Confirm order
            </button>
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
