import { ArrowRight } from "lucide-react";
import BroccoliIcon from "../assets/broccoli-plant.svg";
import SnacksIcon from "../assets/bread.svg";
import FruitsIcon from "../assets/fruits.svg";
import EggsIcon from "../assets/chicken-legs.svg";
import DairyIcon from "../assets/milk.svg";
import { Link } from "react-router-dom";
import ProductContainer from "../components/ProductContainer";
import { product, products } from "../constants/product";
import FeaturedStoreContainer from "../components/FeaturedStoreContainer";
import { stores } from "../constants/store";
import ProductInformationContainer from "../components/ProductInformationContainer";
import BannerSlider from "../components/BannerSlider";
import BannerPromo from "../components/BannerPromo";

const categories = [
  {
    id: 1111,
    name: "Vegetables",
    type: "vegetables",
    img: BroccoliIcon,
    subtitle: "local market",
  },
  {
    id: 1112,
    name: "Snacks & Breads",
    type: "snacks",
    img: SnacksIcon,
    subtitle: "in store delivery",
  },
  {
    id: 1113,
    name: "Fruits",
    type: "fruits",
    img: FruitsIcon,
    subtitle: "chemical free",
  },
  {
    id: 1114,
    name: "Chicken & Eggs",
    type: "eggs",
    img: EggsIcon,
    subtitle: "frozen meal",
  },
  {
    id: 1115,
    name: "Milk & Dairy",
    type: "dairy",
    img: DairyIcon,
    subtitle: "process food",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-[#f4f6f6]">
      {/* Hero Section */}
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
            <button className="bg-main-bg text-main-text px-6 py-2 rounded-md font-medium">
              Shop now
            </button>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 my-8">
        <div className="flex justify-between items-center gap-4">
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.name}
              className="flex flex-1 flex-col bg-white rounded-lg shadow p-3 h-28 relative"
            >
              <img
                src={category.img}
                alt={`${category.type} Icon`}
                draggable={false}
                className="w-14 h-14 absolute right-2 bottom-2"
              />
              <span className=" text-black text-base font-semibold">
                {category.name}
              </span>
              <span className="text-xs text-gray-600 font-semibold capitalize">
                {category.subtitle}
              </span>
            </Link>
          ))}
          <Link
            to="/category"
            className="flex flex-col justify-center rounded-lg shadow p-3 h-28 bg-main-bg text-main-text font-semibold"
          >
            <div className="bg-white p-2 h-10 w-10 rounded-full">
              <ArrowRight />
            </div>{" "}
            See all
          </Link>
        </div>
      </div>
      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">You might need</h3>
          <button className="text-orange-600 flex items-center">
            See more <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <ProductContainer key={index} product={product} />
          ))}
        </div>
      </div>
      {/* Featured Store */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Featured Store</h3>
          <button className="text-orange-600 flex items-center">
            Visit All Store <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="grid  md:grid-cols-3 gap-6">
          {stores.map((store, index) => (
            <FeaturedStoreContainer key={index} store={store} />
          ))}
        </div>
      </div>{" "}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BannerSlider itemsPerSlide={1} autoplayInterval={5000}>
          {Array.from({ length: 2 }, (_, index) => {
            return (
              <div
                key={index}
                className={`${index} py-4 bg-white my-8 rounded-2xl`}
              >
                <ProductInformationContainer product={product} />
              </div>
            );
          })}
        </BannerSlider>
      </div>
      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Weekly Best Selling Items</h3>
          <button className="text-orange-600 flex items-center">
            See more <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <ProductContainer key={index} product={product} />
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BannerPromo
            data={{
              id: 1,
              title: "Get up to 50% off Delivery by 12:45pm Fast and free",
              info: "Free Delivery",
              image: "gift.png",
              banner:
                "https://imgs.search.brave.com/SZVa4uLcAdvMrmN59jtAIrgOsBERTBPYG18qKqKxo4s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE4/MjE4NDI5NS92ZWN0/b3IvYWJzdHJhY3Qt/YmFja2dyb3VuZC13/aXRoLWluLWJsdWUt/Z3JhZGllbnQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTIt/bjNtbWtUSmRWVlM4/bHNwYTBqb2cwWEhJ/dnZZM3ptR3c0Z05r/LVUtQW89",
              textColor: "#205970",
              bgColor: "#a6e0e7",
            }}
          />
          <BannerPromo
            data={{
              id: 2,
              title: "You can enjoy a 5% of discount using our health card",
              info: "Membership Card",
              image: "clock.png",
              banner:
                "https://imgs.search.brave.com/gbpOSQdaKFOOp35PO4vcG6KkwalUHejC9MK2cFUKE94/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9v/cmFuZ2UtdGV4dHVy/ZV85NTY3OC03My5q/cGc_c2VtdD1haXNf/aHlicmlk",
              textColor: "#a95716",
              bgColor: "#ffbf3c",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
