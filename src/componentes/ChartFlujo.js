import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import * as firebase from 'firebase'
import {ref,firebaseAuth} from './const.js'


import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  width:'82%',
  padding:'3%',
  marginLeft: '9%'
 }

 function adecuarArray(datos,arrayDias){
   var datosFinales=[];
   var aux;
   for(var i=0;i<datos.length;i++){
     if(i==0){
       aux=arrayDias[i];
       datosFinales.push(datos[i]);
     }
     else{
       var resta=arrayDias[i]-aux;
       if(resta!=1){
         var valActual=datos[i];
         for(var j=1;j<resta;j++){
           datosFinales.push(0);
         }
       }
       datosFinales.push(datos[i]);
       aux=arrayDias[i];
     }

   }

   for(var i=1;i<arrayDias[0];i++){ //llenamos array con 0 al inicio para equilibrar dias no metricados
       datosFinales.unshift(0);
   }
   return datosFinales;
 }

class ChartFlujo extends Component{
    componentWillMount(){

      var date = new Date();
      var mesActual = date.getMonth()+1;

      this.state ={
        mesActivo:mesActual,
        value: mesActual,
        arrayViews:[],
        arrayDays:[],
      }

      this.getDataFromDataBase();

    }



    datosFlujo(array,arrayDias){
        var datos=array;
        var arrayDias=arrayDias;
        var datosFinales=[];
        if(datos!=null){
        datosFinales=adecuarArray(datos,arrayDias);
      }

      const flujo = {
        labels: ['1', '2', '3', '4', '5', '6', '7','8','9','10',
                 '11','12','13','14','15','16','17','18','19','20',
                 '21','22','23','24','25','26','27','28','29','30'],
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
            data: datosFinales
          }
        ]
      };
      return flujo;
    }

    getDataFromDataBase = () =>{
      let self = this;
      let totalCounts = 0;
      let arrayViews = [];
      let arrayDays = [];
      let mesActivo = self.state.mesActivo;
      var viewRefMes = firebase.database().ref('cliente/2017/'+mesActivo+'/');
      viewRefMes.on('value',function(snapshot){
        snapshot.forEach(snapChild =>{
          self.setState({
            arrayViews: self.state.arrayViews.concat(snapChild.val().views.viewCount),
            arrayDays: self.state.arrayDays.concat(snapChild.key),
          })
        })
      });
    }

    handleChange = (event, index, value) =>{
      let self = this;
      let totalCounts = 0;
      let arrayViews = [];
      let arrayDays = [];
      var promise=new Promise(
        function(resolve,reject){
          resolve(
            self.setState({
               mesActivo:value,
               value:value,
             })
          );
        }
      )
      promise.then(
        function(){
          self.getDataFromDataBase();
        }
      )

    }

    render(){
        return(
            <div style={styles}>
            <Line data={()=>this.datosFlujo(this.state.arrayViews,this.state.arrayDays)}  />
            <SelectField
              floatingLabelText="Seleccione el mes"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem value={1} primaryText="Enero" />
              <MenuItem value={2} primaryText="Febrero" />
              <MenuItem value={3} primaryText="Marzo" />
              <MenuItem value={4} primaryText="Abril" />
              <MenuItem value={5} primaryText="Mayo" />
              <MenuItem value={6} primaryText="Junio" />
              <MenuItem value={7} primaryText="Julio" />
              <MenuItem value={8} primaryText="Agosto" />
              <MenuItem value={9} primaryText="Septiembre" />
              <MenuItem value={10} primaryText="Octubre" />
              <MenuItem value={11} primaryText="Noviembre" />
              <MenuItem value={12} primaryText="Diciembre" />
            </SelectField>
            </div>
        )
    }
}

export default ChartFlujo;
