import React, { useState } from 'react';
import { Plus, MessageCircle, ThumbsUp, Users, Clock, Search, Filter, Heart, Shield, Star } from 'lucide-react';
import { User } from '../App';

interface CommunityProps {
  user: User | null;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    college: string;
    anonymous: boolean;
  };
  category: string;
  timestamp: Date;
  likes: number;
  comments: number;
  userLiked: boolean;
  tags: string[];
}

interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    name: string;
    anonymous: boolean;
  };
  timestamp: Date;
  likes: number;
}

export const Community: React.FC<CommunityProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Dealing with exam anxiety - tips that actually worked for me',
      content: 'Hey everyone! I used to get really anxious before exams, but I found some techniques that genuinely helped. Sharing in case anyone else is struggling with the same thing...',
      author: {
        name: 'Anonymous Student',
        college: 'IIT Delhi',
        anonymous: true
      },
      category: 'Academic Stress',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 23,
      comments: 8,
      userLiked: false,
      tags: ['anxiety', 'exams', 'tips']
    },
    {
      id: '2',
      title: 'Feeling homesick in my second year',
      content: 'Is it normal to still feel homesick even in second year? I thought I would have gotten used to hostel life by now, but some days are really hard...',
      author: {
        name: 'Priya K.',
        college: 'BITS Pilani',
        anonymous: false
      },
      category: 'Emotional Support',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      likes: 15,
      comments: 12,
      userLiked: true,
      tags: ['homesickness', 'hostel life', 'adjustment']
    },
    {
      id: '3',
      title: 'Started therapy and it\'s been life-changing',
      content: 'I was hesitant about seeking professional help, but I\'m so glad I did. If anyone is on the fence about it, this is your sign to take that step. You deserve support!',
      author: {
        name: 'Anonymous Student',
        college: 'NIT Surathkal',
        anonymous: true
      },
      category: 'Success Stories',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      likes: 41,
      comments: 18,
      userLiked: false,
      tags: ['therapy', 'success', 'encouragement']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    anonymous: true,
    tags: ''
  });

  const categories = [
    { id: 'all', name: 'All Posts', count: posts.length },
    { id: 'Academic Stress', name: 'Academic Stress', count: 1 },
    { id: 'Emotional Support', name: 'Emotional Support', count: 1 },
    { id: 'Success Stories', name: 'Success Stories', count: 1 },
    { id: 'Relationships', name: 'Relationships', count: 0 },
    { id: 'Mental Health Tips', name: 'Mental Health Tips', count: 0 }
  ];

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.userLiked ? post.likes - 1 : post.likes + 1,
            userLiked: !post.userLiked 
          }
        : post
    ));
  };

  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content || !newPost.category) return;

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        name: newPost.anonymous ? 'Anonymous Student' : (user?.name || 'Student'),
        college: user?.college || 'College',
        anonymous: newPost.anonymous
      },
      category: newPost.category,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      userLiked: false,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: '', anonymous: true, tags: '' });
    setShowNewPost(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  if (!user) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="backdrop-blur-lg bg-white/80 rounded-3xl p-8 border border-white/30 shadow-2xl">
            <Users className="h-16 w-16 text-[#696cff] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-gray-600 mb-6">
              Connect with fellow students, share experiences, and support each other in a safe, anonymous environment.
            </p>
            <div className="flex flex-col space-y-3">
              <button className="w-full bg-[#696cff] hover:bg-[#5a5df5] text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                Sign Up to Join
              </button>
              <button className="w-full bg-white/60 hover:bg-white/80 text-gray-700 py-3 rounded-xl font-semibold transition-colors duration-200 border border-white/30">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Peer Support Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A safe space for students to share experiences, seek advice, and support each other.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Create Post Button */}
            <button
              onClick={() => setShowNewPost(true)}
              className="w-full flex items-center justify-center space-x-2 bg-[#696cff] hover:bg-[#5a5df5] text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg mb-6"
            >
              <Plus className="h-5 w-5" />
              <span>New Post</span>
            </button>

            {/* Community Guidelines */}
            <div className="backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 p-4 mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="h-5 w-5 text-[#696cff]" />
                <h3 className="font-semibold text-gray-900">Community Guidelines</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Be respectful and supportive</li>
                <li>• Maintain anonymity when needed</li>
                <li>• No medical advice or diagnosis</li>
                <li>• Report harmful content</li>
                <li>• Seek professional help for crises</li>
              </ul>
            </div>

            {/* Categories */}
            <div className="backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-[#696cff] text-white'
                        : 'text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{category.name}</span>
                      <span className="text-xs">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                />
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="backdrop-blur-lg bg-white/70 hover:bg-white/80 rounded-2xl border border-white/30 p-6 transition-all duration-300 hover:shadow-xl cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#696cff] to-purple-600 flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {post.author.anonymous ? 'Anonymous Student' : post.author.name}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{post.author.college}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(post.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs bg-[#696cff]/10 text-[#696cff] px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#696cff] transition-colors duration-200">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post.id);
                        }}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors duration-200 ${
                          post.userLiked 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${post.userLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments} replies</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No posts found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-6 py-2 rounded-xl transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="max-w-2xl w-full backdrop-blur-lg bg-white/90 rounded-2xl border border-white/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Create New Post</h3>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleNewPost} className="space-y-4">
                <input
                  type="text"
                  placeholder="Post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                  required
                />

                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.slice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder="Share your thoughts, experiences, or questions..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200 resize-none"
                  required
                />

                <input
                  type="text"
                  placeholder="Tags (comma-separated, e.g., anxiety, tips, support)"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={newPost.anonymous}
                    onChange={(e) => setNewPost({ ...newPost, anonymous: e.target.checked })}
                    className="rounded border-gray-300 text-[#696cff] focus:ring-[#696cff]"
                  />
                  <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                    Post anonymously (recommended)
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewPost(false)}
                    className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#696cff] hover:bg-[#5a5df5] text-white rounded-xl transition-colors duration-200"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};