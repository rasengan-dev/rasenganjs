import '@rasenganjs/image/css';
import '@/styles/index.css';
import React from 'react';

export default function App({ Component, children }) {
  return <Component>{children}</Component>;
}
