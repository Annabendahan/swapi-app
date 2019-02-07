import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2'


class Chart extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chartData: {


      }
     }
   }


render() {
  return (
    <div>
    chart
    <Bar
    data= {this.state.chartData}
    />
    </div>
    )
}

}



export default Chart;
