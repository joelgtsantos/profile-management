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
        formIsValid: false,
        fields:{
            study: '',
            work: '',
            wantWork: false,
            fileName: '',
            file: null,
        }
    }
     
    submit = (data) => {
        console.log(this.props.user);

        const person = data;
        person.id = this.props.user.id;
        this.props.onSubmit(person);
        //this.form.reset();//.form.reset();
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
                        defaultValue={this.state.fields.study}
                        placeholder='Nombre de tu lugar de estudios?'
                    />
                    <Form.Input
                        name='work'
                        defaultValue={this.state.fields.work}
                        placeholder='Nombre de tu lugar de trabajo?'
                    />
                    <Form.Checkbox
                        name='wantWork'
                        defaultValue={this.state.fields.wantWork}
                        label='Esta interesado en una oportunidad de trabajo?'
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