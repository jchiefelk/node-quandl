import React, { Component } from 'react';
var d3 = require("d3");


let data = {
  points: [
    [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 },
      { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ]
    ,
    [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 },
      { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
    ,
    [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 },
      { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
    ],
  xValues: [0,1,2,3,4,5,6],
  yMin: 0,
  yMax: 30
};



class Line extends Component {

    propTypes: {
      path:   React.PropTypes.string.isRequired
    }

    constructor() {
      super();
      this.state = {
        stroke:       'blue',
        fill:         'none',
        strokeWidth:  3,
        path: React.PropTypes.string.isRequired
      };
    }

    render() {
      let { stroke, fill, strokeWidth } = this.state;
      let {path} =  this.props;
      return (
        <path
          d={path}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          />
      );
    }

};

class DataSeries extends Component {

  propTypes: {
     
    data:               React.PropTypes.object,
    interpolationType:  React.PropTypes.string,
    xScale:             React.PropTypes.func,
    yScale:             React.PropTypes.func
  }


  constructor() {
    super();
    this.state={
      data:               data,
      interpolationType:  'cardinal',
    };
  }

  render() {
    let { xScale, yScale, data, interpolationType } = this.props;
    console.log(data);

    let colors =  d3.scaleOrdinal(d3.schemeCategory10);

    let line = d3.line()
      .curve(d3.curveBasis)
      .x((d) => { return xScale(d.x); })
      .y((d) => { return yScale(d.y); });

      let lines = data.points.map((series, id) => {
      return (
        <Line
          path={line(series)}
          seriesName={series.name}
          stroke={colors(id)}
          key={id}
          />
      );
    });

    return (
      <g>
        <g>{lines}</g>
      </g>
    );
  }

};



class LineChart extends Component {

  constructor(){
      super();
      this.state = {
          width:  600,
          height: 300
      };
  }

  render() {
   
    let { width, height} = this.state;



    let xScale = d3.scaleOrdinal()
      .domain(data.xValues)
      .range([0, width]);

    let yScale = d3.scaleLinear()
      .range([height, 10])
      .domain([data.yMin, data.yMax]);


    return (
      <svg width={width} height={height}>
        <DataSeries
          xScale={xScale}
          yScale={yScale}
          data={data}
          width={width}
          height={height}
          />
      </svg>
    );
  }

};

export default LineChart;