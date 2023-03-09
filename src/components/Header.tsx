import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

import styled from "styled-components";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Typography variant="h4" component="h1">
          Risk Battleodds Calculator
        </Typography>
        <Typography variant="h6" component="h2">
          Author: Adam Hinton
        </Typography>
        <Toolbar>
          <StyledLink
            href="https://github.com/adamhinton/risk-battleodds-calculator"
            target="_blank"
          >
            Source Code
          </StyledLink>
          <StyledLink
            href="https://www.linkedin.com/in/adam-hinton/"
            target="_blank"
          >
            LinkedIn
          </StyledLink>
          <StyledLink href="https://www.google.com">Google</StyledLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

const StyledLink = styled(Link)`
  color: white;
`;
