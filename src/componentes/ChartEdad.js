import React, { Component } from 'react';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import './ChartEdad.css'

const data = [
      {name: '0-5', Hombres: 4, Mujeres: 2},
      {name: '6-10', Hombres: 3, Mujeres: 1},
      {name: '11-15', Hombres: 5, Mujeres: 9},
      {name: '16-20', Hombres: 2, Mujeres: 3},
      {name: '21-25', Hombres: 8, Mujeres: 5},
      {name: '26-30', Hombres: 2, Mujeres: 3},
      {name: '31-35', Hombres: 3, Mujeres: 4},
];

class ChartEdad extends Component{
    render(){
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
            </div>
        )
    }
}

export default ChartEdad;