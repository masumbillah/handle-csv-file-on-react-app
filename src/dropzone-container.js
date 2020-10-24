import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'

const DZStyles = {
  paddingRight: 20,
  paddingLeft: 20,
  marginBottom: 20
};

export default class DropzoneAreaComponent extends Component {

    constructor(props) {
      super(props);
      this.state = { isError: false };
      this.handleOnDrop = this.handleOnDrop.bind(this);
    }

  handleOnDrop = (fileData, fileMeta) => {
    let instance = this,
        {onChangeEvent} = instance.props;

    if(fileMeta && fileMeta.type === "text/csv") {
        let data = getJsonArray(fileData);
        onChangeEvent({data, isSuccess: true});
    } else {
       instance.setState({isError: true});
      setTimeout(()=>{
        instance.setState({isError: false});
      }, 3000)
    }
  }

  render() {
    return (
      <div className="dropzone-container">
        {this.state.isError? <h3 className="danger-color">File format not matched. Please upload csv file.</h3>:null}
        <CSVReader
          onDrop={this.handleOnDrop}
          addRemoveButton
        >
        <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </div>
    )
  }
};

// Create lines json data to json format
const getJsonArray = (lines)=> {
  let result = [],
      headers= lines && lines[0].data;

  for(let i=1; i<lines.length; i++){

      let obj = {},
          currentline=lines[i].data;

      for(let j=0; j<headers.length; j++){
          obj[headers[j]] = currentline[j];
      }
      result.push(obj);
  }
  
  return result;
}
