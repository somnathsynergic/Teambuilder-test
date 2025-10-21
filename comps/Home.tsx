"use client";
import { useMemo, useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOrder, setSortOrder] = useState<string>("");

  const sortedProducts = useMemo(() => {
    const sortableProducts = [...products];
    if (sortOrder === "low-to-high") {
      return sortableProducts.sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "high-to-low") {
      return sortableProducts.sort((a, b) => b.price - a.price);
    }
    return sortableProducts;
  }, [products, sortOrder]);

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="  mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}
      </section>

      {/* === SORTING CONTROLS === */}
      <section className="flex justify-end items-center gap-4 mb-8 text-secondary font-medium lg:mx-20 px-4 sm:px-0">
        <span className="font-bold text-lg">Sort by:</span>
        <div className="flex items-center border border-lightDim rounded-full p-1">
          <label
            className={`px-4 py-1 rounded-full cursor-pointer transition-colors duration-300 ${
              sortOrder === "low-to-high"
                ? "bg-primary text-white shadow"
                : "hover:bg-lightDim1"
            }`}
          >
            <input
              type="radio"
              name="sort"
              value="low-to-high"
              checked={sortOrder === "low-to-high"}
              onChange={(e) => setSortOrder(e.target.value)}
              className="sr-only"
            />
            Price: Low to High
          </label>
          <label
            className={`px-4 py-1 rounded-full cursor-pointer transition-colors duration-300 ${
              sortOrder === "high-to-low"
                ? "bg-primary text-white shadow"
                : "hover:bg-lightDim1"
            }`}
          >
            <input
              type="radio"
              name="sort"
              value="high-to-low"
              checked={sortOrder === "high-to-low"}
              onChange={(e) => setSortOrder(e.target.value)}
              className="sr-only"
            />
            Price: High to Low
          </label>
        </div>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3
       lg:mx-20 overflow-hidden
      "
      >
        {/* === MAP PRODUCTS  */}
        {sortedProducts?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
