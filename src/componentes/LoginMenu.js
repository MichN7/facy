import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//React ICON
import TiSocialFlickrCircular from 'react-icons/lib/ti/social-flickr-circular'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './LoginMenu.css'

class LoginMenu extends Component {
  render() {
    return (
      <div className="login-form">
      	<style>{`
	      body > div,
	      body > div > div,
	      body > div > div > div.login-form {
	        height: 100%;
	      }
	    `}</style>
	    <Grid
	    	textAlign='center'
	    	style={{height:'100%'}}
	    	verticalAlign='middle'
	    >
	     <Grid.Column style={{maxWidth: 450}}>
	       <TiSocialFlickrCircular  size='50'/>
	       <Header as='h1' color='teal' textAlign='center'>
	         Facy
	       </Header>
	         <p> Mira hacía arriba </p>
	       <Form size='large'>
	       	 
		        <Form.Input
		         fluid
		         icon='user'
		         iconPosition='left'
		         placeholder='Correo'
		        />
		        <Form.Input
		         fluid
		         icon='lock'
		         iconPosition='left'
		         placeholder='Password'
		         type='password'
		        />
						<Link to="/charts">
							<Button color='teal' fluid size='large'>Ingresar</Button>
						</Link>
	        </Form>
	     </Grid.Column>
	    </Grid>
      </div>
    );
  }
}

export default LoginMenu;
