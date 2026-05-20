import { useState } from "react";
import { useDispatch } from "react-redux";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

const SHADE_DISPLAY = { shade1: "Shade 1", shade2: "Shade 2", shade3: "Shade 3" };
const QTY_DISPLAY = { ml: "30 ML", mll: "60 ML", Ml: "120 ML" };
function getLabel(map, key) { return map[key] || key; }

function ProductDetails({ product, shadeOptions = [], quantityOptions = [] }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedShade, setSelectedShade] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleVariantSelect = (v) => {
    setSelectedVariant(v);
    setQty(1);
  };

  const variants = product.variants || [];
  const activeProduct = selectedVariant || product;
  const stock = activeProduct.stock ?? Infinity;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch(addToCart({
        ...activeProduct,
        image: activeProduct.image?.url,
        selectedShade,
        selectedSize,
        variantName: selectedVariant?.name,
      }));
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
        {/* Image */}
        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-card">
          {activeProduct.image?.url ? (
            <img src={activeProduct.image.url} alt={activeProduct.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {product.tagline && (
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-3">{product.tagline}</span>
          )}
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-2xl font-medium text-foreground">
            {activeProduct.price != null ? `$${activeProduct.price.toFixed(2)}` : "—"}
          </p>
          {product.description?.text && (
            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description.text}</p>
          )}

          {/* Variants */}
          {variants.length > 0 && (
            <div className="mt-6">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Variants</span>
              <div className="mt-3 flex flex-wrap gap-3">
                {/* <button
                  onClick={() => setSelectedVariant(null)}
                  className={`flex items-center gap-2 border rounded px-3 py-2 text-sm transition-colors ${!selectedVariant ? 'border-foreground bg-foreground text-background' : 'border-border text-foreground hover:border-foreground'}`}
                >
                  Default
                </button> */}
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleVariantSelect(v)}
                    className={`flex items-center gap-2 border rounded px-3 py-2 text-sm transition-colors ${selectedVariant?.id === v.id ? 'border-foreground bg-foreground text-background' : 'border-border text-foreground hover:border-foreground'}`}
                  >
                    {v.image?.url && (
                      <img src={v.image.url} alt={v.name} className="h-6 w-6 rounded object-cover" />
                    )}
                    <span>{v.name}</span>
                    {v.price != null && <span className="text-xs opacity-70">${v.price.toFixed(2)}</span>}
                  </button>
                ))}
              </div>
              {selectedVariant && (
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {selectedVariant.shade && <span>Shade: {selectedVariant.shade}</span>}
                  {selectedVariant.size && <span>Size: {selectedVariant.size}</span>}
                  {selectedVariant.stock != null && <span>Stock: {selectedVariant.stock}</span>}
                </div>
              )}
            </div>
          )}
          {/* Qty + Add to cart */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border rounded overflow-hidden">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-foreground hover:bg-card transition-colors text-sm">-</button>
              <span className="px-4 py-2 text-sm font-medium text-foreground border-x border-border">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(stock, q + 1))} disabled={qty >= stock} className="px-3 py-2 text-foreground hover:bg-card transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed">+</button>
            </div>
            <button onClick={handleAddToCart} className={`flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded text-sm font-medium transition-colors ${added ? "bg-neutral-700 text-white" : "bg-black text-white hover:bg-neutral-800"}`}>
              <ShoppingBag className="h-4 w-4" />
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
