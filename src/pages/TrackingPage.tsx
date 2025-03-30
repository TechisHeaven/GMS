import { Clock } from "lucide-react";
import { useFetchOrderById } from "../service/order.service";
import { useParams } from "react-router-dom";
import TrackingPageSkeleton from "../components/Skeletons/TrackingPageSkeleton";

const statusSteps = [
  {
    key: "pending",
    title: "Pending",
    description: "Your order is being processed",
    image:
      "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=120&h=120&fit=crop",
  },
  {
    key: "order_confirmed",
    title: "Order Confirmed",
    description: "Your order has been confirmed",
    image:
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=120&h=120&fit=crop",
  },
  {
    key: "being_packed",
    title: "Being Packed",
    description: "Your order is being packed",
    image:
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=120&h=120&fit=crop",
  },
  {
    key: "ready_for_pickup",
    title: "Ready for Pickup",
    description: "Your order is ready for pickup",
    image:
      "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=120&h=120&fit=crop",
  },
  {
    key: "out_for_delivery",
    title: "Out for Delivery",
    description: "Your order is on the way",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac4264a4a7f2?w=120&h=120&fit=crop",
  },
  {
    key: "delivered",
    title: "Delivered",
    description: "Your order has been delivered",
    image:
      "https://images.unsplash.com/photo-1515549832449-e69d9626b056?w=120&h=120&fit=crop",
  },
  {
    key: "cancelled",
    title: "Cancelled",
    description: "Your order has been cancelled",
    image:
      "https://images.unsplash.com/photo-1603357461685-d071c7be0406?w=120&h=120&fit=crop",
  },
];

interface TrackingPageProps {
  orderStatus:
    | "pending"
    | "order_confirmed"
    | "being_packed"
    | "ready_for_pickup"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
}

const estimateTime = (
  createdAt: Date,
  status: TrackingPageProps["orderStatus"]
) => {
  const statusTimeMap: Record<TrackingPageProps["orderStatus"], number> = {
    pending: 60,
    order_confirmed: 50,
    being_packed: 40,
    ready_for_pickup: 30,
    out_for_delivery: 15,
    delivered: 0,
    cancelled: 0, // Handle cancelled orders explicitly
  };

  const createdTime = new Date(createdAt).getTime();
  const elapsedMinutes = (Date.now() - createdTime) / 60000;
  const remainingTime = Math.max(
    (statusTimeMap[status] || 45) - elapsedMinutes,
    0
  );
  return Math.ceil(remainingTime);
};

const TrackingPage = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useFetchOrderById(id!);
  const currentStepIndex =
    order &&
    !isLoading &&
    statusSteps.findIndex(
      (step) => step.key === (order?.status as TrackingPageProps["orderStatus"])
    );
  const estimatedTime = order
    ? estimateTime(order.createdAt, order.status)
    : 45;
  return isLoading ? (
    <TrackingPageSkeleton />
  ) : (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-4">
        <h1 className="text-xl font-semibold">Track Your Order</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Estimated Time */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {order.store.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                {order.status === "cancelled" ? (
                  <span className="text-red-500 font-semibold">
                    Order Cancelled 😢
                  </span>
                ) : (
                  <span className="text-gray-600">
                    Estimated time:{" "}
                    {order.status === "delivered"
                      ? "Order Delivered 🥳"
                      : estimatedTime > 0
                      ? `${estimatedTime} min`
                      : "Arriving soon"}
                  </span>
                )}
              </div>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-lg">
              <img
                className="rounded-lg bg-cover"
                src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=120&h=120&fit=crop"
                alt="image"
              />
            </div>
          </div>
        </div>

        {/* Tracking Steps */}
        <div className="bg-white rounded-lg p-6">
          {order.status !== "cancelled" &&
            order.status !== "delivered" &&
            estimatedTime <= 0 && (
              <p className="py-2 text-red-500 text-xl font-semibold">
                Sorry for being late 😔
              </p>
            )}
          <div className="space-y-8">
            {statusSteps.map((step, index) => (
              <div key={step.key} className="relative">
                {index < statusSteps.length - 1 && (
                  <div
                    className={`absolute left-6 top-14 bottom-0 w-0.5 ${
                      index <= currentStepIndex ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                )}
                <div className="flex gap-4">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index < currentStepIndex
                          ? "bg-green-500"
                          : index === currentStepIndex
                          ? "bg-green-300"
                          : "bg-gray-100"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index < currentStepIndex
                            ? "bg-white"
                            : index === currentStepIndex
                            ? "bg-white"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {step.description}
                        </p>
                      </div>
                      <img
                        className="w-12 h-12 rounded-lg"
                        src={step.image}
                        alt={step.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
