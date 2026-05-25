import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, User, LogOut, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Simple auth state listener
  useEffect(() => {
    const checkState = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }

      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(storedCart.length);
    };
    
    checkState();
    // Re-check on route changes or regular intervals for local dev
    const interval = setInterval(checkState, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-accent" fill="currentColor" />
            <Link to="/" className="text-2xl font-bold tracking-wider font-serif">Happy Paws</Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center font-medium">
            <Link to="/" className="hover:text-accent transition">Home</Link>
            <Link to="/services" className="hover:text-accent transition">Services</Link>
            <Link to="/pets" className="hover:text-accent transition">Meet Pets</Link>
            <Link to="/shop" className="hover:text-accent transition">Shop</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="hover:text-accent transition relative flex items-center">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-accent transition flex items-center gap-1">
                  <User className="h-6 w-6" />
                  <span className="hidden sm:inline text-sm font-bold">{user.name || user.email.split('@')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="hover:text-accent transition" title="Logout">
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-accent transition flex items-center gap-1 font-bold">
                <LogIn className="h-6 w-6" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
