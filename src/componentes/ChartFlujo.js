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
        backgroundColor: 'rgba(3, 243, 229,2.4)',
        borderColor: 'rgba(3, 243, 229,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(3, 243, 229,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 4,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(3, 243, 229,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
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
  width:'90%',
  padding:'3%'
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
