import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Users, BookOpen, Award, Star, ChevronRight } from 'lucide-react';
import { useArticles } from '../hooks/useData';

const Home = () => {
  const { articles } = useArticles({ featured: true });

  const features = [
    {
      icon: Search,
      title: 'Compare Universities',
      description: 'Compare universities side-by-side to find the perfect match for your academic goals and budget.',
      link: '/compare',
      color: 'blue'
    },
    {
      icon: BookOpen,
      title: 'Explore Courses',
      description: 'Discover detailed information about courses, requirements, and career prospects.',
      link: '/courses',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Connect with Ambassadors',
      description: 'Get firsthand insights from current students at your universities of interest.',
      link: '/ambassadors',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'Scholarship Guidance',
      description: 'Find scholarship opportunities and get help with your applications.',
      link: '/articles',
      color: 'yellow'
    }
  ];

  const stats = [
    { number: '50+', label: 'Universities' },
    { number: '200+', label: 'Courses' },
    { number: '1000+', label: 'Students Helped' },
    { number: '95%', label: 'Success Rate' }
  ];

  const testimonials = [
    {
      name: 'Akosua Mensah',
      university: 'University of Ghana',
      course: 'Computer Science',
      text: 'Tertiary Link helped me compare universities and connect with current students. I made an informed decision and love my program!',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Kwame Osei',
      university: 'KNUST',
      course: 'Engineering',
      text: 'The ambassador program was incredible. I got real insights about campus life and course requirements before applying.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Ama Asante',
      university: 'UCC',
      course: 'Education',
      text: 'The guidance articles helped me understand the admission process and prepare a strong application. Highly recommended!',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Path to
              <span className="block text-yellow-400">Tertiary Education</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Connect with Ghana's top universities, explore courses, and get personalized guidance from current students to make the best choice for your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/universities"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
              >
                Explore Universities
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/compare"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
              >
                Compare Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{stat.number}</div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Your Tertiary Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From university comparison to connecting with current students, we provide all the tools and resources you need to make informed decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const colorClasses = {
                blue: 'bg-blue-500 text-blue-500 bg-blue-50',
                green: 'bg-green-500 text-green-500 bg-green-50',
                purple: 'bg-purple-500 text-purple-500 bg-purple-50',
                yellow: 'bg-yellow-500 text-yellow-600 bg-yellow-50'
              };

              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border hover:border-gray-200"
                >
                  <div className={`w-12 h-12 ${colorClasses[feature.color].split(' ')[2]} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${colorClasses[feature.color].split(' ')[1]}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    Learn more
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Students Say About Us
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from students who found their perfect university match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.course} • {testimonial.university}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {articles.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Latest Guidance & Insights
                </h2>
                <p className="text-xl text-gray-600">
                  Expert advice to help you navigate your tertiary education journey
                </p>
              </div>
              <Link
                to="/articles"
                className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View all articles
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  to={`/articles/${article.slug}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">{article.readingTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {article.author}</span>
                      <span className="text-sm text-gray-400">
                        {new Date(article.publishedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link
                to="/articles"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View all articles
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect university match with Tertiary Link.
          </p>
          <Link
            to="/signup"
            className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;