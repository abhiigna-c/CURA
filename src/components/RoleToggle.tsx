import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Crown, User, RefreshCw } from 'lucide-react';

export const RoleToggle: React.FC = () => {
  const { user } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleRole = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      const currentRole = user.publicMetadata?.role as string || 'student';
      const newRole = currentRole === 'admin' ? 'student' : 'admin';
      
      await user.update({
        publicMetadata: {
          ...user.publicMetadata,
          role: newRole,
          college: user.publicMetadata?.college || 'Demo College'
        }
      });
      
      // Force a page refresh to update the role
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) return null;

  const currentRole = user.publicMetadata?.role as string || 'student';
  const isAdmin = currentRole === 'admin';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="backdrop-blur-lg bg-white/90 rounded-2xl border border-white/30 p-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isAdmin ? 'bg-purple-100' : 'bg-blue-100'}`}>
            {isAdmin ? (
              <Crown className="h-5 w-5 text-purple-600" />
            ) : (
              <User className="h-5 w-5 text-blue-600" />
            )}
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-900">
              Current Role: <span className={`font-bold ${isAdmin ? 'text-purple-600' : 'text-blue-600'}`}>
                {isAdmin ? 'Admin' : 'Student'}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {isAdmin ? 'Access to admin dashboard' : 'Standard user access'}
            </p>
          </div>
          
          <button
            onClick={toggleRole}
            disabled={isUpdating}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isAdmin 
                ? 'bg-blue-100 hover:bg-blue-200 text-blue-700' 
                : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isUpdating ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              `Switch to ${isAdmin ? 'Student' : 'Admin'}`
            )}
          </button>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            💡 <strong>Demo Feature:</strong> Toggle between roles to see different access levels
          </p>
        </div>
      </div>
    </div>
  );
};
