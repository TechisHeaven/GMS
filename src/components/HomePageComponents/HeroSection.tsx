import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div id="hero-section" className="bg-teal-800 text-white pb-1">
      <div className="max-w-6xl mx-auto px-4">
        <div className="py-12">
          <h2 className="text-4xl font-bold mb-4">
            We bring the store
            <br />
            to your door
          </h2>
          <p className="mb-6 text-teal-100">
            Get organic produce and sustainably sourced
            <br />
            groceries delivery at up to 5% off grocery.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-main-bg cursor-pointer text-main-text px-6 py-2 rounded-md font-medium"
          >
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
