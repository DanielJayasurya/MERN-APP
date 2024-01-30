import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../config";

const AddTask = ({darkMode}) => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/tasks`, { title });
      if (result) {
        setTasks([...tasks, result.data]);
        setTitle("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const result = await axios.post(`${BASE_URL}/tasks/${taskId}`);
      if (result) {
        setTasks();
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid
      sx={{ display: "flex", alignItems: "center", flexDirection: "column", bgcolor: darkMode ? "#121212" : "#ffffff",minHeight:"100vh"}}
      p={3}
    >
      <Grid style={{ display: "flex", alignItems: "center", gap: "2%" }}>
        <TextField
          size="small"
          label="Task Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ width: "25rem" }}
        />
        <IoAddCircle
          size={38}
          onClick={handleSubmit}
          style={{ color: "#72bdd4" }}
        />
      </Grid>

      <Grid>
        {tasks.map((task) => (
          <Box
            key={task._id}
            mt={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1%",
              height: "2.5rem",
              width: "27rem",
              backgroundColor: darkMode ? "#212121" : "#72bdd4",
              borderRadius: "2px",
              padding: "0px 10px 0px 10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "2%",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  sx={{ margin: 0, padding: 0 }}
                  control={
                    <Checkbox
                      checked={taskStatus}
                      onChange={() => setTaskStatus(!taskStatus)}
                      sx={{
                        margin: 0,
                        padding: 0,
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                     
                    />
                  }
                />
              </FormGroup>
              <Typography
                style={{
                  color: "white",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: 20,
                  textDecoration : taskStatus === true? "line-through": null,
                }}
              >
                {task.title}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MdOutlineCancel
                size={25}
                style={{
                  color: "white",
                }}
                onClick={() => handleDelete(task._id)}
              />
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default AddTask;
