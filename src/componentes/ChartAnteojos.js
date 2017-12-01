import React, { Component } from 'react';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import './ChartAnteojos.css'

const data = [
      {name: '10-15', Hombres: 8, Mujeres: 2},
      {name: '16-20', Hombres: 6, Mujeres: 5},
      {name: '21-25', Hombres: 5, Mujeres: 9},
      {name: '26-30', Hombres: 2, Mujeres: 5},
      {name: '31-35', Hombres: 8, Mujeres: 5},
      {name: '36-40', Hombres: 7, Mujeres: 3},
      {name: '41-45', Hombres: 3, Mujeres: 6},
];

class ChartAnteojos extends Component{
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

export default ChartAnteojos;
