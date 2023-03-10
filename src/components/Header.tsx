import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import styled from "styled-components";

const Header = () => {
  return (
    <StyledBox sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Typography variant="h4" component="h1">
          Risk Battleodds Calculator
        </Typography>
        <Typography variant="h6" component="h2">
          Author: Adam Hinton
        </Typography>
        <StyledToolBar>
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
        </StyledToolBar>
      </StyledAppBar>
    </StyledBox>
  );
};

export default Header;

const StyledBox = styled(Box)`
  && {
    width: 100%;
    max-width: 950px;
  }
`;

const StyledAppBar = styled(AppBar)`
  && {
    padding: 15px;
    display: flex;
    align-items: center;
  }
`;

const StyledToolBar = styled(Toolbar)`
  && {
    max-width: 300px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
    min-height: 30px;
  }
`;

const StyledLink = styled(Link)`
  && {
    color: white;
    margin: 0 10px;
  }
`;
