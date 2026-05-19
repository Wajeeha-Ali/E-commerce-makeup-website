import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import Header from "./components/header";
import HeroSection from "./components/hero-section";
import ProductShowcase from "./components/product-showcase";
import ProductCatalog from "./components/product-catalog";
import FeatureSection from "./components/feature-section";
import ParallaxBanner from "./components/parallax-banner";
import LoadingScreen from "./components/loading-screen";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FaqPage from "./pages/FaqPage";

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      tagline
      description {
        text
      }
      image {
        url
      }
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return null;
  if (error) return <p className="text-center py-24 text-muted-foreground">Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <HeroSection />
      <div className="relative" style={{ overflow: 'clip' }}>
        {/* Single animated glow spanning showcase + products — desktop only */}
        <motion.div
          className="pointer-events-none hidden lg:block absolute rounded-full"
          style={{
            width: '1200px',
            height: '1800px',
            left: '-500px',
            top: '-100px',
            background: 'radial-gradient(ellipse 55% 50% at 42% 50%, rgba(60,60,60,0.92) 0%, rgba(90,90,90,0.4) 55%, transparent 75%)',
            zIndex: 1,
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <ProductShowcase />
        <section className="relative px-8 py-16 pb-24 sm:px-12 lg:px-16">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight uppercase">
              New Arrivals<br />& Bestsellers
            </h2>
          </motion.div>
          <ProductCatalog products={data.products} />
        </section>
      </div>
      <FeatureSection
        topLeftImage={new URL('./assets/pexels-felix-young-449360607-33910818.jpg', import.meta.url).href}
        bottomRightImage={new URL('./assets/pexels-krivitskiy-6283339.jpg', import.meta.url).href}
        products={data.products}
      />
      <ParallaxBanner
        image={new URL('./assets/pexels-milad-farhani-52379203-11666276.jpg', import.meta.url).href}
        title="Beauty Redefined"
        subtitle="Discover our curated edit of luxury makeup and iconic fragrances — crafted for those who dare to stand out."
        cta="Shop Now"
        href="/products"
      />
    </div>
  );
}

function AppShell() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence>
        {!ready && <LoadingScreen key="loader" />}
      </AnimatePresence>
      {ready && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return <AppShell />;
}

export default App;
