import React from 'react';
import './App.css';

import TreeVisualization from './TreeVisualization';
import CustomNavbar from './AppNavbar';
import TreeVisualizationCollapse from './TreeVisualizationCollapse';

function App() {
  
  return (
    <div className="App">
  
      <CustomNavbar/>
      {/* <TreeVisualization /> */}
      <TreeVisualizationCollapse/>
    </div>
  );
}

export default App;
// import React from 'react';
// import BasicCollapse from './BasicCollapse';
// import ZoomableTree from './ZoomableTree';

// const App = () => {
//   const treeData = {
//     name: 'Root',
//     children: [
//       {
//         name: 'Node 1',
//         children: [{ name: 'Leaf 1' }, { name: 'Leaf 2' }],
//       },
//       {
//         name: 'Node 2',
//         children: [{ name: 'Leaf 3' }, { name: 'Leaf 4' }],
//       },
//     ],
//   };

//   return (
//     <div>
//       <h1>Zoomable D3.js Tree Visualization</h1>
//       <ZoomableTree data={treeData} />
//       {/* <ZoomableTree/> 
//       <BasicCollapse/> */}
      
//     </div>
//   );
// };

// export default App;
