import React from 'react';
import './App.css';

import TreeVisualization from './TreeVisualization';
import CustomNavbar from './AppNavbar';

function App() {
  
  return (
    <div className="App">
  
      <CustomNavbar/>
      <TreeVisualization />
    </div>
  );
}

export default App;
