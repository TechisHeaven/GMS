import BannerPromo from "../components/BannerPromo";
import FeaturedProductSection from "../components/HomePageComponents/FeaturedProductSection";
import FeaturedStoreSection from "../components/HomePageComponents/FeaturedStoreSection";
import FreaturedCatogeriesSection from "../components/HomePageComponents/FreaturedCatogeriesSection";
import FeaturedProductBanner from "../components/HomePageComponents/FeaturedProductBanner";
import HeroSection from "../components/HomePageComponents/HeroSection";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#f4f6f6]">
      <HeroSection />
      <FreaturedCatogeriesSection />
      <FeaturedProductSection />
      <FeaturedStoreSection />
      <FeaturedProductBanner />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BannerPromo
            data={{
              id: 1,
              title: "Get up to 50% off Delivery by 12:45pm Fast and free",
              info: "Free Delivery",
              image: "./gift.png",
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
              image: "./clock.png",
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
