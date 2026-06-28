import Deals from "../components/home/Deals";
import HomeCategories from "../components/home/HomeCategories";
import PopularProducts from "../components/home/PopularProducts";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto sm:px-6 lg:px-8 py-3">
      <section className="relative overflow-hidden min-h-[390px] mb- rounded flex items-center">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="src/assets/images/webban.png"
          alt=""
        />
      </section>
      <HomeCategories />
      <PopularProducts />
      <Deals />
    </div>
  );
};

export default Home;
