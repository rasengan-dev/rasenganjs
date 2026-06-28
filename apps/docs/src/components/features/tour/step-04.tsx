import React from 'react';

interface Props {
  next: () => void;
  prev: () => void;
  end: () => void;
}

export default function Step04({ prev, end }: Props) {
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
        <p className="text-gray-700 mb-4">Star us on GITHUB here</p>
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
