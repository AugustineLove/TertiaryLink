import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Eye, BookOpen, TrendingUp } from 'lucide-react';
import { useArticles } from '../hooks/useData';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { CardSkeleton } from '../components/UI/SkeletonLoader';

const Articles = () => {
  const [filters, setFilters] = useState({
    category: '',
    search: ''
  });
  
  const { articles, loading, error } = useArticles(filters);

  const categories = ['Admissions', 'Scholarships', 'Career Guidance', 'Student Life', 'Study Tips'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: '', search: '' });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Admissions':
        return '📝';
      case 'Scholarships':
        return '💰';
      case 'Career Guidance':
        return '🎯';
      case 'Student Life':
        return '🎓';
      case 'Study Tips':
        return '📚';
      default:
        return '📖';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Admissions':
        return 'bg-blue-100 text-blue-800';
      case 'Scholarships':
        return 'bg-green-100 text-green-800';
      case 'Career Guidance':
        return 'bg-purple-100 text-purple-800';
      case 'Student Life':
        return 'bg-yellow-100 text-yellow-800';
      case 'Study Tips':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Failed to load articles</div>
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

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Guidance & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Expert advice, tips, and insights to help you navigate your tertiary education journey successfully. 
            From admissions to career planning, we've got you covered.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Find Articles
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
                placeholder="Search articles..."
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

        {/* Featured Articles */}
        {featuredArticles.length > 0 && !filters.category && !filters.search && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-yellow-500" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/articles/${article.slug}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border-l-4 border-l-yellow-500"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getCategoryIcon(article.category)}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readingTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{article.author}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(article.publishedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {loading ? 'Loading...' : `${regularArticles.length} ${featuredArticles.length > 0 && !filters.category && !filters.search ? 'More' : ''} Articles`}
            </h3>
            {!loading && articles.length > 0 && (
              <p className="text-gray-600">
                {filters.search || filters.category ? 'Filtered results' : 'Latest articles and guides'}
              </p>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton count={6} />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
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
            {regularArticles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(article.category)}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readingTime}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium text-gray-900">{article.author}</div>
                      <div className="text-gray-500">
                        {new Date(article.publishedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Eye className="w-4 h-4 mr-1" />
                      {article.views.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Latest Guidance
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get weekly tips, scholarship alerts, and admission guidance delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-6 py-3 rounded-r-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Categories Quick Access */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange('category', category)}
                className={`p-4 rounded-lg border-2 transition-all text-center hover:border-blue-500 hover:bg-blue-50 ${
                  filters.category === category 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-2xl mb-2">{getCategoryIcon(category)}</div>
                <div className="font-medium text-gray-900 text-sm">{category}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;