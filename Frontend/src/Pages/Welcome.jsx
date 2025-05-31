import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Welcome() {
  // console.log(token);

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  // let data1 ;
  const [data, setData] =useState("No data");


  useEffect(() => {
    const apiData = async () => {
      const token = localStorage.getItem("token");
      const bearerToken = `Bearer ${token}`
      try {
        const response = await axios.get("http://localhost:3000/dashboard/secret-data", {
          headers: {
            Authorization: bearerToken,
          },
        });
        // data1 = response.data.data;

        // console.log(data1)
        // console.log(response.data.data);
        setData(response.data.data)
      } catch (error) {
        if (error.response) {
          console.error("Error:", error.response.data.message);
        } else {
          console.error("Error fetching data:", error.message);
        }
      }
    };
    apiData();
  }, []);
  // console.log(data);
  return (
    <Box>
      <Button onClick={handleClick} variant="contained" sx={{ margin: "5px" }}>
        Logout
      </Button>
      {/* {data[1]} */}
    <Typography>{data}</Typography>
    </Box>
  );
}
