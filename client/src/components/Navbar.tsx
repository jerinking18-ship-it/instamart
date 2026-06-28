import {
  ArrowUpRightIcon,
  BikeIcon,
  ChevronDownIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  ShieldIcon,
  ShoppingCartIcon,
  User2Icon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar: React.FC = () => {
  const user: any = {
    name: "jerin",
    email: "jerinking@gmail.com",
    isAdmin: true,
  };
  const { cartCount, setIsCartOpen } = useAppContext();

  const [open, setOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSeacrh = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };
  const handleLogout = () => {
    setUserMenuOpen(false);
    navigate("/");
  };
  return (
    <div>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-2  bg-white relative transition-all">
        <Link
          to={"/"}
          className="flex items-center gap-2 text-[22px] font-medium shrink-0"
        >
          <BikeIcon className="size-8 text-lime-900" />
          <span className="text-2xl font-semibold text-lime-900">
            Instamart
          </span>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8 text-sm">
          <Link className="text-lime-800" to={"/"}>
            Home
          </Link>
          <Link className="text-lime-800" to={"/products"}>
            Products
          </Link>
          <Link className="text-orange-600" to={"/deals"}>
            Deals
          </Link>
          <form onSubmit={handleSeacrh}>
            <div className="hidden lg:flex items-center text-sm gap-2   px-3 pr-38 rounded bg-lime-100">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.836 10.615 15 14.695"
                  stroke="#7A7B7D"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  clip-rule="evenodd"
                  d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                  stroke="#7A7B7D"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <input
                className="py-2.5 w-full bg-transparent outline-none placeholder-gray-500 text-gray-900"
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="relative cursor-pointer">
            <button onClick={() => setIsCartOpen(true)}>
              <ShoppingCartIcon className="size-5 text-lime-900"></ShoppingCartIcon>
            </button>
            <button className="absolute -top-1 -right-2 text-xs text-white bg-orange-600 w-[16px] h-[16px] rounded-full">
              <span>{cartCount}</span>
            </button>
          </div>
          <div className="relative ">
            {user ? (
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-2"
              >
                <div className="size-7 rounded-full bg-lime-950 text-white flex-center text-lg ">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <ChevronDownIcon className="size-3 text-zinc-500" />
              </button>
            ) : (
              <div className="flex-center gap-2">
                <Link
                  to={"/login"}
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-lime-950 rounded hover:bg-lime-950-light transition-colors"
                >
                  <User2Icon size={16} /> Sign In
                </Link>
                {userMenuOpen ? (
                  <XIcon
                    className="md:hidden"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  />
                ) : (
                  <MenuIcon
                    className="md:hidden"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  />
                )}
              </div>
            )}
            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 "
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2.5 w-56 bg-white  rounded-xl shadow-lg border border-zinc-100 py-2 z-50 animate-fade-in  ">
                  {user && (
                    <div className="px-4 py-2 border-b border-zinc-100 ">
                      <p className="text-sm font-medium text-zinc-900">
                        {user?.name}
                      </p>
                      <p className="text-xs font-medium text-zinc-500">
                        {user?.email}
                      </p>
                    </div>
                  )}
                  <div className="" onClick={() => setUserMenuOpen(false)}>
                    {!user && (
                      <Link to={"/login"} className="dropdown-link ">
                        <User2Icon size={16} /> Sign In
                      </Link>
                    )}
                    {user && (
                      <Link to={"/my-orders"} className="dropdown-link">
                        <PackageIcon size={16} /> My Orders
                      </Link>
                    )}
                    {user && (
                      <Link to={"/addresses"} className="dropdown-link">
                        <MapPinIcon size={16} /> Adresses
                      </Link>
                    )}

                    {user && (
                      <Link to={"/products"} className="dropdown-link">
                        <ArrowUpRightIcon size={16} /> Products
                      </Link>
                    )}
                    {user && (
                      <Link to={"/deals"} className="dropdown-link">
                        <ArrowUpRightIcon size={16} /> Deals
                      </Link>
                    )}
                    {user?.isAdmin && (
                      <Link to={"/admin/products"} className="dropdown-link">
                        <ShieldIcon className="text-orange-600" size={16} />
                        <span className="text-orange-600">Admin Panel</span>
                      </Link>
                    )}
                    {user && (
                      <div className="border-t border-zinc-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer "
                        >
                          <LogOutIcon size={16} className="text-orange-600 " />
                          <span className="text-orange-600"> Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          {/* Menu Icon SVG */}
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <a href="#" className="block">
            Home
          </a>
          <a href="#" className="block">
            About
          </a>
          <a href="#" className="block">
            Contact
          </a>
          <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
