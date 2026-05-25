import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return (cartItems.reduce((total, item) => total + item.price, 0) * 80).toFixed(2);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-cream min-h-[80vh]">
      <div className="mb-10 flex items-center gap-3">
        <ShoppingBag className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold text-gray-900 font-serif">Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-burgundy-100 shadow-sm">
          <div className="w-24 h-24 bg-burgundy-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any products to your cart yet. Discover our premium pet products!</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-full transition shadow-md hover-lift">
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 flex items-center gap-6 shadow-sm border border-gray-100">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply p-2" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <div className="text-xl font-black text-primary mb-4">₹{(item.price * 80).toFixed(2)}</div>
                </div>
                <button 
                  onClick={() => removeFromCart(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                  title="Remove from cart"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-3xl p-8 h-fit shadow-sm border border-burgundy-100 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium text-gray-900">₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="font-medium text-gray-900">Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 mb-8 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-3xl font-black text-primary">₹{calculateTotal()}</span>
            </div>
            <Link to="/checkout" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl transition shadow-md hover-lift flex justify-center items-center gap-2">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
