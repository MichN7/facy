import React, { Component } from 'react';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import './ChartEdad.css'

const data = [
      {name: 'Enojo', Hombres: 6, Mujeres: 3},
      {name: 'Desprecio', Hombres: 4, Mujeres: 2},
      {name: 'Disgusto', Hombres: 8, Mujeres: 9},
      {name: 'Miedo', Hombres: 4, Mujeres: 5},
      {name: 'Felicidad', Hombres: 8, Mujeres: 2},
      {name: 'Tristeza', Hombres: 2, Mujeres: 7},
      {name: 'Sorpresa', Hombres: 6, Mujeres: 8},
];

class ChartEmociones extends Component{
    render(){
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
            </div>
        )
    }
}

export default ChartEmociones;