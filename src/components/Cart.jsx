'use client';

import useCartStore from "@/hooks/store/cartStore";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const CartPage = ({ setOpen, open }) => {
  const router = useRouter()
  const {cart, removeFromCart,  updateQuantity, clearCart} = useCartStore();
  
  const handleIncrease = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };
  
  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  const removeItem = (id) => {
    removeFromCart(id)
  };

  const totalCost = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex justify-center p-4 font-unbounded">
      <div className="rounded-lg w-full max-w-5xl p-6">
        <div className="grid md:grid-cols-3 gap-6">
        
          <div className="md:col-span-2">
            <h2 className="text-[#171717] text-2xl font-semibold">Shopping Cart</h2>
            <p className="text-gray-500">{cart?.length} Items</p>

            <div className="mt-4 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  {/* Product Image */}
                  <img src={item.image} alt={item?.name} className="w-16 h-16 object-cover rounded-lg" />
                  
                  {/* Product Details */}
                  <div className="flex-1 px-4">
                    <p className="text-[#171717] font-medium">{item?.name}</p>
                    <p className="text-sm text-gray-500">PS4</p>
                    <button onClick={() => removeItem(item?.id)} className="text-red-500 text-sm mt-1">
                      Remove
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-start w-40">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mb-2">
                      <button
                         onClick={() => handleDecrease(item.id, item.quantity)}
                        className="bg-[#292F4A] text-white px-3 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="text-[#171717] font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id, item.quantity)}
                        className="bg-[#292F4A] text-white px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                    
                    <p className="text-[#171717] font-semibold text-right">
                      {(item.price * item.quantity).toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </p>

                  </div>
                </div>
              ))}
            </div>

            
            <div className="flex justify-between items-center">
              <button onClick={() => setOpen(false)} className="text-[#292F4A] mt-4 inline-block">
                ← Continue Shopping
              </button>

              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Clear Cart
                </button>
              )}
              </div>
            </div>

         
          <div className="bg-background p-6 rounded-lg h-fit sticky top-4 mb-14 lg:mb-4">
            <h3 className="text-[#171717] text-xl font-semibold">Order Summary</h3>
            <div className="flex justify-between mt-2">
              <p>Items {cart.length}</p>
              <p>
                {totalCost.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </p>

            </div>
            
            <div className="flex justify-between mt-4 text-lg font-semibold">
              <p>Total Cost</p>
              <p>
                {totalCost.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </p>

            </div>
            <button
              className={`w-full py-3 mt-4 rounded text-lg font-freize font-bold flex items-center justify-center gap-2 ${
                cart.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#292F4A] text-white"
              }`}
              // disabled={cart.length === 0}
              onClick={() => {
                router.push("/checkout")
              }}
            >
              <ShoppingCart size={20} />
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
