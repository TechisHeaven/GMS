import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Root() {
  return (
    <div className="font-display  bg-gray-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
