import React from 'react';

interface Props {
  next: () => void;
  prev: () => void;
  end: () => void;
}

export default function Step02({ next, prev }: Props) {
  return (
    <div className="bg-background border border-border rounded-lg shadow-xl p-6 max-w-md">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome to Rasengan.js
        </h2>
        <p className="text-foreground/70">
          Let's take a quick tour to help you get started with the key features.
        </p>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-gray-700">
          This is the Navigation section of the documentation
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={prev}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          Prev
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
