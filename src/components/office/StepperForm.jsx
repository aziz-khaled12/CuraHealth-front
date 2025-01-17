import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Stack } from '@mui/material';
import GeneralSignsForm from './GeneralSignsForm';
import OrdonanceForm from './OrdonanceForm';
import TasksForm from './TasksForm';

const steps = ['General Information', 'Tasks','Ordonance'];

const StepperForm = ({ formData, setFormData}) => {
  const [activeStep, setActiveStep] = useState(0);
 

  // Function to handle navigating to a specific step by clicking on the label
  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (activeStep === steps.length - 1) {
      return; // No more steps to skip at the last step
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index} onClick={() => handleStepClick(index)} style={{ cursor: 'pointer' }}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className='min-h-[40vh] mt-8'>
        {activeStep === 0 && <GeneralSignsForm formData={formData} setFormData={setFormData} />}
        {activeStep === 1 && <TasksForm />}
        {activeStep === 2 && <OrdonanceForm formData={formData} setFormData={setFormData} />}
      </div>


    </div>
  );
};

export default StepperForm;
