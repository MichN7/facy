import React, { Component } from 'react';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import * as firebase from 'firebase'
import {ref,firebaseAuth} from './const.js'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './ChartEdad.css'

class ChartEmociones extends Component{

    componentWillMount(){

      var date = new Date();
      var mesActual = date.getMonth();

      this.state ={
        mesActivo: mesActual+1,
        value:mesActual+1,

        enojoF:0,
        desprecioF:0,
        disgustoF:0,
        miedoF:0,
        felicidadF:0,
        tristezaF:0,
        sorpresaF:0,
        neutralF:0,

        enojoM:0,
        desprecioM:0,
        disgustoM:0,
        miedoM:0,
        felicidadM:0,
        tristezaM:0,
        sorpresaM:0,
        neutralM:0,

      }
      this.getDataFromDataBase();

    }

    handleDates = (emocionActiva,generoActivo,count) =>{
      console.log(emocionActiva);
      console.log(count);
      console.log(generoActivo);
      if(generoActivo === "female"){
        switch (emocionActiva) {
          case "Anger":
            this.setState({
              enojoF: this.state.enojoF + count,
            })
            break;
          case "Contempt":
            this.setState({
              desprecioF: this.state.desprecioF + count,
            })
          break;
          case "Disgust":
            this.setState({
              disgustoF: this.state.disgustoF + count,
            })
          break;
          case "Fear":
            this.setState({
              miedoF: this.state.miedoF + count,
            })
            break;
          case "Happiness":
            this.setState({
              felicidadF: this.state.felicidadF + count,
            })
          break;
          case "Sadness":
            this.setState({
              tristezaF: this.state.tristezaF + count,
            })
          break;
          case "Surprise":
            this.setState({
              sorpresaF: this.state.sorpresaF + count,
            })
          break;
          case "Neutral":
            this.setState({
              neutralF: this.state.neutralF + count,
            })
          break;
          default:

        }
      }
      else if(generoActivo === "male"){
        switch (emocionActiva) {
          case "Anger":
            this.setState({
              enojoM: this.state.enojoM + count,
            })
            break;
          case "Contempt":
            this.setState({
              desprecioM: this.state.desprecioM + count,
            })
          break;
          case "Disgust":
            this.setState({
              disgustoM: this.state.disgustoM + count,
            })
          break;
          case "Fear":
            this.setState({
              miedoM: this.state.miedoM + count,
            })
            break;
          case "Happiness":
            this.setState({
              felicidadM: this.state.felicidadM + count,
            })
          break;
          case "Sadness":
            this.setState({
              tristezaM: this.state.tristezaM + count,
            })
          break;
          case "Surprise":
            this.setState({
              sorpresaM: this.state.sorpresaM + count,
            })
          break;
          case "Neutral":
            this.setState({
              neutralM: this.state.neutralM + count,
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
                    let emocionActiva = snapGrandGrandGrandGrandChild.key;
                    let count = snapGrandGrandGrandGrandChild.val().total;
                    self.handleDates(emocionActiva,generoActivo,count);
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
              {name: 'Enojo', Hombres: this.state.enojoM, Mujeres: this.state.enojoF},
              {name: 'Desprecio', Hombres: this.state.desprecioM, Mujeres: this.state.desprecioF},
              {name: 'Disgusto', Hombres: this.state.disgustoM, Mujeres: this.state.disgustoF},
              {name: 'Miedo', Hombres: this.state.miedoM, Mujeres: this.state.miedoF},
              {name: 'Felicidad', Hombres: this.state.felicidadM, Mujeres: this.state.felicidadF},
              {name: 'Tristeza', Hombres: this.state.tristezaM, Mujeres: this.state.tristezaF},
              {name: 'Sorpresa', Hombres: this.state.sorpresaM, Mujeres: this.state.sorpresaF},
              {name: 'Neutral', Hombres: this.state.neutralM, Mujeres: this.state.neutralF},
        ];

        return(
            <div className='chart'>
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

export default ChartEmociones;
