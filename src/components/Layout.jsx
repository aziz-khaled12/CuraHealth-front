import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Layout = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full min-h-screen flex">
      <div className="h-full">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>
      <div className="flex flex-col flex-grow w-full overflow-hidden">
        <div className="w-full bg-lightBg">
          <Navbar />
        </div>
        <div className="flex-grow w-full bg-lightBg p-4 overflow-auto">
          <Main selected={selected} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
