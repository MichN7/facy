import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer} from 'recharts';
import './ChartEdad.css'

import * as firebase from 'firebase'
import {ref,firebaseAuth} from './const.js'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    width:'82%',
    padding:'3%',
    marginLeft: '9%'
   }


class ChartEdad extends Component{
    componentWillMount(){

      var date = new Date();
      var mesActual = date.getMonth() + 1;

      this.state={
        mesActivo:mesActual,
        arrayViews:[],
        arrayDaysCount:[],
        value:mesActual,

        rangoEdad1F:0,
        rangoEdad2F:0,
        rangoEdad3F:0,
        rangoEdad4F:0,
        rangoEdad5F:0,
        rangoEdad6F:0,

        rangoEdad1M:0,
        rangoEdad2M:0,
        rangoEdad3M:0,
        rangoEdad4M:0,
        rangoEdad5M:0,
        rangoEdad6M:0,

      }
      this.getDataFromDataBase();
    }

    handleDates = (edadActiva , totalCounts, generoActivo) =>{

      console.log("Total:"+totalCounts);
      console.log("En: " + generoActivo);
      console.log("En: " + edadActiva);
      if(generoActivo === "female"){
        switch (edadActiva) {
          case "Edad 0-15":
            this.setState({
              rangoEdad1F: this.state.rangoEdad1F + totalCounts,
            })
            break;
          case "Edad 16-22":
            this.setState({
              rangoEdad2F: this.state.rangoEdad2F + totalCounts,
            })
          break;
          case "Edad 23-30":
            this.setState({
              rangoEdad3F: this.state.rangoEdad3F + totalCounts,
            })
          break;
          case "Edad 31-40":
            this.setState({
              rangoEdad4F: this.state.rangoEdad4F + totalCounts,
            })
            break;
          case "Edad 41-50":
            this.setState({
              rangoEdad5F: this.state.rangoEdad5F + totalCounts,
            })
          break;
          case "Edad 51 o mas":
            this.setState({
              rangoEdad6F: this.state.rangoEdad6F + totalCounts,
            })
          break;
          default:

        }
      }
      else if(generoActivo === "male"){
        switch (edadActiva) {
          case "Edad 10-15":
            this.setState({
              rangoEdad1M: this.state.rangoEdad1M + totalCounts,
            })
            break;
          case "Edad 16-22":
            this.setState({
              rangoEdad2M: this.state.rangoEdad2M + totalCounts,
            })
          break;
          case "Edad 23-30":
            this.setState({
              rangoEdad3M: this.state.rangoEdad3M + totalCounts,
            })
          break;
          case "Edad 31-40":
            this.setState({
              rangoEdad4M: this.state.rangoEdad4M + totalCounts,
            })
            break;
          case "Edad 41-50":
            this.setState({
              rangoEdad5M: this.state.rangoEdad5M + totalCounts,
            })
          break;
          case "Edad 51 o mas":
            this.setState({
              rangoEdad6M: this.state.rangoEdad6M + totalCounts,
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
                if(snapGrandGrandGrandChild.key == 'Emociones'){
                  snapGrandGrandGrandChild.forEach(snapGrandGrandGrandGrandChild =>{ //key = feliz, sunGlasses
                    totalCounts += snapGrandGrandGrandGrandChild.val().total;
                    console.log("Numero:"+snapGrandGrandGrandGrandChild.val().total);
                  })
                }
              })

              if(totalCounts != 0){
                self.handleDates(edadActiva, totalCounts, generoActivo);
              }
              totalCounts = 0;
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
        {name: '0-15', Hombres: this.state.rangoEdad1M, Mujeres: this.state.rangoEdad1F},
        {name: '16-22', Hombres: this.state.rangoEdad2M, Mujeres: this.state.rangoEdad2F},
        {name: '23-30', Hombres: this.state.rangoEdad3M, Mujeres: this.state.rangoEdad3F},
        {name: '31-40', Hombres: this.state.rangoEdad4M, Mujeres: this.state.rangoEdad4F},
        {name: '41-50', Hombres: this.state.rangoEdad5M, Mujeres: this.state.rangoEdad5F},
        {name: '51 o mas', Hombres: this.state.rangoEdad6M, Mujeres: this.state.rangoEdad6F},
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


export default ChartEdad;
