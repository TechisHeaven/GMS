import { Clock } from "lucide-react";

const orderSteps = [
  {
    title: "Order Confirmed",
    time: "10:30 AM",
    description: "Your order has been received",
    image:
      "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=120&h=120&fit=crop",
    isCompleted: true,
    isActive: false,
  },
  {
    title: "In Kitchen",
    time: "10:35 AM",
    description: "Your delicious food is being prepared",
    image:
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=120&h=120&fit=crop",
    isCompleted: true,
    isActive: true,
  },
  {
    title: "Food is Packed",
    time: "Estimated 10:45 AM",
    description: "Your food will be packed soon",
    image:
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=120&h=120&fit=crop",
    isCompleted: false,
    isActive: false,
  },
  {
    title: "On the way",
    time: "Estimated 11:00 AM",
    description: "Your food will arrive in 25 minutes",
    image:
      "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=120&h=120&fit=crop",
    isCompleted: false,
    isActive: false,
  },
];

const TrackingPage = () => {
  return (
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
                Mini Mahal Restaurant
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Estimated time: 45 min</span>
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
          <div className="space-y-8">
            {orderSteps.map((step, index) => (
              <div key={step.title} className="relative">
                {index < orderSteps.length - 1 && (
                  <div
                    className={`absolute left-6 top-14 bottom-0 w-0.5 ${
                      step.isCompleted ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                )}
                <div className="flex gap-4">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.isActive
                          ? "bg-green-500"
                          : step.isCompleted
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          step.isActive
                            ? "bg-white"
                            : step.isCompleted
                            ? "bg-green-500"
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
                        <p className="text-sm text-gray-500">{step.time}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {step.description}
                        </p>
                      </div>
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
