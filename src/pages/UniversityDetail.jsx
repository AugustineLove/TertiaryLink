import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Calendar, ExternalLink, Phone, Mail, Star, Award, Clock } from 'lucide-react';
import universitiesData from '../data/universities.json';
import ambassadorsData from '../data/ambassadors.json';

const UniversityDetail = () => {
  const { id } = useParams();
  const university = universitiesData.find(uni => uni.id === id);
  const ambassadors = ambassadorsData.filter(amb => amb.university === university?.name);

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">University not found</h2>
          <Link to="/universities" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/universities"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Universities
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* University Header */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <img
                src={university.logo}
                alt={`${university.name} logo`}
                className="w-24 h-24 rounded-xl object-cover shadow-sm"
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {university.name}
                </h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  {university.location}, {university.region}
                </div>
                <div className="flex flex-wrap gap-2">
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
                  {university.ranking && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Ranked #{university.ranking}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:min-w-0 lg:flex-shrink-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-blue-600">{university.studentPopulation.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-blue-600">{university.establishedYear}</div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-gray-700 text-lg leading-relaxed">
              {university.description}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Courses Offered */}
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses Offered</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {university.coursesOffered.map((course, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="font-medium text-gray-900">{course}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  to="/courses"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all courses and requirements
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>
            </div>

            {/* Tuition & Fees */}
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tuition & Fees</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Local Students</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    GHS {university.tuitionRange.local.min.toLocaleString()} - {university.tuitionRange.local.max.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-700">Per academic year</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">International Students</h3>
                  <div className="text-3xl font-bold text-gray-600 mb-2">
                    USD {university.tuitionRange.international.min.toLocaleString()} - {university.tuitionRange.international.max.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Per academic year</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-800">Application Deadline:</span>
                  <span className="ml-2 text-yellow-700">
                    {new Date(university.applicationDeadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Campus Facilities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {university.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-900">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges & Recognition */}
            {university.badges.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recognition & Specializations</h2>
                <div className="flex flex-wrap gap-3">
                  {university.badges.map((badge, index) => (
                    <span key={index} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{university.contactInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{university.contactInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="w-5 h-5 text-gray-400 mr-3" />
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Official Website
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to={`/compare?selected=${university.id}`}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Add to Compare
                </Link>
                <Link
                  to="/courses"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  View All Courses
                </Link>
              </div>
            </div>

            {/* Student Ambassadors */}
            {ambassadors.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Talk to Current Students</h3>
                <div className="space-y-4">
                  {ambassadors.slice(0, 2).map((ambassador) => (
                    <div key={ambassador.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={ambassador.avatar}
                        alt={ambassador.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{ambassador.name}</div>
                        <div className="text-sm text-gray-600">{ambassador.course}</div>
                      </div>
                    </div>
                  ))}
                  <Link
                    to="/ambassadors"
                    className="block w-full text-center py-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All Ambassadors
                  </Link>
                </div>
              </div>
            )}

            {/* Application Deadline Reminder */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <Clock className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className="text-lg font-bold text-yellow-800">Application Deadline</h3>
              </div>
              <p className="text-yellow-700 mb-3">
                Don't miss the deadline for {new Date().getFullYear() + 1} admissions:
              </p>
              <div className="text-2xl font-bold text-yellow-800 mb-3">
                {new Date(university.applicationDeadline).toLocaleDateString()}
              </div>
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                Apply Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;