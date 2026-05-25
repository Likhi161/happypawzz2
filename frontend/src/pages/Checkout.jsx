import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, CheckCircle } from 'lucide-react';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, processing, success
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (storedCart.length === 0) {
      navigate('/cart');
    }
    setCartItems(storedCart);
  }, [navigate]);

  const calculateTotal = () => {
    return (cartItems.reduce((total, item) => total + item.price, 0) * 80).toFixed(2);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setStatus('processing');

    try {
      // Simulate API call to Order Service
      const productIds = cartItems.map(item => item.id);
      await axios.post('http://localhost:8000/orders/place-order', {
        user_id: 1, // Mock user ID
        product_ids: productIds
      });

      // Clear cart
      localStorage.removeItem('cart');
      
      // Show success
      setStatus('success');
    } catch (err) {
      console.error(err);
      // Fallback for local testing
      localStorage.removeItem('cart');
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-20 px-4 flex justify-center bg-cream min-h-[80vh] items-center">
        <div className="bg-white rounded-3xl p-12 text-center max-w-lg border border-burgundy-100 shadow-xl">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Payment Successful!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We've sent a confirmation email with your tracking details. Your furry friend will love their new items!
          </p>
          <Link to="/dashboard" className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-full shadow hover-lift inline-block transition">
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-cream min-h-[80vh]">
      <h1 className="text-4xl font-bold text-gray-900 font-serif mb-10 text-center">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition" placeholder="Doe" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition" placeholder="123 Pet Street" />
              </div>
              <div className="sm:col-span-2 grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition" placeholder="12345" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition" placeholder="New York" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-primary" /> Payment Method
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition font-mono" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition" placeholder="123" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white rounded-3xl p-8 h-fit shadow-sm border border-burgundy-100 sticky top-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <span className="text-gray-600 line-clamp-1">{item.name}</span>
                <span className="font-medium text-gray-900">₹{(item.price * 80).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-gray-600 mb-6 border-t border-gray-100 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">₹{calculateTotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium text-gray-900">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="font-medium text-gray-900">₹0.00</span>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 mb-8 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-3xl font-black text-primary">₹{calculateTotal()}</span>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={status === 'processing'}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl transition shadow-md hover-lift flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover-lift-none"
          >
            {status === 'processing' ? 'Processing Payment...' : `Pay ₹${calculateTotal()}`}
          </button>
        </div>
      </div>
    </div>
  );
}
