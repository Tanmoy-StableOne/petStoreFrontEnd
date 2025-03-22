import React from "react";
import FoodCategory from "./FoodCategory/FoodCategory";
import CateGoryGrid from "./CategoryGrid/CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import { Button } from "@mui/material";
import { Storefront } from "@mui/icons-material";

const Home = () => {
  return (
    <>
      <div className="space-y-5 lg:space-y-10 relative">
        <section>
          <FoodCategory></FoodCategory>
          <CateGoryGrid></CateGoryGrid>
        </section>

        <section className="pt-12">
          <h1 className="text-center text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10">
            Today's Best Deals
          </h1>
          <Deal></Deal>
        </section>

        <section className="pt-12">
          <h1 className="text-center text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20">
            Shop By Category
          </h1>
          <ShopByCategory></ShopByCategory>
        </section>

        <section className="lg:pz-20 relative h-[200px] lg:h-[450px] object-cover pt-12 pb-10">
          <img
            className="h-full w-full"
            src="https://imgs.search.brave.com/RaMq2qR5uBxfB95oWr-wl3_u9yJffn4oqdsAdFcJFXE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9saWdodC1waWN0/b24tYmx1ZS1yb3Vn/aC1hYnN0cmFjdC1i/YWNrZ3JvdW5kLWRl/c2lnbl84NTE3NTUt/MTk3NTU5LmpwZz9z/ZW10PWFpc19oeWJy/aWQ"
            alt=""
          ></img>
          <div className="absolute top-1/2 left-4 lg:left-[15rem] transform -translate-x-1/2 font-semibold lg:text-4xl space-y-3">
            <h1 className="text-white">Sell Your Product</h1>
            <p className="text-white text-lg md:text-2xl">With <span className="logo">AlphaStore</span> </p>
            <div className="pt-6 flex justify-center">
            <Button startIcon={<Storefront></Storefront>} variant="contained" size="large">Become Seller</Button>
        </div>
        
          </div>
          </section>

      </div>
    </>
  );
};

export default Home;
