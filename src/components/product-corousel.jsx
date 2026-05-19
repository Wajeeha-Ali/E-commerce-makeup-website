import { useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function ProductCarousel({ products = [], title = "Featured Products" }) {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Collection</span>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground mt-1">{title}</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-card transition-colors" aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scroll(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-card transition-colors" aria-label="Scroll right">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
        {products.map((product) => (
          <article key={product.id} className="group relative flex shrink-0 flex-col w-64">
            <Link to={`/products/${product.id}`}>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-card">
                {product.image?.url ? (
                  <img src={product.image.url} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 ease-out group-hover:translate-y-0">
                  <button
                    onClick={(e) => { e.preventDefault(); dispatch(addToCart({ ...product, image: product.image?.url })); }}
                    className="w-full flex items-center justify-center gap-2 bg-black text-white px-3 py-2 rounded text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
            <div className="mt-3 flex flex-col gap-1">
              <h3 className="text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.price != null ? `$${product.price.toFixed(2)}` : "—"}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductCarousel;
