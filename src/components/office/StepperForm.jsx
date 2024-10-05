import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Stack } from '@mui/material';
import GeneralSignsForm from './GeneralSignsForm';
import PhysicalSignsForm from './PhysicalSignsForm';
import ConsultationCauseForm from './ConsultationCauseForm';
import FunctionalSignsForm from './FunctionalSignsForm';
import OrdonanceForm from './OrdonanceForm';

const steps = ['General Signs', 'Other Signs', 'Consultation Cause', 'Ordonance'];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    bloodPressure: '',
    physicalSigns: '',
    consultationCause: '',
    functionalSigns: '',
    ordonance: [],
  });

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
        {activeStep === 1 && <Stack direction={"column"} gap={2}><PhysicalSignsForm formData={formData} setFormData={setFormData} /> <FunctionalSignsForm formData={formData} setFormData={setFormData} /> </Stack>  }
        {activeStep === 2 &&  <ConsultationCauseForm formData={formData} setFormData={setFormData} /> }
        {activeStep === 3 && <OrdonanceForm formData={formData} setFormData={setFormData} />}
      </div>

      <div style={{ marginTop: '20px' }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>

        {activeStep !== steps.length - 1 && (
          <Button onClick={handleSkip} sx={{ mx: 2 }}>
            Skip
          </Button>
        )}

        <Button variant="contained" onClick={handleNext} disabled={activeStep === steps.length - 1}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default StepperForm;
