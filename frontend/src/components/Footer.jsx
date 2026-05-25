import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-burgundy-900 text-burgundy-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Heart className="h-6 w-6 text-accent" fill="currentColor" />
            <span className="text-xl font-bold">Happy Paws</span>
          </div>
          <p className="text-sm opacity-80">Premium pet care & service booking.</p>
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-white transition">About Us</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
        </div>
      </div>
      <div className="text-center mt-8 text-xs opacity-60">
        &copy; {new Date().getFullYear()} Happy Paws. All rights reserved.
      </div>
    </footer>
  );
}
