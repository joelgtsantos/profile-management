import React, { Component } from 'react';
import { client }  from '../Client';
//import Form from 'formsy-react-2';
import InputFile from './InputFile';
import '../style/Profile.css';
import {
  Form, Input, Checkbox, File
} from 'formsy-semantic-ui-react';

class Profile extends Component {
	state = {
		fetched: true,
		canSubmit: true,
		formIsValid: false,
		fields:{
			study: '',
			work: '',
			wantWork: false,
			fileName: '',
			file: null,
		}
	}

	getInitialState = () => {
    	return { canSubmit: false };
	};
	 
	submit = (data) => {
		console.log(data);
	    alert(JSON.stringify(data, null, 4));
	   	this.form.reset();//.form.reset();
	};

	enableSubmit = () => {
	    this.setState({ formIsValid: true });
	};
	
	disableSubmit = () => {
	    this.setState({ formIsValid: false });
	};

	onInputFileChange = ({ fileName, file }) => {
		const fields = this.state.fields;
		fields['fileName'] = fileName;
		fields['file'] = file;

	    this.setState({fields});

	    console.log(this.state);
	};

	render(){

		return(
			<div className='ui container'>
				<Form
					ref={ ref => this.form = ref } 
					onValidSubmit={this.submit}
					onValid={this.enableSubmit}
					onInvalid={this.disableSubmit} 
					>
				    <Form.Input
				        name='study'
				        value={this.state.fields.study}
				        placeholder='Nombre de tu lugar de estudios?'
				        defaultValue=''
				    />
				    <Form.Input
				        name='work'
				        value={this.state.fields.work}
				        placeholder='Nombre de tu lugar de trabajo?'
				        defaultValue=''
				    />
				    <Form.Checkbox
				        name='wantWork'
				        checked={this.state.fields.wantWork}
				        label='Esta interesado en una oportunidad de trabajo?'
				        defaultValue='false'
				    />
				    <div className='field'>
					    <InputFile
					     	type='file'
					        onChange={this.onInputFileChange}					       
					    />
				    </div>
				    <button type='submit' disabled={!this.state.formIsValid} className='ui button'>Submit</button>
			    </Form>
		    </div>
		);
	}
}

export default Profile;