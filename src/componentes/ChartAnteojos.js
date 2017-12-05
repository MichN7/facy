import React, { Component } from 'react';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import * as firebase from 'firebase'
import {ref,firebaseAuth} from './const.js'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './ChartAnteojos.css'

const data = [
      {name: 'Sin lentes', Hombres: 8, Mujeres: 2},
      {name: 'Lentes de lectura', Hombres: 6, Mujeres: 5},
];

class ChartAnteojos extends Component{

  componentWillMount(){

    var date = new Date();
    var mesActual = date.getMonth();

    this.state ={
      mesActivo: mesActual+1,
      value:mesActual+1,

      sinLentesF:0,
      lentesLecturaF:0,


      sinLentesM:0,
      lentesLecturaM:0,


    }
    this.getDataFromDataBase();

  }

  handleDates = (lentesActivos,generoActivo,count) =>{
    console.log(lentesActivos);
    console.log(count);
    console.log(generoActivo);
    if(generoActivo === "female"){
      switch (lentesActivos) {
        case "NoGlasses":
          this.setState({
            sinLentesF: this.state.sinLentesF + count,
          })
          break;
        case "ReadingGlasses":
          this.setState({
            lentesLecturaF: this.state.lentesLecturaF + count,
          })
        break;
        default:

      }
    }
    else if(generoActivo === "male"){
      switch (lentesActivos) {
        case "NoGlasses":
          this.setState({
            sinLentesM: this.state.sinLentesM + count,
          })
          break;
        case "ReadingGlasses":
          this.setState({
            lentesLecturaM: this.state.lentesLecturaM + count,
          })
        break;
        default:

      }
    }
  }

  getDataFromDataBase = () =>{
    let self = this;
    let totalCounts = 0;
    let edadActiva = "";
    let mesActivo = this.state.mesActivo;
    var viewRefMes = firebase.database().ref('cliente/2017/'+mesActivo+'/');
    viewRefMes.on('value',function(snapshot){
      snapshot.forEach(snapChild =>{ //key = dia
        snapChild.forEach(snapGrandChild =>{ // key = male , female
          let generoActivo = snapGrandChild.key;
          snapGrandChild.forEach(snapGrandGrandChild=>{ //key = rango de edades
            let edadActiva = snapGrandGrandChild.key;
            snapGrandGrandChild.forEach(snapGrandGrandGrandChild =>{ //key = emociones...
              if(snapGrandGrandGrandChild.key == 'lentes'){
                snapGrandGrandGrandChild.forEach(snapGrandGrandGrandGrandChild =>{ //key = feliz, sunGlasses
                  let lentesActivos = snapGrandGrandGrandGrandChild.key;
                  let count = snapGrandGrandGrandGrandChild.val().total;
                  self.handleDates(lentesActivos,generoActivo,count);
                })
              }
            })
          })
        })
      })
    });
  }

  handleChange = (event, index, value) =>{
    let self = this;
    let totalCounts = 0;
    let edadActiva = "";
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

      let data = [
            {name: 'Sin lentes', Hombres: this.state.sinLentesM, Mujeres: this.state.sinLentesF},
            {name: 'Lentes de lectura', Hombres: this.state.lentesLecturaM, Mujeres: this.state.lentesLecturaF},
      ];

        return(
            <div className="chart">
                <BarChart width={1000} height={500} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="Hombres" fill="#4571DA" />
                    <Bar dataKey="Mujeres" fill="#DB5A6E" />
                </BarChart>
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
//dom
export default ChartAnteojos;
