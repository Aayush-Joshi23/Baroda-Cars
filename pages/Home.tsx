
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CARS, TESTIMONIALS } from '../constants';
import CarCard from '../components/CarCard';

const Home: React.FC = () => {
  const [activeHero, setActiveHero] = useState(0);
  const heroSlides = [
    { 
      img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1920', 
      title: 'Your Trusted Partner for Quality Used Cars in Baroda',
      subtitle: 'Certified checks, transparent history, best prices.'
    },
    { 
      img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920', 
      title: '150+ Happy Customers and Counting',
      subtitle: 'Join our family of satisfied vehicle owners today.'
    },
    { 
      img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920', 
      title: 'Quality Certified Premium Vehicles',
      subtitle: 'Each car undergoes a rigorous 140-point inspection.'
    },
    { 
      img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1920', 
      title: 'Best Prices Guaranteed in the Market',
      subtitle: 'Unbeatable value for your next dream car.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="flex flex-col">
      {/* Section 1: Hero Banner */}
      <section className="relative h-[550px] md:h-[700px] overflow-hidden bg-black">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === activeHero ? 'opacity-70' : 'opacity-0'}`}
          >
            <img src={slide.img} alt="Banner" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <h1 className="text-white text-3xl md:text-6xl font-extrabold mb-6 max-w-5xl drop-shadow-2xl leading-tight fade-in">
            {heroSlides[activeHero].title}
          </h1>
          <p className="text-white text-lg md:text-2xl mb-10 max-w-3xl drop-shadow-lg opacity-90 font-medium">
            {heroSlides[activeHero].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
            <Link to="/cars" className="bg-secondary text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl text-center">
              Browse Inventory
            </Link>
            <a href="tel:+919876543210" className="bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-center">
              Call Now
            </a>
          </div>
        </div>
        {/* Carousel Dots */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveHero(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeHero ? 'bg-secondary w-10' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      {/* Section 2: Quick Search Bar */}
      <section className="container mx-auto px-4 -mt-16 md:-mt-20 z-30">
        <div className="bg-white p-6 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Category</label>
              <select className="w-full p-4 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-gray-50 text-gray-900 font-medium">
                <option>All Categories</option>
                <option>Hatchback</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Luxury</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Max Price</label>
              <select className="w-full p-4 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-gray-50 text-gray-900 font-medium">
                <option>No Limit</option>
                <option>₹5 Lakh</option>
                <option>₹10 Lakh</option>
                <option>₹20 Lakh</option>
                <option>₹30 Lakh+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Fuel</label>
              <select className="w-full p-4 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-gray-50 text-gray-900 font-medium">
                <option>All Types</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>CNG</option>
                <option>Electric</option>
              </select>
            </div>
            <Link to="/cars" className="bg-secondary text-white p-4 rounded-xl font-bold text-center hover:bg-orange-600 transition-all shadow-lg transform active:scale-95">
              Search Inventory
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Featured Cars */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-primary mb-3">Hand-Picked Arrivals</h2>
              <p className="text-gray-600 font-medium">Certified quality, unbeatable value</p>
            </div>
            <Link to="/cars" className="text-primary font-bold hover:text-secondary transition-all flex items-center group">
              Explore All <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CARS.slice(0, 8).map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">Built on Trust, Driven by Quality</h2>
            <p className="text-gray-600 text-lg">We've simplified the used car buying experience in Vadodara with transparency and customer-first service.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: 'shield', title: 'Quality Inspection', desc: 'Comprehensive 140-point technical check by experts.' },
              { icon: 'price', title: 'Fair Pricing', desc: 'No hidden fees. Just honest, market-best rates.' },
              { icon: 'history', title: 'Full Transparency', desc: 'Verified service records and accident-free certifications.' },
              { icon: 'support', title: 'Dedicated Support', desc: 'Assistance from RC transfer to long-term care.' }
            ].map((item, i) => (
              <div key={i} className="text-center group p-8 rounded-3xl hover:bg-blue-50 transition-all duration-300">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-20">Customer Success Stories</h2>
          <div className="flex flex-nowrap space-x-8 animate-scroll overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing">
            {TESTIMONIALS.map(test => (
              <div key={test.id} className="min-w-[320px] md:min-w-[450px] bg-blue-900/50 p-10 rounded-3xl border border-blue-800 backdrop-blur-sm">
                <div className="flex text-secondary mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-xl italic mb-8 leading-relaxed opacity-90">"{test.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center font-bold text-xl mr-4">{test.name[0]}</div>
                  <p className="font-bold text-secondary text-lg">{test.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-10">Visit Our Showroom</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all mr-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-1">Our Location</h4>
                    <p className="text-gray-600 font-medium">Plot 123, ABC Road, Vadodara, Gujarat 390007</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all mr-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-1">Direct Contact</h4>
                    <p className="text-gray-600 font-medium">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all mr-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-1">Working Hours</h4>
                    <p className="text-gray-600 font-medium">Mon - Sat: 10:00 AM - 07:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl h-[350px] border-4 border-gray-50">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.68202111053!2d73.103046!3d22.3071588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a30ab3%3A0x33cf74205f96305a!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000" 
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="bg-bg-light p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-extrabold text-primary mb-8">Send an Inquiry</h3>
              <form action="https://formspree.io/f/placeholder" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Full Name</label>
                    <input type="text" name="name" placeholder="John Doe" required className="w-full p-4 border-2 border-white rounded-xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-gray-900 font-semibold bg-white placeholder-gray-300" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Phone Number</label>
                    <input type="tel" name="phone" placeholder="+91 00000 00000" required className="w-full p-4 border-2 border-white rounded-xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-gray-900 font-semibold bg-white placeholder-gray-300" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Email Address</label>
                  <input type="email" name="email" placeholder="john@example.com" required className="w-full p-4 border-2 border-white rounded-xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-gray-900 font-semibold bg-white placeholder-gray-300" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Message</label>
                  <textarea name="message" rows={5} placeholder="I am interested in the 2020 Swift. Please share details..." className="w-full p-4 border-2 border-white rounded-xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-gray-900 font-semibold bg-white placeholder-gray-300 resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-5 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-xl transform active:scale-[0.98] text-lg">
                  Submit Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
