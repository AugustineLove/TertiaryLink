import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Clock, TrendingUp, Users, Award } from 'lucide-react';
import { useCourses, useUniversities } from '../hooks/useData';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { CardSkeleton } from '../components/UI/SkeletonLoader';

const Courses = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: ''
  });
  
  const { courses, loading, error } = useCourses(filters);
  const { universities } = useUniversities();

  const categories = ['STEM', 'Health Sciences', 'Business', 'Education', 'Arts', 'Social Sciences'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '' });
  };

  const getUniversitiesForCourse = (courseUniversityIds) => {
    return universities.filter(uni => courseUniversityIds.includes(uni.id));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'STEM':
        return '🔬';
      case 'Health Sciences':
        return '⚕️';
      case 'Business':
        return '💼';
      case 'Education':
        return '📚';
      case 'Arts':
        return '🎨';
      case 'Social Sciences':
        return '🏛️';
      default:
        return '📖';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'STEM':
        return 'bg-blue-100 text-blue-800';
      case 'Health Sciences':
        return 'bg-red-100 text-red-800';
      case 'Business':
        return 'bg-green-100 text-green-800';
      case 'Education':
        return 'bg-purple-100 text-purple-800';
      case 'Arts':
        return 'bg-pink-100 text-pink-800';
      case 'Social Sciences':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Failed to load courses</div>
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
            Explore Courses & Career Paths
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover detailed information about courses, entry requirements, career prospects, and which universities offer your preferred programs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter Courses
            </h2>
            {(filters.search || filters.category) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {loading ? 'Loading...' : `${courses.length} Courses Found`}
            </h3>
            {!loading && courses.length > 0 && (
              <p className="text-gray-600">
                Showing results {filters.search || filters.category ? 'for your filters' : 'for all courses'}
              </p>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <CardSkeleton count={4} />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
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
          <div className="grid lg:grid-cols-2 gap-8">
            {courses.map((course) => {
              const courseUniversities = getUniversitiesForCourse(course.universities);
              
              return (
                <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border overflow-hidden">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{getCategoryIcon(course.category)}</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {course.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(course.category)}`}>
                            {course.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Entry Requirements
                      </h4>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-gray-600">Core:</span>
                          {course.requirements.coreSubjects.map((subject, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                              {subject}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-gray-600">Electives:</span>
                          {course.requirements.electives.map((subject, index) => (
                            <span key={index} className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">
                              {subject}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Minimum Grade:</span> {course.requirements.minimumGrade}
                        </div>
                      </div>
                    </div>

                    {/* Career Prospects */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Career Prospects
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {course.careerProspects.slice(0, 3).map((career, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                            {career}
                          </span>
                        ))}
                        {course.careerProspects.length > 3 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm">
                            +{course.careerProspects.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Average Salary:</span> {course.averageSalary}
                      </div>
                    </div>

                    {/* Universities */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Available at {courseUniversities.length} Universities
                      </h4>
                      <div className="space-y-2">
                        {courseUniversities.slice(0, 3).map((uni) => (
                          <Link
                            key={uni.id}
                            to={`/universities/${uni.id}`}
                            className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                          >
                            <img
                              src={uni.logo}
                              alt={`${uni.name} logo`}
                              className="w-8 h-8 rounded object-cover mr-3"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                {uni.name}
                              </div>
                              <div className="text-sm text-gray-600">{uni.location}</div>
                            </div>
                          </Link>
                        ))}
                        {courseUniversities.length > 3 && (
                          <div className="text-center pt-2">
                            <Link
                              to={`/universities?course=${course.name}`}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              View all {courseUniversities.length} universities
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4 border-t">
                      <Link
                        to={`/universities?course=${course.name}`}
                        className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        View Universities
                      </Link>
                      <Link
                        to="/ambassadors"
                        className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Ask Students
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;