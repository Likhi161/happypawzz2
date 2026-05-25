import { User, Calendar, ShoppingBag, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Upcoming Appointments', value: '2', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50', link: '/appointments' },
          { label: 'Active Orders', value: '1', icon: ShoppingBag, color: 'text-green-500', bg: 'bg-green-50', link: '/orders' },
          { label: 'Unread Notifications', value: '3', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-50', link: '/notifications' },
          { label: 'Saved Pets', value: '4', icon: User, color: 'text-primary', bg: 'bg-burgundy-50', link: '/pets' }
        ].map((stat, idx) => (
          <Link to={stat.link} key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover-lift transition cursor-pointer">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Appointments</h2>
            <Link to="/appointments" className="text-sm text-primary font-bold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Grooming & Spa - Bella</div>
                  <div className="text-sm text-gray-500">Tomorrow, 10:00 AM</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Confirmed</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link to="/orders" className="text-sm text-primary font-bold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src="https://placehold.co/400x400/fce8eb/b22240?text=Salmon+Kibble" alt="food" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Premium Salmon Kibble</div>
                  <div className="text-sm text-gray-500">Order #12345 • ₹3679.20</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Shipped</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
