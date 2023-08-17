import AppBar from "@mui/material/AppBar";
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
		<StyledAppBar position="static">
			<StyledToolBar>
				<Typography variant="h4" component="h1" data-testid="title">
					Risk Battleodds Calculator
				</Typography>
				<StyledAuthorAndDarkModeBtn>
					<Typography variant="h6" component="h2" data-testid="author">
						Author: Adam Hinton
					</Typography>
					{DarkModeToggleButton(isDark, setIsDark)}
				</StyledAuthorAndDarkModeBtn>
				<StyledLinkContainer>
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
				</StyledLinkContainer>
			</StyledToolBar>
			<Typography>
				For the classic board game <b>RISK</b>
			</Typography>
		</StyledAppBar>
	);
};

export default Header;
const StyledAppBar = styled(AppBar)`
	&& {
		background-color: ${({ theme }) => theme.customTheming.headerBGC};
		color: ${({ theme }) =>
			theme.customTheming.headerTextColor}; // Use the new text color
		padding: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		transition: background-color 0.3s, color 0.3s;
	}
`;

const StyledToolBar = styled(Toolbar)`
	&& {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: 950px;
		margin: 0 auto;
		@media (max-width: 950px) {
			flex-direction: column;
			align-items: center;
		}
	}
`;

const StyledLinkContainer = styled("div")`
	display: flex;
	gap: 20px;
	@media (max-width: 950px) {
		margin-top: 15px;
	}
`;

const StyledAuthorAndDarkModeBtn = styled("div")`
	display: flex;
	align-items: center;
	gap: 20px;
	@media (max-width: 950px) {
		margin-top: 15px;
	}
`;

const StyledLink = styled(Link)`
	&& {
		color: ${({ theme }) => theme.customTheming.formTextColor};
		text-decoration: none;
		transition: color 0.3s;
		&:hover {
			color: #1976d2;
		}
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
