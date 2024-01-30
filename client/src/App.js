import React,{ useState } from "react";
import {ThemeProvider, createTheme} from "@mui/material";
import './App.css';
import AddTask from './components/AddTask';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  return (
    <div className="App">
      <Header title="Task Manager" darkMode={darkMode} handleToggleTheme={handleToggleTheme} />
      <ThemeProvider theme={theme}>
      <AddTask darkMode={darkMode} />
      </ThemeProvider>
    </div>
  );
}

export default App;
