import React, { Component } from 'react';
var d3 = require("d3");
require('../css/main.css');

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
        path: React.PropTypes.string.isRequired,
        color: 'blue',
      };
    }

    render() {
      let { stroke, fill, strokeWidth } = this.state;
      let {path} =  this.props;
      return (
        <path
          d={path}
          fill={fill}
          stroke={this.state.color}
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


  constructor(props) {
    super(props);
    this.state={
      data:               this.props.data,
      interpolationType:  'cardinal',
    };
  }

  render() {


    console.log(this.props.xSettings);
      
 
    let axis = d3.axisBottom()
        .ticks(5)
        .scale(this.props.xSettings.scale);

    let { xScale,yScale,interpolationType } = this.props;
    let data = this.state.data;
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
        <g className="axis" ref="axis" transform={this.props.xSettings.translate}>{axis}</g>
        <g>{lines}</g>
      </g>

    );
  }
};


class LineChart extends Component {
      constructor(props){
          super(props);
          this.state = {
              width:  300,
              height: 400,
              padding : 30,
              data: this.props.data
          };
      }

      render() {
        let {data} = this.state;
        var xScale = d3.scaleLinear()
                .domain([0, this.state.data.xValues.length])
                .range([0, this.state.width]);

        var yScale = d3.scaleLinear()
                .domain([0, this.state.data.yMax])
                .range([this.state.height,0]);


        var xSettings = {
              translate: 'translate(0,' + (this.state.height - this.state.padding) + ')',
              scale: xScale,
              orient: 'bottom'
        };

        var ySettings = {
              translate: 'translate(' + this.state.padding + ', 0)',
              scale: yScale,
              orient: 'left'
        };




        return (
            <svg height={this.state.height} width={this.state.width}  >

              <DataSeries 
                xScale={xScale}
                yScale={yScale}
                height={this.state.height}
                width={this.state.width}
                data={data}
                xSettings={xSettings}
                ySettings={ySettings}
                />
            </svg>
        );
      }

};

export default LineChart;