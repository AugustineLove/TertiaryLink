import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X, Plus, Users, MapPin, Star, Award, ExternalLink, Clock } from 'lucide-react';
import { useUniversities } from '../hooks/useData';

const Compare = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const { universities } = useUniversities();

  useEffect(() => {
    const selectedId = searchParams.get('selected');
    if (selectedId && universities.length > 0) {
      const university = universities.find(uni => uni.id === selectedId);
      if (university && !selectedUniversities.find(uni => uni.id === selectedId)) {
        setSelectedUniversities([university]);
      }
    }
  }, [searchParams, universities]);

  const addUniversity = (university) => {
    if (selectedUniversities.length < 3 && !selectedUniversities.find(uni => uni.id === university.id)) {
      setSelectedUniversities([...selectedUniversities, university]);
    }
    setShowAddModal(false);
  };

  const removeUniversity = (universityId) => {
    setSelectedUniversities(selectedUniversities.filter(uni => uni.id !== universityId));
  };

  const availableUniversities = universities.filter(
    uni => !selectedUniversities.find(selected => selected.id === uni.id)
  );

  const comparisonRows = [
    {
      label: 'Type',
      getValue: (uni) => uni.type,
      getColor: (value) => value === 'Public' ? 'text-green-600' : 'text-blue-600'
    },
    {
      label: 'Location',
      getValue: (uni) => `${uni.location}, ${uni.region}`,
      getColor: () => 'text-gray-900'
    },
    {
      label: 'Established',
      getValue: (uni) => uni.establishedYear,
      getColor: () => 'text-gray-900'
    },
    {
      label: 'Students',
      getValue: (uni) => uni.studentPopulation.toLocaleString(),
      getColor: () => 'text-gray-900'
    },
    {
      label: 'Ranking',
      getValue: (uni) => uni.ranking ? `#${uni.ranking}` : 'Not ranked',
      getColor: (value) => value !== 'Not ranked' ? 'text-yellow-600' : 'text-gray-500'
    },
    {
      label: 'Accreditation',
      getValue: (uni) => uni.accreditation,
      getColor: () => 'text-green-600'
    },
    {
      label: 'Tuition (Local)',
      getValue: (uni) => `GHS ${uni.tuitionRange.local.min.toLocaleString()} - ${uni.tuitionRange.local.max.toLocaleString()}`,
      getColor: () => 'text-gray-900'
    },
    {
      label: 'Application Deadline',
      getValue: (uni) => new Date(uni.applicationDeadline).toLocaleDateString(),
      getColor: () => 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compare Universities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Compare up to 3 universities side-by-side to make an informed decision about your tertiary education.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedUniversities.length === 0 ? (
          // Empty State
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-6">⚖️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Comparing Universities
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Select universities to compare their programs, tuition, facilities, and more. 
              You can compare up to 3 universities at once.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Universities to Compare
            </button>
          </div>
        ) : (
          // Comparison View
          <div className="space-y-8">
            {/* University Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedUniversities.map((university) => (
                <div key={university.id} className="bg-white rounded-xl shadow-sm border p-6 relative">
                  <button
                    onClick={() => removeUniversity(university.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={university.logo}
                      alt={`${university.name} logo`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {university.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {university.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      university.type === 'Public' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {university.type}
                    </span>
                    {university.ranking && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        #{university.ranking}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {university.description}
                  </p>

                  <div className="space-y-2">
                    <Link
                      to={`/universities/${university.id}`}
                      className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      View Details
                    </Link>
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Official Site
                    </a>
                  </div>
                </div>
              ))}

              {selectedUniversities.length < 3 && (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex items-center justify-center">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <p className="text-gray-600 font-medium group-hover:text-blue-600 transition-colors">
                      Add University
                    </p>
                  </button>
                </div>
              )}
            </div>

            {/* Comparison Table */}
            {selectedUniversities.length > 1 && (
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Detailed Comparison
                  </h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Criteria
                        </th>
                        {selectedUniversities.map((university) => (
                          <th key={university.id} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                            {university.shortName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {comparisonRows.map((row, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {row.label}
                          </td>
                          {selectedUniversities.map((university) => {
                            const value = row.getValue(university);
                            return (
                              <td key={university.id} className={`px-6 py-4 text-sm ${row.getColor(value)}`}>
                                {value}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      
                      {/* Courses Row */}
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          Top Courses
                        </td>
                        {selectedUniversities.map((university) => (
                          <td key={university.id} className="px-6 py-4 text-sm">
                            <div className="space-y-1">
                              {university.coursesOffered.slice(0, 3).map((course, index) => (
                                <div key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                  {course}
                                </div>
                              ))}
                              {university.coursesOffered.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  +{university.coursesOffered.length - 3} more
                                </div>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Facilities Row */}
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          Key Facilities
                        </td>
                        {selectedUniversities.map((university) => (
                          <td key={university.id} className="px-6 py-4 text-sm">
                            <div className="space-y-1">
                              {university.facilities.slice(0, 3).map((facility, index) => (
                                <div key={index} className="text-gray-700 text-xs">
                                  • {facility}
                                </div>
                              ))}
                              {university.facilities.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  +{university.facilities.length - 3} more
                                </div>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Need more information? Connect with current students or explore detailed university profiles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/ambassadors"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center justify-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Talk to Students
                </Link>
                <Link
                  to="/universities"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Explore More Universities
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Add University Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  Add University to Compare
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid md:grid-cols-2 gap-4">
                  {availableUniversities.map((university) => (
                    <div
                      key={university.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => addUniversity(university)}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={university.logo}
                          alt={`${university.name} logo`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{university.name}</h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {university.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          university.type === 'Public' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {university.type}
                        </span>
                        {university.ranking && (
                          <span className="flex items-center text-sm text-yellow-600">
                            <Star className="w-4 h-4 mr-1" />
                            #{university.ranking}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;