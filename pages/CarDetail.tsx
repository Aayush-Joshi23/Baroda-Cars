
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CARS } from '../constants';

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const car = CARS.find(c => c.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Car not found!</h2>
        <Link to="/cars" className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Back to Inventory</Link>
      </div>
    );
  }

  const whatsappMsg = `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} priced at ₹${(car.price / 100000).toFixed(2)}L. Can you share more details and a location for a test drive?`;

  return (
    <div className="bg-bg-light min-h-screen py-6 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6 text-gray-500 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/cars" className="hover:text-primary transition-colors">Inventory</Link>
          <span className="mx-2">/</span>
          <span className="text-primary font-bold">{car.make} {car.model}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Left Panel: Gallery & Specs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="bg-white p-3 md:p-5 rounded-3xl shadow-sm border border-gray-100">
              <div 
                className="relative h-64 sm:h-80 md:h-[500px] rounded-2xl overflow-hidden mb-5 cursor-zoom-in"
                onClick={() => setShowLightbox(true)}
              >
                <img 
                  src={car.images[activeImg] || car.images[0]} 
                  alt={`${car.make} ${car.model}`} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest">
                  {activeImg + 1} / {car.images.length}
                </div>
              </div>
              <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar">
                {car.images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImg(i)}
                    className={`w-24 h-20 md:w-32 md:h-24 flex-shrink-0 rounded-xl overflow-hidden border-4 transition-all duration-300 ${i === activeImg ? 'border-secondary shadow-lg scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumb ${i}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Header Info */}
            <div className="px-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-secondary text-white text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-tighter">Certified Quality</span>
                <span className="bg-primary/10 text-primary text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-tighter">{car.category}</span>
                <span className="bg-green-100 text-green-700 text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-tighter">GJ-REG</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">{car.year} {car.make} {car.model}</h1>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl md:text-5xl font-black text-secondary">₹{(car.price / 100000).toFixed(2)} Lakh</span>
                <span className="text-gray-400 font-bold line-through text-lg">₹{((car.price * 1.1) / 100000).toFixed(2)}L</span>
              </div>
            </div>

            {/* Specs Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-primary text-white px-8 py-5 font-bold text-xl flex items-center">
                <svg className="w-6 h-6 mr-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                Detailed Specifications
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0">
                {[
                  { label: 'Manufacturer', value: car.make },
                  { label: 'Model Name', value: `${car.model} ${car.variant}` },
                  { label: 'Manufacturing Year', value: car.year },
                  { label: 'Fuel Type', value: car.fuel },
                  { label: 'Transmission', value: car.transmission },
                  { label: 'Odometer Reading', value: `${car.km.toLocaleString()} km` },
                  { label: 'Owner Count', value: car.ownership },
                  { label: 'RTO Registration', value: car.registration },
                  { label: 'Insurance Status', value: car.insurance },
                  { label: 'Exterior Color', value: car.color },
                  { label: 'Engine Capacity', value: car.engine },
                  { label: 'Seating Capacity', value: `${car.seating} People` }
                ].map((spec, i) => (
                  <div key={i} className={`flex justify-between p-5 px-8 ${i % 2 === 0 ? 'bg-bg-light' : 'bg-white'}`}>
                    <span className="text-gray-500 font-bold text-sm uppercase tracking-wide">{spec.label}</span>
                    <span className="font-extrabold text-primary text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features & Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
                   <div className="w-8 h-8 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   Premium Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {car.features.map((feat, i) => (
                    <li key={i} className="text-gray-700 flex items-center font-bold text-sm">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
                   <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   Expert Review
                </h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed mb-6">{car.condition}</p>
                <div className="p-4 bg-green-50 text-green-700 text-xs font-bold rounded-2xl border-2 border-green-100 flex items-center">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  100% Non-accidental certified vehicle. RC Transfer handled by our team.
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Sticky CTA */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-50">
                <h3 className="text-2xl font-extrabold text-primary mb-8">Ready for a Drive?</h3>
                <div className="space-y-4 mb-10">
                  <a 
                    href="tel:+919876543210" 
                    className="flex items-center justify-center w-full bg-primary text-white py-5 rounded-2xl font-bold hover:bg-blue-900 transition-all shadow-xl transform active:scale-95"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Call Showroom
                  </a>
                  <a 
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-green-500 text-white py-5 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-xl transform active:scale-95"
                  >
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.436 1.096 3.389l-.717 2.634 2.7-.711c.907.51 1.954.805 3.067.805 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.125 7.846c-.147.412-.751.751-1.042.802-.291.051-.65.093-1.042-.147-.392-.24-1.63-.802-2.316-1.428-.586-.532-1.076-1.116-1.31-1.52-.234-.404-.025-.624.175-.824.2-.2.412-.412.553-.618.141-.206.188-.344.275-.55.088-.206.044-.385-.022-.55-.066-.165-.553-1.334-.757-1.821-.2-.487-.404-.412-.553-.412h-.412c-.147 0-.385.051-.586.275-.206.224-.751.751-.751 1.821 0 1.07.751 2.1 1.07 2.231.206.131 1.63 2.49 3.945 3.493.55.24 1.01.385 1.343.487.553.175 1.07.147 1.474.088.45-.066 1.042-.412 1.25-.802.206-.412.206-.751.147-.802-.06-.051-.22-.093-.45-.206z"/></svg>
                    WhatsApp Chat
                  </a>
                </div>

                <div className="border-t border-gray-100 pt-10">
                  <h4 className="font-extrabold text-gray-800 mb-6 uppercase tracking-wider text-sm">Schedule Test Drive</h4>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">Your Name</label>
                      <input type="text" placeholder="John Doe" className="w-full p-4 border-2 border-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-900 font-bold bg-gray-50 placeholder-gray-300" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">Phone Number</label>
                      <input type="tel" placeholder="+91 00000 00000" className="w-full p-4 border-2 border-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-900 font-bold bg-gray-50 placeholder-gray-300" required />
                    </div>
                    <button type="button" className="w-full bg-secondary text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl transform active:scale-95 text-lg">
                      Confirm Appointment
                    </button>
                  </form>
                  <p className="text-[10px] text-gray-400 text-center mt-6 font-medium uppercase tracking-tighter">We will call you back within 15 minutes to confirm.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        <div className="mt-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-primary mb-2">Similar Collection</h2>
              <p className="text-gray-600 font-bold">Recommended for you</p>
            </div>
            <Link to="/cars" className="text-primary font-bold hover:text-secondary underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CARS.filter(c => c.category === car.category && c.id !== car.id).slice(0, 4).map(item => (
              <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="h-44 overflow-hidden">
                  <img src={item.images[0]} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.model} />
                </div>
                <div className="p-6">
                  <h4 className="font-extrabold text-primary truncate text-lg mb-1">{item.year} {item.make} {item.model}</h4>
                  <p className="text-secondary font-black text-xl mb-4">₹{(item.price / 100000).toFixed(2)}L</p>
                  <Link to={`/car/${item.id}`} className="block w-full text-center py-3 bg-primary/5 text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all">Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          onClick={() => setShowLightbox(false)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-secondary transition-all transform hover:rotate-90">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="relative max-w-6xl w-full flex items-center justify-center">
             <button 
              onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg - 1 + car.images.length) % car.images.length); }}
              className="absolute left-0 md:-left-20 bg-white/10 hover:bg-white/30 text-white p-4 rounded-full transition-all"
             >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
             </button>
             
             <img 
              src={car.images[activeImg]} 
              className="max-h-[85vh] max-w-full object-contain shadow-2xl rounded-2xl border-4 border-white/10"
              alt="Gallery Preview" 
              onClick={(e) => e.stopPropagation()}
            />

             <button 
              onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg + 1) % car.images.length); }}
              className="absolute right-0 md:-right-20 bg-white/10 hover:bg-white/30 text-white p-4 rounded-full transition-all"
             >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </button>
          </div>
          <div className="mt-8 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
             <p className="text-white font-black tracking-widest text-sm">{activeImg + 1} / {car.images.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;
