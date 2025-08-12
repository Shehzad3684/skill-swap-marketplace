import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="font-sans bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Exchange Skills & Knowledge
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Connect with your community to share what you know and learn what you don't.
            </p>
            <div className="mt-10">
              <Link
                to="/skills"
                className="pulse-animation inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Available Skills
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How SkillSwap Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              A simple three-step process to start exchanging skills today
            </p>
          </div>
          {/* Steps */}
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  <i className="fas fa-search"></i>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">1. Browse Skills</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Explore what skills your community members are offering.
                  </p>
                </div>
              </div>
              {/* Additional steps... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;