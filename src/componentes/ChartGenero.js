import React, { Component } from 'react';

//firebase
import * as firebase from 'firebase'
import {ref,firebaseAuth} from './const.js'

//react charts
import {Doughnut} from 'react-chartjs-2';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const styles = {
    width:'82%',
    padding:'3%',
    marginLeft: '9%'
   }

class ChartGenero extends Component{

    componentWillMount(){

      var date = new Date();
      var mesActual = date.getMonth();

      this.state = {
        mesActivo:mesActual+1,
        value:mesActual+1,
        female:0,
        male:0
      }

      this.getDataFromDataBase();

    }

    handleDates = (generoActivo,totalCounts) =>{
      console.log("Total:"+totalCounts);
      console.log("En: "+generoActivo);

      if(generoActivo === "female"){
        this.setState({
          female: this.state.female += totalCounts,
        })
      }else if(generoActivo === "male"){
        this.setState({
          male: this.state.male += totalCounts,
        })
      }

    }

    getDataFromDataBase = () =>{
      let self = this;
      let totalCounts = 0;
      let generoActivo = "";
      let mesActivo = this.state.mesActivo;
      var viewRefMes = firebase.database().ref('cliente/2017/'+mesActivo+'/');
      viewRefMes.on('value',function(snapshot){
        snapshot.forEach(snapChild =>{ //key = dia
          snapChild.forEach(snapGrandChild =>{ // key = male , female
            generoActivo = snapGrandChild.key;
            snapGrandChild.forEach(snapGrandGrandChild=>{ //key = rango de edades
              snapGrandGrandChild.forEach(snapGrandGrandGrandChild =>{ //key = emociones...
                if(snapGrandGrandGrandChild.key == 'Emociones'){
                  snapGrandGrandGrandChild.forEach(snapGrandGrandGrandGrandChild =>{ //key = feliz, sunGlasses
                    totalCounts += snapGrandGrandGrandGrandChild.val().total;
                    console.log("Numero:"+snapGrandGrandGrandGrandChild.val().total);
                  })
                }
              })

              if(totalCounts != 0){
                self.handleDates(generoActivo,totalCounts);
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
      let generoActivo = "";
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
      let data = {
          labels:[
              'Hombres',
              'Mujeres'
          ],
          datasets:[{
              data:[this.state.male,this.state.female],
              backgroundColor:[
                  '#4571DA',
                  '#DB5A6E'
              ],
              hoverBackgroundColor:[
                  '#4571DA',
                  '#DB5A6E'
              ],
          }]
      }
        return(
            <div style={styles}>
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
              <Doughnut data={data} />
            </div>
        )
    }
}

export default ChartGenero;
