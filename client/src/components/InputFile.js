import React from 'react';

class InputFile extends React.Component {
  state = {
    fileName: '',
    file: null,
  };

  onChange = (evt) => {
    const inputFile = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileName = inputFile.name; 

      const file = e.target.result.split(',')[1];

      this.setState({fileName, file});
      
      //Propagate up
      this.props.onChange({ fileName, file });
    };
    reader.readAsDataURL(inputFile);
  }

  render() {
    return (
      <div>
        <input type='file'
               onChange={this.onChange}
        />
      </div>
    );
  }
}

export default InputFile;