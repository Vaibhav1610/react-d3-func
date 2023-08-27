import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./Style.css"; // Add your CSS styles here

const TreeVisualization = () => {
  const svgRef = useRef();

  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  
  useEffect(() => {
    drawTree();
  });

  const handleNodeClick = (event, node) => {
    setTooltipContent({
      name: node.data.name,
      info1: node.data.info1,
      info2: node.data.info2,
      info3: node.data.info3,
      info4: node.data.info4,
    });
    setTooltipPosition({ left: node.y + 200, top: node.x });
  };

  const hideTooltip = () => {
    setTooltipContent("");
  };

  const drawTree = () => {
    const data = {
      name: "Root",
      info1: "someinfo",
      info2: "someinfo2",
      info3: "someinfo",
      info4: "someinfo2",
      children: [
        {
          name: "Node 1",
          info1: "someinfo",
          info2: "someinfo2",
          info3: "someinfo",
          info4: "someinfo2",
          children: [
            { name: "Leaf 1", info1: "someinfo", info2: "someinfo2",info3: "someinfo",
            info4: "someinfo2" },
            { name: "Leaf 2", info1: "someinfo", info2: "someinfo2" ,
            info3: "someinfo",
            info4: "someinfo2"},
          ],
        },
        {
          name: "l1domainame-l2domainname-l3domainname-api",
          info1: "someinfo",
          info2: "someinfo2",
          info3: "someinfo",
          info4: "someinfo2",
          children: [
            {
              name: "Leaf 3",
              info1: "someinfo2",
              info3: "someinfo",
              info4: "someinfo2",
              info2:
                "someinfo2qwqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
            },
            { name: "Leaf 4", info1: "someinfo2", info2: "someinfo2",info3: "someinfo",
            info4: "someinfo2" },
          ],
        },
      ],
    };

    const width = 800;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40,0)");

    const treeLayout = d3.tree().size([height, width - 160]);

    const root = d3.hierarchy(data);
    const treeData = treeLayout(root);

    const nodes = treeData.descendants();
    const links = treeData.links();

    svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      )
      .attr("fill", "none")
      .attr("stroke", "darkblue")
      .attr("stroke-width", "1px");

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("r", 10)
      .on("click", (event, d) => handleNodeClick(event, d));

    node
      .append("text")
      .attr("dy", "0.35em")
      .attr("x", (d) => (d.children ? -13 : 13))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name)
      .call(wrap, 100);
  };

  return (
    <div>
      <svg className="tree-container" ref={svgRef}></svg>
      {tooltipContent && (
        <div
          className={`tooltip dynamic-div ${tooltipContent ? "" : "tooltip-hidden"}`}
          style={{
            left: tooltipPosition.left + "px",
            top: tooltipPosition.top + "px"
          }}
        >
          <div>
            <p>name:{tooltipContent.name}</p>
            <hr />
            <p>info1:{tooltipContent.info1}</p>
            <hr />
            <p>
              info2:{tooltipContent.info2}
            </p>
            <hr />
            <p>
              info3:{tooltipContent.info3}
            </p>
            <hr />
            <p>
              info4:{tooltipContent.info4}
            </p>
            <hr />
          </div>
          <div >
            <button className="button" onClick={hideTooltip}>
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/-+/).reverse(),
      word,
      line = [],
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");

    let isWord = true;
    while (isWord) {
      word = words.pop();
      if (words.length !== 0) {
        word = word + "-";
        line.push(word);
      } else {
        line.push(word);
      }
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", 0.7 + dy + "em")
          .text(word);
      }
      if (words.length === 0) isWord = false;
    }
  });
}

export default TreeVisualization;
