import React, { useState } from 'react';
import { Search, BookOpen, Video, Headphones, FileText, Heart, Brain, Zap, Moon, Users, AlertTriangle } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'article' | 'video' | 'audio' | 'pdf' | 'interactive';
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  featured: boolean;
}

export const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen, color: 'from-gray-500 to-gray-600' },
    { id: 'anxiety', name: 'Anxiety & Stress', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'depression', name: 'Depression', icon: Heart, color: 'from-blue-500 to-indigo-500' },
    { id: 'sleep', name: 'Sleep & Rest', icon: Moon, color: 'from-purple-500 to-violet-500' },
    { id: 'relationships', name: 'Relationships', icon: Users, color: 'from-pink-500 to-rose-500' },
    { id: 'academic', name: 'Academic Pressure', icon: Brain, color: 'from-green-500 to-emerald-500' },
    { id: 'crisis', name: 'Crisis Support', icon: AlertTriangle, color: 'from-red-500 to-red-600' }
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Anxiety in College Students',
      description: 'Learn about common anxiety triggers in academic environments and practical coping strategies.',
      category: 'anxiety',
      type: 'article',
      duration: '8 min read',
      difficulty: 'beginner',
      tags: ['anxiety', 'college', 'coping strategies'],
      featured: true
    },
    {
      id: '2',
      title: 'Guided Meditation for Stress Relief',
      description: 'A 15-minute guided meditation session designed specifically for busy students.',
      category: 'anxiety',
      type: 'audio',
      duration: '15 min',
      difficulty: 'beginner',
      tags: ['meditation', 'stress relief', 'mindfulness'],
      featured: true
    },
    {
      id: '3',
      title: 'Sleep Hygiene for Better Mental Health',
      description: 'Evidence-based tips for improving sleep quality and its impact on mental well-being.',
      category: 'sleep',
      type: 'video',
      duration: '12 min',
      difficulty: 'beginner',
      tags: ['sleep', 'mental health', 'wellness'],
      featured: false
    },
    {
      id: '4',
      title: 'Recognizing Depression Warning Signs',
      description: 'Comprehensive guide to identifying depression symptoms and when to seek professional help.',
      category: 'depression',
      type: 'article',
      duration: '10 min read',
      difficulty: 'intermediate',
      tags: ['depression', 'warning signs', 'mental health'],
      featured: true
    },
    {
      id: '5',
      title: 'Building Healthy Relationships in College',
      description: 'Navigate friendships, romantic relationships, and social pressures in a healthy way.',
      category: 'relationships',
      type: 'interactive',
      duration: '20 min',
      difficulty: 'intermediate',
      tags: ['relationships', 'social skills', 'communication'],
      featured: false
    },
    {
      id: '6',
      title: 'Managing Academic Pressure and Perfectionism',
      description: 'Strategies for dealing with academic stress and overcoming perfectionist tendencies.',
      category: 'academic',
      type: 'pdf',
      duration: '15 min read',
      difficulty: 'intermediate',
      tags: ['academic stress', 'perfectionism', 'study strategies'],
      featured: false
    },
    {
      id: '7',
      title: 'Crisis Intervention Techniques',
      description: 'Important information about recognizing mental health crises and getting immediate help.',
      category: 'crisis',
      type: 'article',
      duration: '5 min read',
      difficulty: 'advanced',
      tags: ['crisis', 'emergency', 'intervention'],
      featured: true
    },
    {
      id: '8',
      title: 'Breathing Exercises for Panic Attacks',
      description: 'Quick and effective breathing techniques to manage panic attacks and acute anxiety.',
      category: 'anxiety',
      type: 'video',
      duration: '8 min',
      difficulty: 'beginner',
      tags: ['panic attacks', 'breathing', 'emergency techniques'],
      featured: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'pdf': return FileText;
      case 'interactive': return Brain;
      default: return BookOpen;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="pt-16 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Wellness Resource Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Curated mental health resources, guides, and tools designed specifically for Indian college students.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, topics, or techniques..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="pdf">PDFs</option>
              <option value="interactive">Interactive</option>
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-[#696cff] text-white shadow-lg scale-105'
                      : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-white/30'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Resources */}
        {selectedCategory === 'all' && !searchTerm && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.slice(0, 3).map((resource) => {
                const TypeIcon = getTypeIcon(resource.type);
                const categoryData = categories.find(cat => cat.id === resource.category);
                
                return (
                  <div
                    key={resource.id}
                    className="group backdrop-blur-lg bg-white/70 hover:bg-white/90 rounded-2xl border border-white/30 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categoryData?.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <TypeIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-[#FFFC69] text-gray-800 px-2 py-1 rounded-full font-medium">
                          Featured
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          resource.difficulty === 'beginner' 
                            ? 'bg-green-100 text-green-800'
                            : resource.difficulty === 'intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {resource.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#696cff] transition-colors duration-300">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{resource.duration}</span>
                      <span className="capitalize">{resource.type}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Resources' : categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-600">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type);
                const categoryData = categories.find(cat => cat.id === resource.category);
                
                return (
                  <div
                    key={resource.id}
                    className="group backdrop-blur-lg bg-white/60 hover:bg-white/80 rounded-2xl border border-white/30 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${categoryData?.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <TypeIcon className="h-5 w-5 text-white" />
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        resource.difficulty === 'beginner' 
                          ? 'bg-green-100 text-green-800'
                          : resource.difficulty === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {resource.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#696cff] transition-colors duration-300">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{resource.duration}</span>
                      <span className="capitalize">{resource.type}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No resources found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
                className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-6 py-2 rounded-xl transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12 backdrop-blur-lg bg-gradient-to-r from-[#696cff]/10 to-purple-500/10 rounded-2xl border border-white/30 p-8 text-center">
          <Heart className="h-12 w-12 text-[#696cff] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Need Personal Guidance?</h3>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            While these resources are helpful, sometimes you need personalized support. Our counselors are here to help you navigate your unique situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-6 py-3 rounded-xl transition-colors duration-200">
              Book a Session
            </button>
            <button className="bg-white/60 hover:bg-white/80 text-gray-700 px-6 py-3 rounded-xl transition-colors duration-200 border border-white/30">
              Chat with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};