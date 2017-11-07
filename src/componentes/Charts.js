import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

//React icons
import TiChartLineOutline from 'react-icons/lib/ti/chart-line-outline';
import MdMood from 'react-icons/lib/md/mood';
import MdWc from 'react-icons/lib/md/wc';
import FaChild from 'react-icons/lib/fa/child';
import GoEye from 'react-icons/lib/go/eye';

//Material ui componente
import Slider from 'material-ui/Slider';

//Componentes Charts
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
              icon={<TiChartLineOutline/>}
            >
                <ChartFlujo/>
            </Tab>
            <Tab
              label="genero"
              style={styles.tab}
              icon={<MdWc/>}
            >
                <ChartGenero />
            </Tab>
            <Tab
              style={styles.tab}
              label="edad"
              icon={<FaChild/>}
            >
                <ChartEdad/>
            </Tab>
            <Tab
              style={styles.tab}
              label="emoción"
              icon={<MdMood/>}
            >
                <ChartEmociones/>
            </Tab>
            <Tab
              style={styles.tab}
              label="lentes"
              icon={<GoEye/>}
            >
                <ChartAnteojos/>
            </Tab>
          </Tabs>
        )
    }
}

export default Charts;