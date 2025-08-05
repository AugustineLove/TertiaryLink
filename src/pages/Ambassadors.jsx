import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, MessageCircle, Phone, Mail, Star } from 'lucide-react';
import { useAmbassadors, useUniversities, useCourses } from '../hooks/useData';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { CardSkeleton } from '../components/UI/SkeletonLoader';

const Ambassadors = () => {
  const [filters, setFilters] = useState({
    university: '',
    course: '',
    region: ''
  });
  const [selectedAmbassador, setSelectedAmbassador] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const { ambassadors, loading, error } = useAmbassadors(filters);
  const { universities } = useUniversities();
  const { courses } = useCourses();

  const regions = ['Greater Accra', 'Ashanti', 'Central', 'Eastern', 'Western'];
  const uniqueUniversities = [...new Set(ambassadors.map(amb => amb.university))];
  const uniqueCourses = [...new Set(ambassadors.map(amb => amb.course))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ university: '', course: '', region: '' });
  };

  const openContactModal = (ambassador) => {
    setSelectedAmbassador(ambassador);
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setSelectedAmbassador(null);
    setShowContactModal(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Failed to load ambassadors</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Connect with Student Ambassadors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Get firsthand insights from current students about university life, courses, and campus culture. 
            Our ambassadors are here to help you make informed decisions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Find Your Perfect Ambassador
            </h2>
            {(filters.university || filters.course || filters.region) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* University Filter */}
            <select
              value={filters.university}
              onChange={(e) => handleFilterChange('university', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Universities</option>
              {uniqueUniversities.map(university => (
                <option key={university} value={university}>{university}</option>
              ))}
            </select>

            {/* Course Filter */}
            <select
              value={filters.course}
              onChange={(e) => handleFilterChange('course', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Courses</option>
              {uniqueCourses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>

            {/* Region Filter */}
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {loading ? 'Loading...' : `${ambassadors.length} Ambassadors Available`}
            </h3>
            {!loading && ambassadors.length > 0 && (
              <p className="text-gray-600">
                Ready to help you with your university journey
              </p>
            )}
          </div>
        </div>

        {/* Ambassadors Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton count={6} />
          </div>
        ) : ambassadors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No ambassadors found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ambassadors.map((ambassador) => (
              <div key={ambassador.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border overflow-hidden">
                <div className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={ambassador.avatar}
                      alt={ambassador.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {ambassador.name}
                      </h3>
                      <p className="text-blue-600 font-medium">{ambassador.course}</p>
                      <p className="text-gray-600 text-sm">{ambassador.year}</p>
                    </div>
                  </div>

                  {/* University & Location */}
                  <div className="mb-4">
                    <div className="text-gray-900 font-medium mb-1">{ambassador.university}</div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {ambassador.region}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {ambassador.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {ambassador.specialties.map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {ambassador.languages.map((language, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Available</h4>
                    <p className="text-sm text-gray-600">{ambassador.availability}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => openContactModal(ambassador)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Ambassador
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`mailto:${ambassador.contact.email}`}
                        className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </a>
                      <a
                        href={`tel:${ambassador.contact.phone}`}
                        className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Modal */}
        {showContactModal && selectedAmbassador && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  Contact {selectedAmbassador.name}
                </h3>
                <button
                  onClick={closeContactModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={selectedAmbassador.avatar}
                    alt={selectedAmbassador.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {selectedAmbassador.name}
                    </h4>
                    <p className="text-blue-600 font-medium">{selectedAmbassador.course}</p>
                    <p className="text-gray-600">{selectedAmbassador.university}</p>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>General Inquiry</option>
                      <option>Course Information</option>
                      <option>Campus Life</option>
                      <option>Application Process</option>
                      <option>Scholarship Information</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What would you like to know about university life, courses, or application process?"
                    ></textarea>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={closeContactModal}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to Become an Ambassador?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Help fellow students by sharing your university experience. Join our ambassador program and make a difference in someone's educational journey.
          </p>
          <Link
            to="/ambassador-signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Apply to be an Ambassador
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ambassadors;