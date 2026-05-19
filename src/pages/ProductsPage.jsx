import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { gql } from "@apollo/client";
import { motion } from "framer-motion";
import Header from "../components/header";
import ProductCatalog from "../components/product-catalog";
import LoadingScreen from "../components/loading-screen";
import SiteFooter from "../components/site-footer";

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      category {
        value
      }
      image {
        url
      }
    }
  }
`;

function ProductsPage() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const sortedProducts = [...(data?.products ?? [])];
  const filteredProducts =
    selectedCategory === "all"
      ? sortedProducts
      : sortedProducts.filter(
        (product) => product.category?.value === selectedCategory
      );

  if (sortOrder === "low-to-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "high-to-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Header />
      <div className="relative">
        {/* Animated grey half-circle glow — left side, desktop only */}
        <motion.div
          className="pointer-events-none hidden lg:block fixed rounded-full"
          style={{
            width: '100vw',
            height: '100vw',
            left: '-50vw',
            top: '50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(60,60,60,0.9) 0%, rgba(90,90,90,0.4) 45%, transparent 65%)',
            zIndex: -1,
          }}
          animate={{ scale: [0.75, 1.05, 0.75], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <main className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Collection
            </span>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mt-2">
              Makeup & Fragrance
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Luxury lip colours, glosses, and iconic scents — curated for those who love beauty
            </p>
          </div>
          <div className="mb-8 flex justify-end">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none"
            >
              <option value="">Sort By</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          <div className="mb-8 flex justify-end">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2"
            >
              <option value="all">All Products</option>
              <option value="Perfumes">Perfumes</option>
              <option value="Makeup">Makeup</option>
              <option value="Bags">Bags</option>
            </select>
          </div>
          {error ? (
            <p className="text-center text-muted-foreground py-24">Error: {error.message}</p>
          ) : (


            <ProductCatalog products={filteredProducts} />
          )}
        </main>
      </div>
      <SiteFooter />
    </>
  );
}

export default ProductsPage;
