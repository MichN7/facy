import React, { Component } from 'react';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import './ChartAnteojos.css'

const data = [
      {name: 'Sin lentes', Hombres: 8, Mujeres: 2},
      {name: 'Lentes de lectura', Hombres: 6, Mujeres: 5},
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
//dom
export default ChartAnteojos;
