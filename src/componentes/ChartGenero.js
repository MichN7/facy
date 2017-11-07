import React, { Component } from 'react';

//react charts
import {Doughnut} from 'react-chartjs-2';

//react icons
import iconFlujo from 'react-icons/lib/ti/chart-line-outline';

const data = {
    labels:[
        'Hombres',
        'Mujeres'
    ],
    datasets:[{
        data:[30,20],
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

const styles = {
    width:'82%',
    padding:'3%',
    marginLeft: '9%'
   }

class ChartGenero extends Component{
    render(){
        return(
            <div style={styles}>
                <Doughnut data={data} />
            </div>
        )
    }
}

export default ChartGenero;