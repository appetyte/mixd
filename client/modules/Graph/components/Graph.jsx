import React from "react";
import Modal from "react-responsive-modal";
import * as d3 from "d3";
import "./graph.scss";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.updateGraph.bind(this);
  }
  componentDidMount() {
    this.props.fetchMixables(["Vodka","Rum","Orange juice"]);
    if(this.props.nodes.length > 0) this.updateGraph(this);
  }

  componentDidUpdate() {
    if(this.props.nodes.length > 0) this.updateGraph(this);
  }

  getRadialForceStrength(d) {
    if (d.type === 'I') {
      if (d.inShelf) {
        return 0.1;
      } else {
        return 0.1;
      }
    } else {
      return 0.1;
    }
  }

  getRadialForce(d) {
    if (d.type === 'I') {
      if (d.inShelf) {
        return 0;
      } else {
        return 300;
      }
    }
    else {
      return 200;
    }
  }

  getNodeRadius(d) {
    return 10 + d.recipesCount * 0.75;
  }

  getNodeColor(d) {
    if (d.type === 'I') {
      if (d.inShelf) {
        return '#4389f9';
      } else {
        return '#94bcfc';
      }
    }
    else {
      switch (d.category) {
        case "Ordinary Drink":
          return "#ff7200";
        case "Cocktail":
          return "#ff1900";
        case "Other/Unknown":
          return "#d0ff00";
        default:
          return "#ff7200";
      }
    }
  }

  simTick(){
    node.attr('cx', d => d.x).attr('cy', d => d.y);
    link
      .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
  }

  handleZoom() {
    graph.attr("transform", d3.event.transform);
  }

  nodeMouseOver(d) {
    tooltip.transition()
      .duration(200)
      .style("opacity", .9);
    tooltip.html(d.name)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
  }

  nodeClick(d) {
    d3.selectAll('.links line')
      .attr('class', link => {
        if (link.source === d || link.target === d) {
          return "highlight";
        } else {
          return "";
        }
      });
    if (d.type === "R" || d.type === "RI") {
      component.props.openModal();
      component.props.showMixable(d.name);
    }
  }

  removeHighlights() {
    d3.selectAll('.nodes circle').attr('class', '');
    d3.selectAll('.links line').attr('class', '');
  }

  highlight(d) {
    // d3.select(d).attr('class', 'highlight')
    // console.log(d3.select(d))
    // node.attr('class', "highLight");
  }

  nodeMouseOut(d) {
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  }

  dragStart(d) {
    simulation.alphaTarget(1).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragDrag(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragEnd(d) {
    simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  updateGraph(component) {
    const svg = d3.select('svg');
    const tooltip = d3.select('.graph__tooltip');
    const nodesData = this.props.nodes;
    const linksData = this.props.links;

    const simulation = d3.forceSimulation().nodes(nodesData);

    simulation
      .force('charge_force', d3.forceManyBody()
        .strength(d => Math.min(-20 * d.recipesCount, -200)))
      .force("r", d3.forceRadial(getRadialForce, window.innerWidth / 2, window.innerHeight / 2)
        .strength(getRadialForceStrength))
      .force('center_force', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
      .force('links', d3.forceLink(linksData).id(d => d.name).strength(0));

    const graph = svg.append("g")
      .attr("class", "graph");

    const link = graph.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(linksData)
      .enter()
      .append('line')
      .attr('stroke-width', 2);

    const node = graph.append('g')
      .attr('class', 'nodes')
      .selectAll('circle').data(nodesData)
      .enter()
      .append('circle')
      .attr('r', getNodeRadius)
      .attr('fill', getNodeColor)
      .on("mouseover", nodeMouseOver)
      .on("mouseout", nodeMouseOut)
      .on("click", nodeClick);

    // simulation.alphaTarget(0.2);
    simulation.on('tick', simTick);

    // User Input Handlers

    const zoomHandler = d3.zoom()
      .on("zoom", handleZoom);
    zoomHandler(svg);

    const dragHandler = d3.drag()
      .on("start", dragStart)
      .on("drag", dragDrag)
      .on("end", dragEnd);
    // dragHandler(node)

    // Functions

    function getRadialForceStrength(d) {
      if (d.type === 'I') {
        if (d.inShelf) {
          return 0.1;
        } else {
          return 0.1;
        }
      } else {
        return 0.1;
      }
    }

    function getRadialForce(d) {
      if (d.type === 'I') {
        if (d.inShelf) {
          return 0;
        } else {
          return 300;
        }
      }
      else {
        return 200;
      }
    }

    function getNodeRadius(d) {
      return 10 + d.recipesCount * 0.75;
    }

    function getNodeColor(d) {
      if (d.type === 'I') {
        if (d.inShelf) {
          return '#4389f9';
        } else {
          return '#94bcfc';
        }
      }
      else {
        switch (d.category) {
          case "Ordinary Drink":
            return "#ff7200";
          case "Cocktail":
            return "#ff1900";
          case "Other/Unknown":
            return "#d0ff00";
          default:
            return "#ff7200";
        }
      }
    }

    function simTick(){
      node.attr('cx', d => d.x).attr('cy', d => d.y);
      link
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    }

    function handleZoom() {
      graph.attr("transform", d3.event.transform);
    }

    function nodeMouseOver(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html(d.name)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    }

    function nodeClick(d) {
      d3.selectAll('.links line')
        .attr('class', link => {
          if (link.source === d || link.target === d) {
            return "highlight";
          } else {
            return "";
          }
        });
      if (d.type === "R" || d.type === "RI") {
        component.props.openModal();
        component.props.showMixable(d.name);
      }
    }

    function removeHighlights() {
      d3.selectAll('.nodes circle').attr('class', '');
      d3.selectAll('.links line').attr('class', '');
    }

    function highlight(d) {
      // d3.select(d).attr('class', 'highlight')
      // console.log(d3.select(d))
      // node.attr('class', "highLight");
    }

    function nodeMouseOut(d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    }

    function dragStart(d) {
      simulation.alphaTarget(1).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragDrag(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnd(d) {
      simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  handleClick(mixableId) {
    return e => {
      this.props.openModal();
      this.props.showMixable(mixableId);
    };
  }

  render() {

    return (
      <section className="graph">
        <div className="graph__tooltip"></div>
        <svg className="graph__svg"></svg>
      </section>
    );
  }
}

export default Graph;
