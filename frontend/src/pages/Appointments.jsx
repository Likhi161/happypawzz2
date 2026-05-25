import { Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Appointments() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-cream min-h-[80vh]">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-gray-900 font-serif">My Appointments</h1>
        </div>
        <Link to="/booking" className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-full shadow transition flex items-center gap-2">
          <Plus className="w-5 h-5" /> Book New
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-4">
          <div className="border border-burgundy-100 bg-burgundy-50 rounded-2xl p-6 hover-lift transition flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Grooming & Spa - Bella</h3>
                <p className="text-gray-600">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">Confirmed</span>
          </div>

          <div className="text-center pt-8 border-t border-gray-100 mt-8">
            <p className="text-gray-500">No past appointments found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
