import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ZoomableTree = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const treeLayout = d3.tree()
      .size([height, width - 160]);

    const root = d3.hierarchy(data);
    // root.x = height / 2; // Set initial position for root node
    // root.y = width/2;

    updateTree(root.splice(1));

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

      const links = treeDataUpdated.links();
      const nodes = treeDataUpdated.descendants();

      const linkGroup = svg.selectAll('.link')
        .data(links, d => d.target.id);

      linkGroup.exit().remove();

      linkGroup.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
          .x(d => source.y)
          .y(d => source.x))
        .merge(linkGroup)
        .transition().duration(1000)
        .attr('fill','none')
        .attr('stroke','silver')
        .attr('stroke-width','2px')
        .attr('d', d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));

      const nodeGroup = svg.selectAll('.node')
        .data(nodes, d => d.id);

      nodeGroup.exit().remove();

      const nodeEnter = nodeGroup.enter().append('g')
        .attr('class', 'node')
        .attr('transform', `translate(${source.y},${source.x})`)
        .on('click', toggleNode);

      nodeEnter.append('circle')
        .attr('r', 10);

      nodeEnter.append('text')
        .attr('dy', '0.31em')
        .attr('x', d => (d.children ? -13 : 13))
        .attr('text-anchor', d => (d.children ? 'end' : 'start'))
        .text(d => d.data.name);

      const nodeUpdate = nodeEnter.merge(nodeGroup)
        .transition().duration(1000)
        .attr('transform', d => `translate(${d.y},${d.x})`);

      nodeUpdate.select('circle')
        .attr('r', 10);

      nodeUpdate.select('text')
        .attr('dy', '0.31em')
        .transition().duration(1000)
        .attr('x', d => (d.children ? -13 : 13))
        .attr('text-anchor', d => (d.children ? 'end' : 'start'))
        .text(d => d.data.name);

      // nodes.forEach(d => {
      //   d.x0 = d.x;
      //   d.y0 = d.y;
      // });
    }

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ZoomableTree;
