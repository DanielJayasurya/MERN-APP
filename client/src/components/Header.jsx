import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { FaTasks } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Header = ({ title, darkMode, handleToggleTheme }) => {
  return (
    <Grid
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#72bdd4",
        color: "white",
        gap: "1%",
        justifyContent:'space-between'
      }}
    >
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'flex-start',gap:'1rem'}}>
      <FaTasks size={25} style={{ marginLeft: "1.5rem" }} />
      <Typography sx={{ fontSize: 25, fontFamily: "Poppins", fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
      <Box
        onClick={handleToggleTheme}
        sx={{ display: "flex", alignItems: "center" }}
        mr={2}
      >
        {darkMode === false ? (
          <MdDarkMode size={25} />
        ) : (
          <MdLightMode size={25} />
        )}
      </Box>
    </Grid>
  );
};

export default Header;
