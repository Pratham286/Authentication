import React from "react";
import { Box, Typography } from "@mui/material";

function Header() {
  return (
    <Box
      component="header"
      sx={{
        py: 2,
        textAlign: 'center',
        backgroundColor: '#1976d2',
        borderBottom: '1px solid #1565c0',
        color: '#fff' // Applies to children by default
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ color: "#fff" }}>
        Authorization Site
      </Typography>
    </Box>
  );
}

export default Header;
