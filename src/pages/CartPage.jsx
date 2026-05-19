import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";
import bgImage from "../assets/pexels-ryank-11909534.jpg";

const slideLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const slideRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
};

const BG = (
  <>
    <div className="fixed inset-0 -z-10" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(6px)', transform: 'scale(1.05)' }} />
    <div className="fixed inset-0 -z-10 bg-black/60" />
  </>
);

function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  const shipping = subtotal > 0 ? 12 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="relative min-h-screen">
        {BG}
        <Navbar dark />
        <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <ShoppingBag className="h-16 w-16 text-white/60 mb-6" />
          <h1 className="font-serif text-3xl font-semibold text-white mb-3">Your cart is empty</h1>
          <p className="text-white/60 mb-8 max-w-sm">Looks like you haven't added anything yet. Explore our collection and find something you love.</p>
          <Link to="/products" className="flex items-center gap-2 bg-white text-black px-8 py-3 text-sm font-medium hover:bg-white/90 transition-colors">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {BG}
      <Navbar dark cartCount={items.reduce((s, i) => s + i.quantity, 0)} />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-medium uppercase tracking-widest text-white/50">Review</span>
          <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl mt-1">Your Cart</h1>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-3">

          {/* Cart Items */}
          <motion.div className="lg:col-span-2 space-y-4" {...slideLeft}>
            {items.map((item) => (
              <div key={item.id} className="flex gap-5 bg-white text-black p-5 rounded">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-gray-100">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-black">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.price != null ? `$${item.price.toFixed(2)}` : "—"}</p>
                      {item.selectedShade && <p className="text-xs text-gray-400 mt-0.5">Shade: {item.selectedShade}</p>}
                      {item.selectedSize && <p className="text-xs text-gray-400 mt-0.5">Size: {item.selectedSize}</p>}
                    </div>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-400 hover:text-black transition-colors" aria-label="Remove item">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="flex h-7 w-7 items-center justify-center border border-gray-200 text-black hover:bg-gray-100 transition-colors">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-black">{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} disabled={item.stock != null && item.quantity >= item.stock} className="flex h-7 w-7 items-center justify-center border border-gray-200 text-black hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      <Plus className="h-3 w-3" />
                    </button>
                    <span className="ml-auto text-sm font-medium text-black">{item.price != null ? `$${(item.price * item.quantity).toFixed(2)}` : "—"}</span>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => dispatch(clearCart())} className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4 mt-2">
              Clear cart
            </button>
          </motion.div>

          {/* Order Summary */}
          <motion.div className="lg:col-span-1" {...slideRight}>
            <div className="bg-white text-black p-6 rounded sticky top-24">
              <h2 className="font-serif text-xl font-semibold text-black mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span><span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-medium text-black">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="mt-6 w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors">
                Checkout <ArrowRight className="h-4 w-4" />
              </button>
              <Link to="/products" className="mt-4 block text-center text-sm text-gray-400 hover:text-black transition-colors underline underline-offset-4">
                Continue Shopping
              </Link>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

export default CartPage;
