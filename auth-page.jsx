import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/use-auth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
  });
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      loginMutation.mutate({
        username: formData.username,
        password: formData.password,
      });
    } else {
      registerMutation.mutate({
        username: formData.username,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        role: 'donor', // Default role
      });
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Form column */}
      <div className="flex flex-col justify-center px-4 py-12 w-full md:w-1/2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 bg-white/5 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 bg-white/5 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 bg-white/5 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 bg-white/5 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                disabled={loginMutation.isPending || registerMutation.isPending}
              >
                {loginMutation.isPending || registerMutation.isPending ? (
                  <span>Loading...</span>
                ) : isLogin ? (
                  'Sign in'
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleAuthMode}
              className="font-semibold leading-6 text-primary hover:text-primary/90"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* Info/Hero column */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-green-500 to-emerald-600 flex-col justify-center p-12 text-white">
        <div>
          <h1 className="text-4xl font-bold mb-6">Food Waste Management</h1>
          <p className="text-xl mb-8">
            Join our community to reduce food waste and make a positive impact on the environment.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-lg">Track your food inventory and expiry dates</p>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-lg">Donate surplus food to local organizations</p>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-lg">Get recipe suggestions based on your inventory</p>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-lg">Track your impact on reducing food waste</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}