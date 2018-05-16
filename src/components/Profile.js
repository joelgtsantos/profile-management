import React, { Component } from 'react';
import { client }  from '../Client';
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
            cv: '',
            name: null,
        }
    }
     
    submit = (data) => {
        const person = data;
        person.id = this.props.user.id;
        //const cv = {fileName: this.state.fields.fileName, file: this.state.fields.file};
        person.cv = this.state.fields.cv;
        person.name = this.state.fields.name;
        console.log(person);
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
        fields['cv'] = file;
        fields['name'] = fileName;

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