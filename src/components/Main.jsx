import React from "react";
import Appointments from "./Appointments";
import Dashboard from "./Dashboard";
import Patients from "./Patients";
import Rapports from "./Rapports";
import Facturation from "./Facturation";

const Main = ({ selected }) => {
  const renderContent = () => {
    switch (selected) {
      case 0:
        return <><Dashboard /></>;
      case 1:
        return (
          <>
            <Patients />
          </>
        );
      case 2:
        return <><Appointments /></>;
      case 3:
        return <><Rapports /></>;
      case 4:
        return <><Facturation /></>;
      default:
        return null;
    }
  };

  return (
    <div className="container w-full mt-5">
      {renderContent()}
    </div>
  );
};

export default Main;
