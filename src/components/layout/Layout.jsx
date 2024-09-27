import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Layout = () => {
  const [selected, setSelected] = useState(2);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="flex flex-grow w-full overflow-hidden">
        <div className="h-full flex-grow overflow-hidden">
          <Sidebar selected={selected} setSelected={setSelected} />
        </div>
        <div
          className={`flex-grow w-full bg-lightBg ${selected === 5 ? `p-0` : `p-8`} overflow-auto custom-scrollbar`}
        >
          <Main selected={selected} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
