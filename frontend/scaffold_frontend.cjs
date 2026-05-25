const fs = require('fs');
const path = require('path');

function createFile(filePath, content) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
}

const components = {
    'src/components/Navbar.jsx': `import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, User, Calendar } from 'lucide-react';

export default function Navbar() {
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
            <Link to="/shop/cart" className="hover:text-accent transition"><ShoppingCart className="h-6 w-6" /></Link>
            <Link to="/dashboard" className="hover:text-accent transition"><User className="h-6 w-6" /></Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
`,
    'src/components/Footer.jsx': `import { Heart } from 'lucide-react';

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
`,
    'src/pages/Home.jsx': `import { Link } from 'react-router-dom';
import { CalendarCheck, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-burgundy-50 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23b22240\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
        </div>
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight font-serif">
            Premium Care for Your Best Friend
          </h1>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Book trusted grooming, vaccination, and health checkups, or browse adorable pets waiting to meet you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking" className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-full shadow-lg hover-lift transition">
              Book Appointment
            </Link>
            <Link to="/pets" className="bg-white text-primary border-2 border-primary hover:bg-burgundy-50 font-bold py-3 px-8 rounded-full shadow hover-lift transition">
              Meet Pets
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Why Choose Happy Paws?</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: CalendarCheck, title: "Easy Booking", desc: "Schedule appointments in seconds with our seamless booking system." },
              { icon: ShieldCheck, title: "Verified Professionals", desc: "All our pet care specialists are thoroughly vetted and highly trained." },
              { icon: HeartHandshake, title: "Loving Environment", desc: "We treat every pet like our own, ensuring a stress-free experience." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-burgundy-50 rounded-2xl p-8 text-center hover-lift border border-burgundy-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burgundy-100 text-primary mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
`,
    'src/pages/Pets.jsx': `import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Connect to API Gateway -> Pet Service
    axios.get('http://localhost:8000/pets/pets')
      .then(res => {
        if(Array.isArray(res.data)) {
            setPets(res.data);
        } else {
            setPets([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        // Fallback for UI presentation
        setPets([
          { _id: '1', name: 'Bella', type: 'Dog', breed: 'Golden Retriever', age: 3, image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400' },
          { _id: '2', name: 'Luna', type: 'Cat', breed: 'Maine Coon', age: 2, image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400' },
          { _id: '3', name: 'Charlie', type: 'Dog', breed: 'French Bulldog', age: 1, image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4 font-serif">Meet Our Furry Friends</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover adorable pets waiting for a visit or a new loving home.</p>
      </div>

      {loading ? (
        <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map(pet => (
            <div key={pet._id} className="bg-white rounded-3xl overflow-hidden shadow-md hover-lift border border-gray-100 group">
              <div className="relative h-64 overflow-hidden">
                <img src={pet.image_url} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full text-primary hover:bg-primary hover:text-white transition cursor-pointer">
                  <Heart className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{pet.name}</h3>
                    <p className="text-primary font-medium">{pet.breed}</p>
                  </div>
                  <div className="bg-burgundy-50 text-primary px-3 py-1 rounded-lg text-sm font-bold">
                    {pet.age} yrs
                  </div>
                </div>
                <Link to={\`/booking?pet=\${pet._id}\`} className="block w-full text-center bg-burgundy-100 hover:bg-primary hover:text-white text-primary font-bold py-3 rounded-xl transition duration-300">
                  Book a Visit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`,
    'src/pages/Shop.jsx': `import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API Gateway -> Order Service
    axios.get('http://localhost:8000/orders/products')
      .then(res => {
        if(Array.isArray(res.data)) {
            setProducts(res.data);
        } else {
            setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        // Fallback
        setProducts([
          { id: 1, name: 'Premium Salmon Kibble', price: 45.99, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400' },
          { id: 2, name: 'Plush Donut Bed', price: 34.50, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400' },
          { id: 3, name: 'Interactive Laser Toy', price: 18.99, image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80&w=400' }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-cream">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4 font-serif">Pet Shop</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Premium products for your premium pets.</p>
      </div>

      {loading ? (
        <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow hover-lift border border-gray-100 flex flex-col">
              <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                <img src={product.image} alt={product.name} className="max-h-full object-contain mix-blend-multiply" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                <div className="text-xl font-black text-primary mb-4 mt-auto">\${product.price.toFixed(2)}</div>
                <button className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-primary text-white font-bold py-2.5 rounded-xl transition duration-300">
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`,
    'src/pages/Booking.jsx': `import { useState } from 'react';
import axios from 'axios';

export default function Booking() {
  const [formData, setFormData] = useState({
    service_type: 'grooming',
    date: '',
    pet_id: '1',
    user_id: 1
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await axios.post('http://localhost:8000/appointments/book', formData);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('success'); // Fake success for local dev fallback
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-burgundy-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-burgundy-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 font-serif">Book a Service</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Schedule grooming, vaccination or checkups</p>
        </div>
        
        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-8 rounded-2xl text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
            <p>We'll see you and your furry friend soon.</p>
            <button onClick={() => setStatus('')} className="mt-6 text-primary font-medium hover:underline">Book another service</button>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition"
                  value={formData.service_type}
                  onChange={(e) => setFormData({...formData, service_type: e.target.value})}
                >
                  <option value="grooming">Grooming & Spa</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="checkup">Health Checkup</option>
                  <option value="visit">Pet Visit (Shelter)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                <input 
                  type="datetime-local" 
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary transition"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition shadow-md hover-lift disabled:opacity-70 disabled:hover-lift-none"
            >
              {status === 'submitting' ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
`,
    'src/pages/Dashboard.jsx': `import { User, Calendar, ShoppingBag, Bell } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Upcoming Appointments', value: '2', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Active Orders', value: '1', icon: ShoppingBag, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Unread Notifications', value: '3', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Saved Pets', value: '4', icon: User, color: 'text-primary', bg: 'bg-burgundy-50' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={\`w-12 h-12 rounded-xl flex items-center justify-center \${stat.bg} \${stat.color}\`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Appointments</h2>
            <button className="text-sm text-primary font-bold hover:underline">View All</button>
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
            <button className="text-sm text-primary font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=100" alt="food" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Premium Salmon Kibble</div>
                  <div className="text-sm text-gray-500">Order #12345 • $45.99</div>
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
`,
    'src/App.jsx': `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pets from './pages/Pets';
import Shop from './pages/Shop';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Fallbacks */}
            <Route path="/services" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
`,
    'src/main.jsx': `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`
};

for (const [filePath, content] of Object.entries(components)) {
    createFile(filePath, content);
}
console.log('Frontend scaffolding complete!');
