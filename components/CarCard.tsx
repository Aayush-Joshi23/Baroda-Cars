
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const whatsappMsg = `Hi, interested in ${car.year} ${car.make} ${car.model} (${(car.price / 100000).toFixed(2)}L). Can you share more details? Thanks!`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="relative overflow-hidden h-48">
        <img 
          src={car.images[0]} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {car.badge && (
          <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-2 py-1 rounded shadow-md">
            {car.badge}
          </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-primary truncate mb-1">
          {car.year} {car.make} {car.model}
        </h3>
        <p className="text-secondary text-xl font-bold mb-3">
          ₹{(car.price / 100000).toFixed(2)} Lakh
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{car.km.toLocaleString()} km</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="flex space-x-2 mt-auto">
          <Link 
            to={`/car/${car.id}`}
            className="flex-grow bg-primary text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
          >
            View Details
          </Link>
          <a 
            href={`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.436 1.096 3.389l-.717 2.634 2.7-.711c.907.51 1.954.805 3.067.805 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.125 7.846c-.147.412-.751.751-1.042.802-.291.051-.65.093-1.042-.147-.392-.24-1.63-.802-2.316-1.428-.586-.532-1.076-1.116-1.31-1.52-.234-.404-.025-.624.175-.824.2-.2.412-.412.553-.618.141-.206.188-.344.275-.55.088-.206.044-.385-.022-.55-.066-.165-.553-1.334-.757-1.821-.2-.487-.404-.412-.553-.412h-.412c-.147 0-.385.051-.586.275-.206.224-.751.751-.751 1.821 0 1.07.751 2.1 1.07 2.231.206.131 1.63 2.49 3.945 3.493.55.24 1.01.385 1.343.487.553.175 1.07.147 1.474.088.45-.066 1.042-.412 1.25-.802.206-.412.206-.751.147-.802-.06-.051-.22-.093-.45-.206z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
