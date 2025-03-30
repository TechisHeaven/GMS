import { JSX, useState } from "react";
import { LogOut, Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";
import { useSearchProduct } from "../service/product.service"; // Import the API service
import { useQueryClient } from "@tanstack/react-query";
import { ProductInfoType } from "../types/product";

const searchSuggestions = [
  { type: "category", name: "Italian Avocado", prefix: "" },
  { type: "category", name: "Frozen vegetables", prefix: "" },
  { type: "category", name: "Frozen packaging", prefix: "" },
  { type: "product", name: "Meat ball full Frozen with milk", prefix: "" },
];

export default function Header() {
  const { logout, isAuthenticated, isLoading: isUserLoading } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Fetch products only when debounced search query changes
  const { mutate, isPending: isLoading } = useSearchProduct();
  const queryClient = useQueryClient();

  function handleSearch(e: { target: { value: any } }) {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearchOpen(true);
    // Check if cached data is available before making API request
    const cachedData = queryClient.getQueryData(["search", query]);
    if (cachedData) {
      console.log("Using cached data:", cachedData);
      return;
    }

    // Fetch new data and cache it
    mutate(query);
  }

  const filteredSuggestions = searchSuggestions.filter((suggestion) =>
    suggestion.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightText = (text: string, highlight: string): JSX.Element[] => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part: string, index: number) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-black">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  async function handleLogout() {
    await logout();
    navigate("/login");
  }
  const cachedResults =
    (queryClient.getQueryData(["search", searchQuery]) as []) || [];

  return (
    <>
      <header className={"bg-teal-800 text-white p-4"}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xl font-semibold">
                GMS
              </Link>
            </div>

            <div className="flex-1 max-w-xl mx-4 relative bg-white rounded-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for Grocery, Snacks, Vegetables or Meat"
                  className="w-full py-2 px-4 pr-10 rounded-md text-gray-800"
                  value={searchQuery}
                  onChange={handleSearch}
                  // onChange={(e) => {
                  //   setSearchQuery(e.target.value);
                  //   setIsSearchOpen(true);
                  // }}
                  onFocus={() => setIsSearchOpen(true)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
              </div>

              {/* Search Popup */}
              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-fadeIn">
                  <div className="p-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-medium text-gray-700">Suggestions</h3>
                      <h3 className="font-medium text-gray-700">Products</h3>
                    </div>

                    <div className="flex gap-8">
                      {/* Suggestions */}
                      <div className="flex-1">
                        {filteredSuggestions.map((suggestion, index) => (
                          <div
                            onClick={() => setSearchQuery(suggestion.name)}
                            key={index}
                            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <span className="text-gray-400">
                              {highlightText(suggestion.name, searchQuery)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Fetched Products */}
                      <div className="flex-1">
                        {isLoading ? (
                          <p className="text-gray-500">Loading...</p>
                        ) : cachedResults?.length > 0 ? (
                          cachedResults?.map(
                            (product: ProductInfoType, index: number) => (
                              <Link
                                to={`/product/${product._id}`}
                                onClick={() => {
                                  setSearchQuery(product.name);
                                  setIsSearchOpen(false);
                                }}
                                key={index}
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                              >
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-10 h-10 rounded object-cover"
                                />
                                <div>
                                  <div className="text-sm text-gray-700">
                                    {highlightText(product.name, searchQuery)}
                                  </div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    ${product.price}
                                  </div>
                                </div>
                              </Link>
                            )
                          )
                        ) : (
                          <p className="text-gray-500">No products found</p>
                        )}
                      </div>
                    </div>

                    <button
                      className="w-full text-center text-orange-600 mt-4 py-2 hover:bg-gray-50 rounded"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      View all results
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Link to="/cart">
                <ShoppingCart className="h-6 w-6" />
              </Link>
              {isUserLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse">
                  <div className="rounded-full w-8 h-8" />
                </div>
              ) : !isAuthenticated ? (
                <Link to={"/login"} className="px-6 p-2">
                  Login
                </Link>
              ) : (
                <ProfilePopover handleLogout={handleLogout} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
}

type ProfilePopoverProps = {
  handleLogout: () => void;
};
const ProfilePopover = ({ handleLogout }: ProfilePopoverProps) => {
  return (
    <div className="relative group">
      <Link to="/profile" className="h-8 w-8 rounded-full bg-yellow-400">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="user-image"
          className="rounded-full w-8 h-8"
        />
      </Link>
      <div className="absolute min-w-52 right-0 bg-white rounded-lg shadow-lg overflow-hidden z-50 hidden group-hover:block">
        <div className="p-1 w-full">
          <Link
            to="/profile"
            className="inline-flex w-full gap-2 items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            <User width={16} height={16} />
            Profile
          </Link>
          <button
            className="inline-flex gap-2 items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            onClick={handleLogout}
          >
            <LogOut width={16} height={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
