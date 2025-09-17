import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, MessageCircle, Calendar, BookOpen, TrendingUp, AlertTriangle, Shield, Activity } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 250 },
    { month: 'Mar', users: 400 },
    { month: 'Apr', users: 580 },
    { month: 'May', users: 720 },
    { month: 'Jun', users: 950 }
  ];

  const appointmentData = [
    { day: 'Mon', appointments: 45 },
    { day: 'Tue', appointments: 38 },
    { day: 'Wed', appointments: 52 },
    { day: 'Thu', appointments: 41 },
    { day: 'Fri', appointments: 49 },
    { day: 'Sat', appointments: 35 },
    { day: 'Sun', appointments: 28 }
  ];

  const categoryData = [
    { name: 'Anxiety & Stress', value: 35, color: '#696cff' },
    { name: 'Depression', value: 25, color: '#ff6b6b' },
    { name: 'Academic Pressure', value: 20, color: '#4ecdc4' },
    { name: 'Relationships', value: 15, color: '#45b7d1' },
    { name: 'Others', value: 5, color: '#96ceb4' }
  ];

  const recentUsers = [
    { id: 1, name: 'Anonymous Student', college: 'IIT Delhi', joinDate: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Priya K.', college: 'BITS Pilani', joinDate: '2024-01-14', status: 'Active' },
    { id: 3, name: 'Anonymous Student', college: 'NIT Surathkal', joinDate: '2024-01-13', status: 'Active' },
    { id: 4, name: 'Arjun M.', college: 'IIT Bombay', joinDate: '2024-01-12', status: 'Active' }
  ];

  const recentAppointments = [
    { id: 1, student: 'Anonymous', type: 'Individual', date: '2024-01-20', status: 'Scheduled' },
    { id: 2, student: 'Student #1205', type: 'Group', date: '2024-01-19', status: 'Completed' },
    { id: 3, student: 'Anonymous', type: 'Crisis', date: '2024-01-18', status: 'Completed' },
    { id: 4, student: 'Student #1207', type: 'Individual', date: '2024-01-17', status: 'Cancelled' }
  ];

  const stats = [
    {
      title: 'Total Users',
      value: '2,450',
      change: '+12.5%',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Sessions',
      value: '156',
      change: '+8.2%',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Appointments',
      value: '89',
      change: '+15.3%',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Resources Used',
      value: '1,234',
      change: '+23.1%',
      icon: BookOpen,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'content', name: 'Content', icon: BookOpen },
    { id: 'moderation', name: 'Moderation', icon: Shield }
  ];

  return (
    <div className="pt-16 min-h-screen px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage CURA's mental health platform</p>
        </div>

        {/* Navigation Tabs */}
        <div className="backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#696cff] text-white rounded-xl m-2'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="backdrop-blur-lg bg-white/70 rounded-2xl border border-white/30 p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-green-600 text-sm font-medium mt-1">{stat.change}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Growth Chart */}
              <div className="backdrop-blur-lg bg-white/70 rounded-2xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#696cff" 
                      strokeWidth={3}
                      dot={{ fill: '#696cff', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Appointments Chart */}
              <div className="backdrop-blur-lg bg-white/70 rounded-2xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Appointments</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={appointmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="appointments" 
                      fill="#696cff"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="backdrop-blur-lg bg-white/70 rounded-2xl border border-white/30 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Categories</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="flex flex-col justify-center">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm text-gray-700">{category.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="backdrop-blur-lg bg-white/70 rounded-2xl border border-white/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Recent Users</h3>
              <button className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200">
                Export Data
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">College</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600">{user.college}</td>
                      <td className="py-3 px-4 text-gray-600">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="backdrop-blur-lg bg-white/70 rounded-2xl border border-white/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Recent Appointments</h3>
              <button className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200">
                Schedule New
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{appointment.student}</td>
                      <td className="py-3 px-4 text-gray-600">{appointment.type}</td>
                      <td className="py-3 px-4 text-gray-600">{appointment.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'Scheduled' 
                            ? 'bg-blue-100 text-blue-800'
                            : appointment.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};