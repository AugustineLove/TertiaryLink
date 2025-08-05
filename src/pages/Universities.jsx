import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Users, Star, ExternalLink } from 'lucide-react';
import { useUniversities } from '../hooks/useData';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { CardSkeleton } from '../components/UI/SkeletonLoader';

const Universities = () => {
  const [filters, setFilters] = useState({
    search: '',
    region: '',
    type: '',
    course: ''
  });
  
  const { universities, loading, error } = useUniversities(filters);

  const regions = ['Greater Accra', 'Ashanti', 'Central', 'Eastern', 'Western', 'Northern', 'Upper East', 'Upper West', 'Volta', 'Brong Ahafo'];
  const types = ['Public', 'Private'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', region: '', type: '', course: '' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Failed to load universities</div>
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
            Explore Universities in Ghana
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover detailed information about Ghana's leading universities, from prestigious public institutions to innovative private colleges.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter Universities
            </h2>
            {(filters.search || filters.region || filters.type || filters.course) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search universities..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

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

            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Course Filter */}
            <input
              type="text"
              placeholder="Filter by course..."
              value={filters.course}
              onChange={(e) => handleFilterChange('course', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {loading ? 'Loading...' : `${universities.length} Universities Found`}
            </h3>
            {!loading && universities.length > 0 && (
              <p className="text-gray-600">
                Showing results {filters.search || filters.region || filters.type || filters.course ? 'for your filters' : 'for all universities'}
              </p>
            )}
          </div>
        </div>

        {/* Universities Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton count={6} />
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏫</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
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
            {universities.map((university) => (
              <div key={university.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={university.logo}
                        alt={`${university.name} logo`}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {university.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {university.location}
                        </div>
                      </div>
                    </div>
                    {university.ranking && (
                      <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg text-sm font-medium">
                        <Star className="w-4 h-4 mr-1" />
                        #{university.ranking}
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      university.type === 'Public' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {university.type}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {university.accreditation}
                    </span>
                    {university.badges.map((badge, index) => (
                      <span key={index} className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {university.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-4 h-4 text-gray-600 mr-1" />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {university.studentPopulation.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-gray-900">
                        {university.establishedYear}
                      </div>
                      <div className="text-xs text-gray-600">Established</div>
                    </div>
                  </div>

                  {/* Tuition Range */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-1">Tuition Range (Local)</div>
                    <div className="text-lg font-semibold text-gray-900">
                      GHS {university.tuitionRange.local.min.toLocaleString()} - {university.tuitionRange.local.max.toLocaleString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/universities/${university.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      View Details
                    </Link>
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Universities;