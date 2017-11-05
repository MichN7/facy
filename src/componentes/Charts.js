import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';


import Slider from 'material-ui/Slider';

import ChartAnteojos from './ChartAnteojos.js'
import ChartEdad from './ChartEdad.js'
import ChartEmociones from './ChartEmociones.js'
import ChartGenero from './ChartGenero.js'
import ChartFlujo from './ChartFlujo.js'

const styles = {
    tab: {
      backgroundColor:'#4571DA',
    },
  };

class Charts extends Component{
    render(){
        return(
          <Tabs >
            <Tab
              label="flujo"
              style={styles.tab}
            >
                <ChartFlujo/>
            </Tab>
            <Tab
              label="genero"
              style={styles.tab}
            >
                <ChartGenero />
            </Tab>
            <Tab
              style={styles.tab}
              label="edad"
            >
                <ChartEdad/>
            </Tab>
            <Tab
              style={styles.tab}
              label="emoción"
            >
                <ChartEmociones/>
            </Tab>
            <Tab
              style={styles.tab}
              label="lentes"
            >
                <ChartAnteojos/>
            </Tab>
          </Tabs>
        )
    }
}

export default Charts;