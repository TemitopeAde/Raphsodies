'use client';

import { useState } from "react";

const CartPage = ({ setOpen, open }) => {
  const [cart, setCart] = useState([
    { id: 1, name: "Fifa 19", price: 44.0, quantity: 2, image: "/images/bottle.png" },
    { id: 2, name: "Glacier White 500GB", price: 249.99, quantity: 1, image: "/images/bottle.png" },
    { id: 3, name: "Platinum Headset", price: 119.99, quantity: 1, image: "/images/bottle.png" },
  ]);

  const shippingCost = 5.0;

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + shippingCost;

  return (
    <div className="min-h-screen flex justify-center p-4 font-unbounded">
      <div className="rounded-lg w-full max-w-5xl p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Section */}
          <div className="md:col-span-2">
            <h2 className="text-[#171717] text-2xl font-semibold">Shopping Cart</h2>
            <p className="text-gray-500">{cart.length} Items</p>

            <div className="mt-4 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  {/* Product Image */}
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  
                  {/* Product Details */}
                  <div className="flex-1 px-4">
                    <p className="text-[#171717] font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">PS4</p>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm mt-1">
                      Remove
                    </button>
                  </div>
                  
                  {/* Quantity Controls and Price below */}
                  <div className="flex flex-col items-start w-40">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mb-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-[#292F4A] text-white px-3 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="text-[#171717] font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-[#292F4A] text-white px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Price */}
                    <p className="text-[#171717] font-semibold text-right">₦{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setOpen(false)} className="text-[#292F4A] mt-4 inline-block">
              ← Continue Shopping
            </button>
          </div>

          {/* Sticky Order Summary */}
          <div className="bg-background p-6 rounded-lg h-fit sticky top-4 mb-14 lg:mb-4">
            <h3 className="text-[#171717] text-xl font-semibold">Order Summary</h3>
            <div className="flex justify-between mt-2">
              <p>Items {cart.length}</p>
              <p>₦{totalCost.toFixed(2)}</p>
            </div>
            <div className="mt-2">
              <label className="text-gray-600 text-sm">Shipping</label>
              <select className="w-full p-2 border rounded mt-1">
                <option>Standard Delivery - £5.00</option>
              </select>
            </div>

            <div className="flex justify-between mt-4 text-lg font-semibold">
              <p>Total Cost</p>
              <p>₦{totalCost.toFixed(2)}</p>
            </div>
            <button className="bg-[#292F4A] text-white w-full py-3 mt-4 rounded text-lg">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
