import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import styled from "styled-components";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

type HeaderProps = {
	isDark: boolean;
	setIsDark: Function;
};

const Header = (headerProps: HeaderProps) => {
	const { isDark, setIsDark } = headerProps;

	return (
		<StyledBox sx={{ flexGrow: 1 }}>
			<StyledAppBar position="static">
				<Typography variant="h4" component="h1" data-testid="title">
					Risk Battleodds Calculator
				</Typography>
				<StyledAuthorAndDarkModeBtn>
					<Typography variant="h6" component="h2" data-testid="author">
						Author: Adam Hinton
					</Typography>
					{DarkModeToggleButton(isDark, setIsDark)}
				</StyledAuthorAndDarkModeBtn>

				<StyledToolBar data-testid="links">
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
					<StyledLink href="https://www.dicebreaker.com/games/risk/how-to/how-to-play-risk-board-game#:~:text=In%20Risk%2C%20players%20are%20competing,attack%20and%20capture%20neighbouring%20territories">
						Risk Explained
					</StyledLink>
				</StyledToolBar>
				<Typography>
					For the classic board game <b>RISK</b>
				</Typography>
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
		background-color: rgb(46, 37, 37);
		color: rgb(221, 203, 203);
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

const StyledAuthorAndDarkModeBtn = styled("div")`
	&& {
		display: flex;
		flex-direction: row;

		h2 {
			margin-right: 20px;
		}
	}
`;

const StyledLink = styled(Link)`
	&& {
		color: white;
		margin: 0 10px;
	}
`;

function DarkModeToggleButton(isDark: boolean, setIsDark: Function) {
	const Component = isDark ? LightModeIcon : DarkModeIcon;

	return (
		<Component
			onClick={() => {
				setIsDark(!isDark);
			}}
		/>
	);
}
