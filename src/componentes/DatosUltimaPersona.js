import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import * as firebase from 'firebase'
import {ref,firebaseAuth} from './const.js'
import './DatosUltimaPersona.css'
import facyLogo from './facyLogo.png'


class DatosUltimaPersona extends Component{
  componentWillMount(){

    var date = new Date();
    var mesActual = date.getMonth()+1;
    let diaActual = date.getDate();

    this.state = {
      edad:"",
      emocion:"",
      genero:"",
      lentes:"",
      mesActivo:mesActual,
      diaActivo:diaActual,
    }
    this.getDataFromDataBase();
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
        if(snapChild.key == self.state.diaActivo){
          self.setState({
            edad: snapChild.val().ultimaPersona.edad,
            emocion:snapChild.val().ultimaPersona.emocion,
            genero:snapChild.val().ultimaPersona.genero,
            lentes:snapChild.val().ultimaPersona.lentes,
          })
        }
      })
    });
  }

  render(){
    if(this.state.lentes == "ReadingGlasses"){
      this.setState({
        lentes:"Lentes de lectura",
      })
     if(this.state.genero == "male"){
       this.setState({
         genero: "Hombre",
       })
     }
     if(this.state.genero == "female"){
       this.setState({
         genero:"Mujer",
       })
     }
     if(this.state.emocion == "Happy"){
       this.setState({
         genero:"Feliz",
       })
     }
     if(this.state.lentes == "NoGlasses"){
       this.setState({
         genero:"Sin Lentes"
       })
     }
    }
    return(
      <div className="persona">
        <div className="card">
           <h1>Última persona registrada</h1>
           <img src={facyLogo} />
           <div className="data-part">
             <div className="first-part">
               <div className="emocion">
                 <p className="title">Emoción</p>
                 <p>{this.state.emocion}</p>
               </div>
               <div className="edad">
                 <p className="title">Edad</p>
                 <p>{this.state.edad}</p>
               </div>
             </div>
             <div className="second-part">
               <div className="genero">
                 <p className="title">Género</p>
                 <p>{this.state.genero}</p>
               </div>
               <div className="lentes">
                 <p className="title">Lentes</p>
                 <p>{this.state.lentes}</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    )
  }
}

export default DatosUltimaPersona;
