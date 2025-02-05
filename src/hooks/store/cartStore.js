import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    set => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find((item) => item.id === product.id);
      
          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + product.quantity }
                  : item
              ),
            };
          } else {
            return { cart: [...state.cart, { ...product, quantity: product.quantity }] };
          }
        }),
      
      removeFromCart: id =>
        set(state => ({
          cart: state.cart.filter(item => item.id !== id)
        })),

      // Update quantity of a product
      updateQuantity: (id, amount) =>
        set(state => ({
          cart: state.cart.map(
            item =>
              item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                : item
          )
        }))
    }),
    {
      name: "cart-storage", // Local storage key
      storage: createJSONStorage(() => localStorage) // Store in localStorage
    }
  )
);

export default useCartStore;
