import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

function datosFlujo(){
  var datos=[22,12,21,37,15,29,26,24,29,45,38];
  const flujo = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun', 'Jul','Ago','Sep','Oct','Nov','Dic'],
    datasets: [
      {
        label: 'Usuarios que ingresaron',
        fill: false,
        lineTension: 0.2,
        backgroundColor: '#4571DA',
        borderColor: '#4571DA',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#4571DA',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 4,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#4571DA',
        pointHoverBorderColor: '#4571DA',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: datos
      }
    ]
  };
  return flujo;
}
const styles = {
  width:'82%',
  padding:'3%',
  marginLeft: '9%'
 }
class ChartFlujo extends Component{
    render(){
        return(
            <div style={styles}>
            <Line data={datosFlujo()}  />
            </div>
        )
    }
}

export default ChartFlujo;
