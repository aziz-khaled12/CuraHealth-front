import React, { useEffect, useState } from 'react'
import { fetchBloodTypes, fetchEtatCivil } from '../../redux/userDataSlice';

const ModifyModal = ({open, setOpen, prevData}) => {
  const dispatch = useDispatch();
  const { bloodTypes, etatsCivil } = useSelector((state) => state.userData);
  const genders = [
    { id: 1, name: "Male" },
    { id: 0, name: "Femal" },
  ];

  const [formData, setFormData] = useState({
    firstName: prevData.firstName,
    lastName: prevData.lastName,
    birthday: prevData.birthday,
    phoneNum: prevData.phoneNum,
    IDNum: prevData.IDNum, //National Identity card number
    email: prevData.email,
    bloodType: prevData.bloodType,
    etatCivil: prevData.etatCivil,
    sex: prevData.sex,
    address: prevData.address,
    city: prevData.city,
  });

  useEffect(() => {
    dispatch(fetchBloodTypes());
    dispatch(fetchEtatCivil());
  }, []);

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the field by name
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(addPatient({payload: formData}))
    handleClose()
  }

  return (
    <div>ModifyModal</div>
  )
}

export default ModifyModal