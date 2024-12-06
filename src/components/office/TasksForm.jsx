import { Stack, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../../redux/tasksSlice";

const TasksForm = () => {
  const { factures } = useSelector((state) => state.factures);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  const handleChange = (id) => {
    if (tasks.includes(id)) {
      dispatch(deleteTask(id));
    } else {
      dispatch(addTask(id));
    }
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="rounded-lg p-8 border-2 border-solid border-lightText/20">
      <div className="text-2xl font-semibold mb-6">Additional Services</div>
      <Stack direction={"column"} gap={2}>
        {factures.map((facture) => {
          return (
            <div className="w-full flex items-center justify-between bg-white p-4 rounded-md shadow-lg border border-solid border-lightText/20">
              <div className="w-fit text-lg font-medium text-darkText">
                {facture.name}
              </div>
              <Switch checked={tasks.includes(facture.id)} onChange={(e) => handleChange(facture.id)}></Switch>
            </div>
          );
        })}
      </Stack>
    </div>
  );
};

export default TasksForm;
