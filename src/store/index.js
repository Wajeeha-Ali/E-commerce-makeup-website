import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const CART_KEY = "atelier_cart";

function loadCart() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? { cart: JSON.parse(data) } : undefined;
  } catch {
    return undefined;
  }
}

function saveCart(state) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  } catch {
    // ignore write errors
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadCart(),
});

store.subscribe(() => saveCart(store.getState()));
