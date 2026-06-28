import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartSideBar from "../components/CartSideBar";
import Footer from "../components/Footer";

const AppLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CartSideBar />
    </>
  );
};

export default AppLayout;
