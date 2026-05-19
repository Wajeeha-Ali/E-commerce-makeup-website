import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/header";
import ProductDetails from "../components/product-details";
import LoadingScreen from "../components/loading-screen";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      price
      tagline
      shade
      quantity
      description {
        text
      }
      image {
        url
      }
      variants {
        id
        name
        price
        size
        shade
        stock
        image {
          url
        }
      }
    }
  }
`;

const GET_ENUM_VALUES = gql`
  query {
    shadesEnum: __type(name: "Shades") {
      enumValues {
        name
        description
      }
    }
    quantityEnum: __type(name: "Ml") {
      enumValues {
        name
        description
      }
    }
  }
`;

const GET_ALL_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      image {
        url
      }
      variants {
        id
        name
        price
        size
        shade
        stock
        image {
          url
        }
      }
    }
  }
`;

function RelatedProducts({ currentId }) {
  const { data } = useQuery(GET_ALL_PRODUCTS);
  const related = (data?.products || []).filter(p => p.id !== currentId).slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-8 py-16 sm:px-12 lg:px-16">
      <div className="mb-8">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">More Products</span>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground mt-1">You May Also Like</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {related.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Link to={`/products/${product.id}`} className="group block">
              <div className="relative overflow-hidden bg-muted aspect-[3/4]">
                {product.image?.url ? (
                  <img
                    src={product.image.url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-foreground">{product.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {product.price != null ? `$${product.price.toFixed(2)}` : '—'}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductDetailPage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });
  const { data: enumData } = useQuery(GET_ENUM_VALUES);

  const shadeOptions = enumData?.shadesEnum?.enumValues || [];
  const quantityOptions = enumData?.quantityEnum?.enumValues || [];

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Header />
      <main>
        {error ? (
          <p className="text-center text-muted-foreground py-24">
            Error: {error.message}
          </p>
        ) : (
          <>
            <ProductDetails
              product={data?.product}
              enumData={enumData}
              shadeOptions={shadeOptions}
              quantityOptions={quantityOptions}
            />
            <div className="border-t border-border">
              <RelatedProducts currentId={id} />
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default ProductDetailPage;
