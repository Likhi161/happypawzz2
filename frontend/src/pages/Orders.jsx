import { ShoppingBag, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Orders() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-cream min-h-[80vh]">
      <div className="mb-10 flex items-center gap-3">
        <Package className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold text-gray-900 font-serif">My Orders</h1>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-6">
          {/* Sample Order */}
          <div className="border border-gray-100 rounded-2xl p-6 hover-lift transition shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-4">
              <div>
                <span className="text-gray-500 text-sm">Order Placed: Today</span>
                <div className="font-bold text-gray-900">Order #12345</div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Shipped</span>
                <div className="font-black text-primary mt-1">₹3679.20</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                <img src="https://placehold.co/400x400/fce8eb/b22240?text=Salmon+Kibble" alt="Item" className="object-contain p-1" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Premium Salmon Kibble</h4>
                <p className="text-sm text-gray-500">Qty: 1</p>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8">
            <p className="text-gray-500 mb-4">You have no other past orders.</p>
            <Link to="/shop" className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-full shadow transition inline-flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Go to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
