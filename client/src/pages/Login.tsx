import { BikeIcon, Loader2Icon, UserCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [isLogin, setIslogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => (window.location.href = "/"), 1000);
  };
  return (
    <div className="flex h-[700px] w-full ">
      <div className="w-full hidd min-h-screen  md:inline-block relative ">
        <img
          className="h-full opacity-  "
          src="src/assets/images/veg.jpg.avif"
          alt="leftSideImage"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center  text-center">
          <h2 className="text-4xl text-white font-bold mb-4">
            Welcome Back To Insta Mart
          </h2>
          <p className=" text-white/85 text-xl max-w-sm mx-auto font-semibold">
            fresh groceries and organic product,delivered to your doorstep
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center bg-lime-50 min-h-screen">
        <Link to={"/"} className="inline-flex items-center gap-2 mb-3">
          <BikeIcon className="size-8 text-lime-600" />
          <span className="text-2xl font-semibold text-lime-600">
            Instamart
          </span>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-3xl text-lime-900 font-medium">
            {isLogin ? "Sign in" : "Sign up"}
          </h2>
          <p className="text-sm text-gray-500/90 mt-3">
            {isLogin
              ? " Welcome back! Please sign in to continue"
              : "Welcome back! Please sign up to continue"}
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>
          {!isLogin && (
            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded overflow-hidden pl-6 gap-2 mb-6">
              <UserCircleIcon className="w-5 h-4 text-gray-500"></UserCircleIcon>
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded overflow-hidden pl-6 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="checkbox" />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <a className="text-sm underline" href="#">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full h-11 rounded text-white bg-lime-600 hover:opacity-80 transition-opacity"
          >
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-gray-500/90 text-sm mt-4 mb-2">
            {isLogin ? "Don’t have an account?" : "Already have an account"}
            <button
              className="text-orange-400 hover:underline text-bold ml-1 "
              onClick={() => setIslogin(!isLogin)}
            >
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
