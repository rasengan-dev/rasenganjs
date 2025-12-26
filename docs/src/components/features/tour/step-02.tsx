import React from 'react';

interface Step02Props {
  next: () => void;
  prev: () => void;
  end: () => void;
}

export default function Step02({ prev, end }: Step02Props) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          You're All Set! 🎉
        </h2>
        <p className="text-gray-600">
          That's the end of our quick tour. You're ready to dive in!
        </p>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          Now you know the basics. Feel free to explore on your own, and
          remember you can always come back to this tour anytime.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Pro tip:</strong> Check out our documentation for more
            advanced features and customization options.
          </p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
        <span className="text-sm text-gray-500 ml-2">Step 2 of 2</span>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={prev}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          ← Previous
        </button>
        <button
          onClick={end}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Finish Tour
        </button>
      </div>
    </div>
  );
}
