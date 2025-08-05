import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, MessageCircle, User, Settings, Plus, Star, Calendar, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock saved data - in real app this would come from API
  const savedUniversities = [
    {
      id: '1',
      name: 'University of Ghana',
      location: 'Legon, Accra',
      logo: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      savedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'KNUST',
      location: 'Kumasi',
      logo: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      savedAt: '2024-01-12'
    }
  ];

  const savedCourses = [
    { id: '1', name: 'Computer Science', category: 'STEM', savedAt: '2024-01-14' },
    { id: '2', name: 'Medicine', category: 'Health Sciences', savedAt: '2024-01-10' }
  ];

  const applicationProgress = [
    { task: 'Research Universities', completed: true },
    { task: 'Prepare Documents', completed: true },
    { task: 'Write Personal Statement', completed: false },
    { task: 'Submit Applications', completed: false },
    { task: 'Prepare for Interviews', completed: false }
  ];

  const recentMessages = [
    {
      id: '1',
      ambassador: 'Kwame Asante',
      university: 'University of Ghana',
      lastMessage: 'Thanks for your question about the CS program...',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      ambassador: 'Ama Osei',
      university: 'KNUST',
      lastMessage: 'I hope this helps with your medical school...',
      timestamp: '1 day ago',
      unread: false
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'saved', label: 'Saved Items', icon: Heart },
    { id: 'applications', label: 'Applications', icon: Target },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
              <p className="text-blue-100">
                Continue your journey to finding the perfect university. You have {savedUniversities.length} saved universities and {savedCourses.length} courses to explore.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{savedUniversities.length}</div>
                    <div className="text-gray-600">Saved Universities</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{savedCourses.length}</div>
                    <div className="text-gray-600">Courses of Interest</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{recentMessages.filter(m => m.unread).length}</div>
                    <div className="text-gray-600">Unread Messages</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Application Progress */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Progress</h3>
                <div className="space-y-3">
                  {applicationProgress.map((task, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-3 ${
                        task.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className={`${task.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {task.task}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Progress: {applicationProgress.filter(t => t.completed).length}/{applicationProgress.length} completed
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(applicationProgress.filter(t => t.completed).length / applicationProgress.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Recent Messages */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
                  <Link to="/messages" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{message.ambassador}</p>
                          {message.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{message.university}</p>
                        <p className="text-sm text-gray-500 truncate">{message.lastMessage}</p>
                        <p className="text-xs text-gray-400">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'saved':
        return (
          <div className="space-y-6">
            {/* Saved Universities */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Saved Universities</h3>
                <Link to="/universities" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Browse more
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {savedUniversities.map((university) => (
                  <div key={university.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <img
                      src={university.logo}
                      alt={university.name}
                      className="w-12 h-12 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{university.name}</h4>
                      <p className="text-sm text-gray-600">{university.location}</p>
                      <p className="text-xs text-gray-500">Saved {new Date(university.savedAt).toLocaleDateString()}</p>
                    </div>
                    <Link
                      to={`/universities/${university.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Courses */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Courses of Interest</h3>
                <Link to="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Explore more
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {savedCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{course.name}</h4>
                      <p className="text-sm text-gray-600">{course.category}</p>
                      <p className="text-xs text-gray-500">Saved {new Date(course.savedAt).toLocaleDateString()}</p>
                    </div>
                    <Link
                      to="/courses"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Explore
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'applications':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Tracker</h3>
            <div className="space-y-4">
              {applicationProgress.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-3 ${
                      task.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <span className={`${task.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {task.task}
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    {task.completed ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Messages</h3>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{message.ambassador}</h4>
                      {message.unread && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">New</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{message.university}</p>
                    <p className="text-sm text-gray-700 mb-2">{message.lastMessage}</p>
                    <p className="text-xs text-gray-500">{message.timestamp}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{user?.name}</h4>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-sm text-gray-500 capitalize">{user?.type} Account</p>
                </div>
                <button className="ml-auto text-blue-600 hover:text-blue-700 font-medium">
                  Edit Profile
                </button>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-900 mb-4">Account Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email Notifications</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">SMS Notifications</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Monthly Newsletter</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your university journey and track your progress</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-3" />
                    {tab.label}
                    {tab.id === 'messages' && recentMessages.filter(m => m.unread).length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {recentMessages.filter(m => m.unread).length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;