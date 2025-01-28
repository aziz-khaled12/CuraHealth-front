import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import PatientInfo from './PatientInfo';
import StepperForm from './StepperForm';
import Facturation from './Facturation';
import { addSession } from '../../redux/patientsSlice';
import { Button, Tab } from '@mui/material';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const SessionTabs = ({ session, onClose }) => {
    const [innerTabValue, setInnerTabValue] = useState(0);
    const dispatch = useDispatch();
    
    const handleInnerTabChange = (event, newValue) => {
      setInnerTabValue(newValue);
    };
  
    const innerTabs = [
      {
        id: 0,
        title: "Patient Info",
        component: <PatientInfo patientId={session.patientId} />,
      },
      {
        id: 1,
        title: "Appointment",
        component: (
          <StepperForm
            formData={session.formData}
            setFormData={session.setFormData}
          />
        ),
      },
      {
        id: 2,
        title: "Facturation",
        component: <Facturation />,
      },
    ];
  
    const onSave = () => {
      const patientId = session.patientId;
      const sessionData = {
        id: session.id,
        patientName: session.patientName,
        startedAt: session.startedAt,
        finishedAt: new Date().toLocaleString(),
        category: session.category,
        details: session.formData, // Include the form data
      };
  
      dispatch(addSession({ patientId, session: sessionData })); // Dispatch the action
      console.log("Session saved:", sessionData);
    };
  
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 p-4 bg-gray-50">
          <div>
            <h2 className="text-xl font-semibold">{session.patientName}</h2>
            <p className="text-gray-600">Started: {session.startedAt}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              onClick={onClose}
              startIcon={<IoMdClose size={16} />}
            >
              Close Session
            </Button>
            <Button
              variant="contained"
              onClick={onSave}
              startIcon={<IoMdCheckmark size={16} />}
            >
              Save Session
            </Button>
          </div>
        </div>
  
        <Box sx={{ width: "100%" }}>
          <TabContext value={innerTabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleInnerTabChange}>
                {innerTabs.map((tab) => (
                  <Tab
                    key={tab.id}
                    label={tab.title}
                    value={tab.id}
                    sx={{ textTransform: "none" }}
                  />
                ))}
              </TabList>
            </Box>
            {innerTabs.map((tab) => (
              <TabPanel key={tab.id} value={tab.id}>
                {tab.component}
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      </div>
    );
  };

export default SessionTabs