import { Bell, Info } from 'lucide-react';

export default function Notifications() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-cream min-h-[80vh]">
      <div className="mb-10 flex items-center gap-3">
        <Bell className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold text-gray-900 font-serif">Notifications</h1>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-4">
          <div className="border border-amber-100 bg-amber-50 rounded-2xl p-6 flex gap-4 items-start">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Appointment Reminder</h3>
              <p className="text-gray-700 text-sm">Don't forget your upcoming grooming appointment for Bella tomorrow at 10:00 AM.</p>
              <span className="text-xs text-gray-400 mt-2 block">2 hours ago</span>
            </div>
          </div>

          <div className="border border-blue-100 bg-blue-50 rounded-2xl p-6 flex gap-4 items-start">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Order Shipped</h3>
              <p className="text-gray-700 text-sm">Your order #12345 containing Premium Salmon Kibble has been shipped.</p>
              <span className="text-xs text-gray-400 mt-2 block">1 day ago</span>
            </div>
          </div>
          
          <div className="border border-gray-100 bg-gray-50 rounded-2xl p-6 flex gap-4 items-start opacity-70">
            <div className="bg-gray-200 text-gray-600 p-2 rounded-full">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Welcome to Happy Paws</h3>
              <p className="text-gray-700 text-sm">Thanks for joining! Check out our shop and meet the pets.</p>
              <span className="text-xs text-gray-400 mt-2 block">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
