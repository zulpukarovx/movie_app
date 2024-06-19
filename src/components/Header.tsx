import { NavLink } from "react-router-dom";
import { Box, Container } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const Header = () => {
  return (
    <Box className="header" component="header" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box
          component="nav"
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: 8,
            "& a": {
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "primary.main",
              },
            },
          }}
        >
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { filter: "drop-shadow(0 0 5px black)" } : undefined
            }
          >
            <HomeOutlinedIcon fontSize="large" />
          </NavLink>
          <NavLink to="/favorites" 
            style={({ isActive }) =>
              isActive ? { filter: "drop-shadow(0 0 5px black)" } : undefined
            }>
            <BookmarkBorderOutlinedIcon fontSize="large" />
          </NavLink>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
