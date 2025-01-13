import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DocsLayout from './components/DocsLayout';

function App() {
  return (
    <Router>
      <DocsLayout />
    </Router>
  );
}

export default App;