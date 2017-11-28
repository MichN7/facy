import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import * as firebase from 'firebase'
import {ref,firebaseAuth} from './const.js'

const styles = {
  width:'82%',
  padding:'3%',
  marginLeft: '9%'
 }

class ChartFlujo extends Component{
    componentWillMount(){

      this.state ={
        Ene:0,
        Feb:0,
        Mar:0,
        Abr:0,
        May:0,
        Jun:0,
        Jul:0,
        Ago:0,
        Sep:0,
        Oct:0,
        Nov:0,
        Dic:0,
      }

      let self = this;
      var viewRefNov = firebase.database().ref('cliente/2017/11');
      viewRefNov.on('value', function(snapshot) {
        snapshot.forEach(snapChild =>{
          snapChild.forEach(snapBaby=>{
            if(snapBaby.val().viewCount != undefined){
              self.setState({
                Nov:snapBaby.val().viewCount,
              })
            }
          })
        })
      });



    }

    datosFlujo(){
      
      let Ene = this.state.Ene;
      let Feb = this.state.Feb;
      let Mar = this.state.Mar;
      let Abr = this.state.Abr;
      let May = this.state.May;
      let Jun = this.state.Jun;
      let Jul = this.state.Jul;
      let Ago = this.state.Ago;
      let Sep = this.state.Sep;
      let Oct = this.state.Oct;
      let Nov = this.state.Nov;
      let Dic = this.state.Dic;

      var datos=[Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic];

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

    render(){
        return(
            <div style={styles}>
            <Line data={this.datosFlujo()}  />
            </div>
        )
    }
}

export default ChartFlujo;
