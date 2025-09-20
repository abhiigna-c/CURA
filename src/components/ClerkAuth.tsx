import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';

interface ClerkAuthProps {
  mode: 'sign-in' | 'sign-up';
}

export const ClerkAuth: React.FC<ClerkAuthProps> = ({ mode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF0] via-[#F8F9FF] to-[#FFF8E1] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-[#696cff] mr-3" />
            <span className="text-3xl font-bold text-gray-900">CURA</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'sign-in' ? 'Welcome Back' : 'Join CURA'}
          </h1>
          <p className="text-gray-600">
            {mode === 'sign-in' 
              ? 'Sign in to access your mental health resources' 
              : 'Create your account to start your wellness journey'
            }
          </p>
        </div>

        {/* Clerk Components */}
        <div className="backdrop-blur-lg bg-white/80 rounded-2xl border border-white/30 p-6 shadow-xl">
          {mode === 'sign-in' ? (
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none bg-transparent",
                  headerTitle: "text-gray-900 font-bold text-xl",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton: "border border-white/40 hover:bg-white/60 transition-all duration-200",
                  formButtonPrimary: "bg-[#696cff] hover:bg-[#5a5df5] transition-all duration-200",
                  footerActionLink: "text-[#696cff] hover:text-[#5a5df5]",
                  identityPreviewText: "text-gray-700",
                  formFieldInput: "border border-white/40 focus:border-[#696cff] focus:ring-[#696cff]/20",
                  formFieldLabel: "text-gray-700 font-medium"
                }
              }}
              redirectUrl="/"
            />
          ) : (
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none bg-transparent",
                  headerTitle: "text-gray-900 font-bold text-xl",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton: "border border-white/40 hover:bg-white/60 transition-all duration-200",
                  formButtonPrimary: "bg-[#696cff] hover:bg-[#5a5df5] transition-all duration-200",
                  footerActionLink: "text-[#696cff] hover:text-[#5a5df5]",
                  identityPreviewText: "text-gray-700",
                  formFieldInput: "border border-white/40 focus:border-[#696cff] focus:ring-[#696cff]/20",
                  formFieldLabel: "text-gray-700 font-medium"
                }
              }}
              redirectUrl="/"
            />
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            By {mode === 'sign-in' ? 'signing in' : 'creating an account'}, you agree to our{' '}
            <a href="#" className="text-[#696cff] hover:text-[#5a5df5] font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#696cff] hover:text-[#5a5df5] font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
