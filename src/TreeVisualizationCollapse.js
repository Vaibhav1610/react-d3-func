import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const TreeVisualizationCollapse = () => {
  const svgRef = useRef();
  const [data, setData] = useState({
    name: "Root",
    children: [
      {
        name: "Node 1",
        children: [
          { name: "Leaf 1" },
          { name: "Leaf 2" }
        ]
      },
      {
        name: "Node 2",
        children: [
          { name: "Leaf 3" },
          { name: "Leaf 4" }
        ]
      }
    ]
  });

  useEffect(() => {
    const width = 1000;
    const height = 900;

  // Check if the SVG already exists
  const svgContainer = d3.select(svgRef.current);
  let svg = svgContainer.select("svg");

  if (svg.empty()) {
    // If SVG doesn't exist, create it
    const newSvg = svgContainer
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(50,0)");

    // Store the SVG in a variable
    svg = newSvg;
  }

    const treeLayout = d3.tree().size([width-160,height-200]);

    let root = d3.hierarchy(data);
    root.x0 = height / 2; // Set initial position for the root node
    root.y0 = 0;

    
     // collapse(root)
     root.children.forEach(c=>{
       toggleNode(c)
     })
    
    updateTree(root);

    function toggleNode(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      updateTree(d);
    }

    function updateTree(source) {

     
      const treeDataUpdated = treeLayout(root);

      const nodes = treeDataUpdated.descendants();
      const links = treeDataUpdated.links();
      nodes.forEach(function(d){ d.y = d.depth * 180});

      // Remove existing elements before updating
      svg.selectAll(".node").remove();
      svg.selectAll(".link").remove();
   
      const link = svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
          .x(d => source.y0) // Use source's previous position for links
          .y(d => source.x0));

      const node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y+50},${d.x})`)
        .on("click", (event, d) => {
          toggleNode(d);
        });

      node.append("circle")
        .attr("r", 10);  

      node.append("text")
        .attr("dy", "0.35em")
        .attr("x", d => d.children ? -13 : 13)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name)

      // Add transitions for nodes and links
      link.transition()
        .duration(2000) // Transition duration in milliseconds
        .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));

    //   node.transition()
    //     .duration(2000) // Transition duration in milliseconds
    //     .attr("transform", d => `translate(${d.y+50},${d.x})`);
     }

  }, [data]);

  return <div className="tree-container" ref={svgRef}></div>;
};

export default TreeVisualizationCollapse;
