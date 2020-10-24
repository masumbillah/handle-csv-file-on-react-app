import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import DropzoneAreaComponent from './dropzone-container.js'
var _ = require('lodash');

//Start styles this component
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  successfulyMessage: {
    height: 200,
    textAlign:'center'
  }
}));

const formBox = {
    textAlign:'center',
    marginTop: 0, 
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: `50%`,
    minWidth: 400
  };
//End styles this component

const getRandomId = () => {
  return Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, '');
}

const setFileData = (formData, data, cb) => {
    const xValues = _.map(data, 'X');
    const yValues = _.map(data, 'Y');
    const zValues = _.map(data, 'Z');

    if(xValues.length && _.max(xValues)) formData['maxX'] = _.max(xValues) || 0;
    if(xValues.length && _.min(xValues)) formData['minX'] = _.min(xValues) || 0;
    if(yValues.length && _.max(yValues)) formData['maxY'] = _.max(yValues) || 0;
    if(yValues.length && _.min(yValues)) formData['minY'] = _.min(yValues) || 0;
    if(zValues.length && _.max(zValues)) formData['maxZ'] = _.max(zValues) || 0;
    if(zValues.length && _.min(zValues)) formData['minZ'] = _.min(zValues) || 0;

  if(cb) cb(formData)    
};

function getSteps() {
  return ['Step 1', 'Step 2', 'Finish'];
}

function getStepContent(props) {
  const {step, dropCallbackEvent} = props;
  switch (step) {
    case 0:
      return (<Grid container spacing={3} style={{justifyContent:'center'}}>{stepOneForm(props)}</Grid>);
    case 1:
      return (<DropzoneAreaComponent onChangeEvent={dropCallbackEvent} />);
    case 2:
      return stepTwoForm(props);
    default:
      return 'Unknown step';
  }
}

//Step one form
const stepOneForm = (props) => {
  let {formData} = props,
      onChange = props.textFieldChangeEvent,
      isStepTwo = !!props.isStepTwo

  return (
       <Grid item xs={6}>
          <TextField disabled={isStepTwo} defaultValue={formData && formData.pName} name="pName" onChange={(e)=> onChange(e)} id="project-name" label="Project name" fullWidth margin="normal" /> <br/>
          <TextField disabled={isStepTwo} defaultValue={formData && formData.pDescription} onChange={(e)=> onChange(e)} name="pDescription" id="project-description" label="Project description" fullWidth margin="normal" /> <br/>
          <TextField disabled={isStepTwo} defaultValue={formData && formData.client} onChange={(e)=> onChange(e)} name="client" id="client" label="Client" fullWidth margin="normal"  /> <br/>
          <TextField disabled={isStepTwo} defaultValue={formData && formData.contractor} onChange={(e)=> onChange(e)} name="contractor" id="contractor" label="contractor" fullWidth margin="normal"  />
      </Grid>
    )
}

//Step two form
const stepTwoForm = (props) => {
   let {formData} = props,
      onChange = props.textFieldChangeEvent;

  return (
       <form noValidate autoComplete="off" style={formBox}>
          <Grid container spacing={3}>
              {stepOneForm({isStepTwo:true, ...props})}
            <Grid item xs={6}>
              <TextField defaultValue={formData && formData.maxX} name="maxX" onChange={(e)=> onChange(e)} id="max_x" label="Max X" type="number" fullWidth margin="normal" /> <br/>
              <TextField defaultValue={formData && formData.minX} name="minX" onChange={(e)=> onChange(e)}i d="min_x" label="Min X" type="number" fullWidth margin="normal" /> <br/>
              <TextField defaultValue={formData && formData.maxY} name="maxY" onChange={(e)=> onChange(e)} id="max_y" label="Max Y" type="number" fullWidth margin="normal" /> <br/>
              <TextField defaultValue={formData && formData.minY} name="minY" onChange={(e)=> onChange(e)} id="min_y" label="Min Y" type="number" fullWidth margin="normal" /> <br/>
              <TextField defaultValue={formData && formData.maxZ} name="maxZ" onChange={(e)=> onChange(e)} id="max_z" label="Max Z" type="number" fullWidth margin="normal" /> <br/>
              <TextField defaultValue={formData && formData.minZ} name="minZ" onChange={(e)=> onChange(e)} id="min_z" label="Min Z" type="number" fullWidth margin="normal" /> 
            </Grid>
          </Grid>
        </form>
    )
}


// Main component
export default function TaskOne(props) {
  //Step one fields value
  const formDefaultData = {
    "pName": "",
    "pDescription": "",
    "client":"",
    "contractor":"",
    "maxY": 0,
    "minX": 0,
    "maxY": 0,
    "minY": 0,
    "maxZ": 0,
    "minZ": 0
  };

  let instance = this;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formData, setFormData] = React.useState(formDefaultData);

  const steps = getSteps();


  //Start events methods
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;

      if (activeStep === steps.length - 1) {
          let getLocalData = localStorage.getItem("collection"),
              dataList = getLocalData? JSON.parse(getLocalData):[];
          
          formData['id'] = getRandomId();
          if(formData) dataList.push(formData);
          localStorage.setItem("collection", JSON.stringify(dataList));
      }

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const tryAnotherOneEvent = () => {
    setActiveStep(0);
    setFormData(formDefaultData);
  };

  const gotoTaskTwo = (e) => {
    const {changeTask} = props;
    changeTask(e, 2);
  };

  const dropCallbackEvent = ({data, isSuccess}:cbData) => {
      setFileData(formData, data, (result)=>{
         setFormData(result);
      });

    if(isSuccess) handleSkip();
  };


  const textFieldChangeEvent = (event) => {
    let fieldName = event.target.name,
        value = event.target.value;

    formData[fieldName] = value;
    setFormData(formData);
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <h2 className={classes.successfulyMessage}>
                Successfuly submitted!
              </h2>

              <Button onClick={tryAnotherOneEvent} className={classes.button}  style={{float:'right'}}
                    variant="contained"
                      color="primary">
                Try another one
              </Button>

              <Button className={classes.button}  style={{float:'right'}}
                    variant="contained"
                      color="primary"
                      onClick={(e)=> gotoTaskTwo(e)}>
                Go to Task 2
              </Button>
            </div>
          ) : (
            <div>
              <div>
              
                {getStepContent({step:activeStep, dropCallbackEvent, textFieldChangeEvent, formData})}

              </div>
              <div style={{textAlign: 'right', marginRight: 20}}>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button} style={{float:'left', marginLeft:20}}>
                  Back
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}

                {
                  activeStep === steps.length - 2? null:(
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  )
                }                
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>  
  );
};

