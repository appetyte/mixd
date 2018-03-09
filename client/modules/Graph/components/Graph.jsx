import React from 'react';
import Modal from 'react-responsive-modal';
import * as d3 from 'd3';
import './graph.scss';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.updateGraph = this.updateGraph.bind(this);
    this.pureReactUpdateGraph = this.pureReactUpdateGraph.bind(this);
    this.animate = this.animate.bind(this);
    this.state = {
      lol: true
    };
  }

  componentWillMount() {
    // window.d3 = d3;
  }

  componentDidMount() {
    // this.pureReactUpdateGraph();
    this.props.fetchMixables([
      'Vodka',
      'Rum',
      'Orange juice',
      'Sugar',
      'Ice',
      'Lime',
      'Lime juice',
      'Lemon juice',
      'Water',
      'Gin',
      'Light rum',
      'Triple sec'
    ]);
    if (this.props.nodes.length > 0) this.updateGraph(this);
  }

  componentWillUpdate(nextProp) {
    // if(nextProp.nodes.length> 0) {
    //   this.pureReactUpdateGraph(nextProp);
    //   setTimeout(this.animate, 0);
    // }
  }

  animate() {
    this.simulation.tick();
    this.forceUpdate();
    setTimeout(this.animate, 0);
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    if (this.props.nodes.length > 0) this.updateGraph(this);
  }

  pureReactUpdateGraph(props) {
    this.svg = d3.select('.graph__svg');
    this.tooltip = d3.select('.graph__tooltip');

    this.simulation = d3.forceSimulation().nodes(props.nodes);

    this.simulation
      .force(
        'charge_force',
        d3.forceManyBody().strength(d => Math.min(-20 * d.recipesCount, -200))
      )
      .force(
        'r',
        d3
          .forceRadial(
            getRadialForce,
            window.innerWidth / 2,
            window.innerHeight / 2
          )
          .strength(getRadialForceStrength)
      )
      .force(
        'center_force',
        d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
      )
      .force(
        'links',
        d3
          .forceLink(props.links)
          .id(d => d.name)
          .strength(0)
      );

    // for (let i = 0; i < 2000; i++ ){
    //   this.simulation.tick();
    // }

    this.elements = d3.select('.graph__svg__elements');

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
      } else {
        return 200;
      }
    }
  }

  updateGraph(component) {
    const svg = d3.select('.graph__svg');
    const tooltip = d3.select('.graph__tooltip');
    const nodesData = this.props.nodes;
    const linksData = this.props.links;

    const simulation = d3.forceSimulation().nodes(nodesData);

    simulation
      .force(
        'charge_force',
        d3.forceManyBody().strength(getChargeForceStrength)
      )
      .force(
        'r',
        d3
          .forceRadial(
            getRadialForce,
            window.innerWidth / 2,
            window.innerHeight / 2
          )
          .strength(getRadialForceStrength)
      )
      .force(
        'center_force',
        d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)
      )
      .force(
        'links',
        d3
          .forceLink(linksData)
          .id(d => d.name)
          .strength(0)
      );

    const graph = d3.select('.graph__svg__elements');

    const link = d3
      .select('.graph__svg__elements__links')
      .selectAll('line')
      .data(linksData)
      .enter()
      .append('line')
      .attr('stroke-width', 2);

    const node = d3
      .select('.graph__svg__elements__nodes')
      .selectAll('circle')
      .data(nodesData)
      .enter()
      .append('circle')
      .attr('r', getNodeRadius)
      .attr('fill', getNodeColor)
      .on('mouseover', nodeMouseOver)
      .on('mouseout', nodeMouseOut)
      .on('click', nodeClick);

    // simulation.alphaTarget(0.2);
    simulation.on('tick', simTick);

    // User Input Handlers

    const zoomHandler = d3.zoom().on('zoom', handleZoom);
    zoomHandler(svg);

    const dragHandler = d3
      .drag()
      .on('start', dragStart)
      .on('drag', dragDrag)
      .on('end', dragEnd);
    // dragHandler(node)

    // Functions

    function getChargeForceStrength(d) {
      return Math.min(-5 * d.recipesCount, -50);
    }

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
          return 200;
        }
      } else {
        return 100;
      }
    }

    function getNodeRadius(d) {
      return 5 + d.recipesCount * 0.5;
    }

    function getNodeColor(d) {
      if (d.type === 'I') {
        if (d.inShelf) {
          return '#4389f9';
        } else {
          return '#94bcfc';
        }
      } else {
        switch (d.category) {
          case 'Ordinary Drink':
            return '#ff7200';
          case 'Cocktail':
            return '#ff1900';
          case 'Other/Unknown':
            return '#d0ff00';
          default:
            return '#ff7200';
        }
      }
    }

    function simTick() {
      node.attr('cx', d => d.x).attr('cy', d => d.y);
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
    }

    function handleZoom() {
      graph.attr('transform', d3.event.transform);
    }

    function nodeMouseOver(d) {
      tooltip
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      tooltip
        .html(d.name)
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY - 28 + 'px');
    }

    function nodeClick(d) {
      clearHighlights();
      const highlightedNodes = new Set([d]);
      // d3.select(this).attr('class', 'highlight');
      d3.selectAll('line').attr('class', link => {
        if (link.source === d) {
          highlightedNodes.add(link.target);
          return 'highlight';
        } else if (link.target === d) {
          highlightedNodes.add(link.source);
          return 'highlight';
        }
      });
      d3.selectAll('circle').attr('class', node => {
        if (highlightedNodes.has(node)) return 'highlight';
      });
      if (d.type === 'R' || d.type === 'RI') {
        component.props.openModal();
        component.props.showMixable(d.name);
      }
    }

    function clearHighlights() {
      d3.selectAll('.graph__svg__elements__nodes circle').attr('class', '');
      d3.selectAll('.graph__svg__elements__links line').attr('class', '');
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
      tooltip
        .transition()
        .duration(500)
        .style('opacity', 0);
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

  getNodeRadius(node) {
    return 10 + node.recipesCount * 0.75;
  }

  getNodeColor(node) {
    if (node.type === 'I') {
      if (node.inShelf) {
        return '#4389f9';
      } else {
        return '#94bcfc';
      }
    } else {
      switch (node.category) {
        case 'Ordinary Drink':
          return '#ff7200';
        case 'Cocktail':
          return '#ff1900';
        case 'Other/Unknown':
          return '#d0ff00';
        default:
          return '#ff7200';
      }
    }
  }

  render() {
    return (
      <section className="graph">
        <div className="graph__tooltip" />
        <svg className="graph__svg">
          <g className="graph__svg__elements">
            <g className="graph__svg__elements__links" />
            <g className="graph__svg__elements__nodes" />
          </g>
        </svg>
      </section>
    );

    // return (<section className="graph">
    //   <div className="graph__tooltip"></div>
    //   <svg className="graph__svg">
    //     <g className="graph__svg__elements">
    //       <g className="graph__svg__elements__nodes">
    //         {this.props.nodes.map(node => <circle
    //           key={node.name}
    //           strokeWidth="2"
    //           r={this.getNodeRadius(node)}
    //           fill={this.getNodeColor(node)}
    //           cx={node.x}
    //           cy={node.y}
    //           ></circle>)}
    //       </g>
    //       <g className="graph__svg__elements__lines"></g>
    //     </g>
    //   </svg>
    // </section>);
  }
}

export default Graph;
