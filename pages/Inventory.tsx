
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CARS, CATEGORIES } from '../constants';
import CarCard from '../components/CarCard';
import { CarCategory } from '../types';

const Inventory: React.FC = () => {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory || 'All');
  const [priceRange, setPriceRange] = useState<number>(3000000);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory);
  }, [urlCategory]);

  const toggleFuel = (fuel: string) => {
    setFuelTypes(prev => prev.includes(fuel) ? prev.filter(f => f !== fuel) : [...prev, fuel]);
  };

  const toggleTransmission = (trans: string) => {
    setTransmissions(prev => prev.includes(trans) ? prev.filter(t => t !== trans) : [...prev, trans]);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange(3000000);
    setFuelTypes([]);
    setTransmissions([]);
    setSearchTerm('');
  };

  const filteredCars = useMemo(() => {
    return CARS.filter(car => {
      const matchCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const matchPrice = car.price <= priceRange;
      const matchFuel = fuelTypes.length === 0 || fuelTypes.includes(car.fuel);
      const matchTrans = transmissions.length === 0 || transmissions.includes(car.transmission);
      const matchSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchCategory && matchPrice && matchFuel && matchTrans && matchSearch;
    });
  }, [selectedCategory, priceRange, fuelTypes, transmissions, searchTerm]);

  return (
    <div className="bg-bg-light min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              {selectedCategory === 'All' ? 'Our Collection' : `${selectedCategory} Collection`}
            </h1>
            <p className="text-gray-600 font-medium">{filteredCars.length} cars available</p>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <input 
                type="text" 
                placeholder="Search make or model..."
                className="w-full pl-10 pr-4 py-3 md:py-2 border-2 border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-3 top-3.5 md:top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden bg-white p-3 rounded-xl border-2 border-gray-200 flex items-center shadow-sm"
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className={`${isFilterOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block'} md:sticky md:top-24 self-start space-y-8 bg-white md:p-6 rounded-2xl shadow-sm border border-gray-100`}>
            {isFilterOpen && (
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-gray-500">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            )}
            
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-900">Refine Search</h3>
                <button onClick={clearFilters} className="text-secondary text-sm font-bold hover:underline">Reset</button>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">Category</label>
                <select 
                  className="w-full p-3 border-2 border-gray-100 rounded-xl outline-none bg-gray-50 font-medium text-gray-900 focus:border-primary transition-colors"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">Budget: Up to ₹{(priceRange / 100000).toFixed(1)}L</label>
                <input 
                  type="range" 
                  min="100000" 
                  max="5000000" 
                  step="50000" 
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-xs font-bold text-gray-500 mt-2">
                  <span>₹1L</span>
                  <span>₹50L</span>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Fuel Type</label>
                <div className="space-y-3">
                  {['Petrol', 'Diesel', 'CNG', 'Electric'].map(fuel => (
                    <label key={fuel} className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={fuelTypes.includes(fuel)}
                        onChange={() => toggleFuel(fuel)}
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary" 
                      />
                      <span className="text-gray-700 font-semibold group-hover:text-primary transition-colors">{fuel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Transmission</label>
                <div className="space-y-3">
                  {['Manual', 'Automatic'].map(trans => (
                    <label key={trans} className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={transmissions.includes(trans)}
                        onChange={() => toggleTransmission(trans)}
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary" 
                      />
                      <span className="text-gray-700 font-semibold group-hover:text-primary transition-colors">{trans}</span>
                    </label>
                  ))}
                </div>
              </div>

              {isFilterOpen && (
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold mt-8 md:hidden"
                >
                  Apply Filters
                </button>
              )}
            </div>
          </aside>

          {/* Car Grid */}
          <div className="md:col-span-3">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 md:p-20 rounded-2xl shadow-sm text-center border border-gray-100">
                <div className="text-6xl mb-6">🚗</div>
                <h3 className="text-2xl font-bold text-primary mb-3">No matching cars found</h3>
                <p className="text-gray-500 font-medium mb-8">Try widening your price range or changing categories</p>
                <button 
                  onClick={clearFilters}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
