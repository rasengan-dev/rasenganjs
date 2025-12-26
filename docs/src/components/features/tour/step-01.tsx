import React from 'react';

interface Step01Props {
  next: () => void;
  prev: () => void;
  end: () => void;
}

export default function Step01({ next, end }: Step01Props) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to Our App! 👋
        </h2>
        <p className="text-gray-600">
          Let's take a quick tour to help you get started with the key features.
        </p>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-gray-700">
          This is your starting point. Click the "Get Started" button below to
          begin exploring the amazing features we've built for you.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
        <div className="h-2 w-2 rounded-full bg-gray-300"></div>
        <span className="text-sm text-gray-500 ml-2">Step 1 of 2</span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={end}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          Skip tour
        </button>
        <button
          onClick={next}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
