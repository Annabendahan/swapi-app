import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2'


class Chart extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels:['paris', 'london'],
        datasets:[{
          label: 'Population',
          data:[ 2, 4],
          backgroundColor: 'red',
        }]
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
