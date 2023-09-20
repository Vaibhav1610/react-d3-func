import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function BasicCollapse() {

  const svgRef = useRef();

  useEffect(() => {
    drawTree();
  }, []);

  const drawTree = () => {
    const data = {
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
    };

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40,0)");

    const treeLayout = d3.tree().size([height, width - 160]);

    const root = d3.hierarchy(data);
    root.x0 = height / 2; // Set initial position for the root node
    root.y0 = 0;

    updateTree(root);

    function toggleNode(event, d) {
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

      const link = svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));

      const node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .on("click", toggleNode);

      node.append("circle")
        .attr("r", 10);

      node.append("text")
        .attr("dy", "0.35em")
        .attr("x", d => d.children ? -13 : 13)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name);
    }
  };

  return <div className="tree-container" ref={svgRef}></div>;
};

