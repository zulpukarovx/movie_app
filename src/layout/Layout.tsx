import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "../App.css";
import { Box, Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Header />
      <Box component="main">
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
