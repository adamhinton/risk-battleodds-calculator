import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import styled from "styled-components";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { spacing } from "../utils/styles";

type HeaderProps = {
	isDark: boolean;
	setIsDark: Function;
};

const Header = (headerProps: HeaderProps) => {
	const { isDark, setIsDark } = headerProps;

	return (
		<StyledAppBar position="static">
			<Typography variant="h4" component="h1" data-testid="title">
				Risk Battleodds Calculator
			</Typography>
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
			<Typography>
				For the classic board game <b>RISK</b>
			</Typography>
			<StyledAuthorAndDarkModeBtn>
				<Typography variant="h6" component="h2" data-testid="author">
					Author: Adam Hinton
				</Typography>
				{DarkModeToggleButton(isDark, setIsDark)}
			</StyledAuthorAndDarkModeBtn>
		</StyledAppBar>
	);
};

export default Header;
const StyledAppBar = styled(AppBar)`
	&& {
		background-color: ${({ theme }) => theme.customTheming.formAndInputsBGC};
		color: ${({ theme }) => theme.customTheming.formTextColor};
		padding: ${spacing.paddingMedium};
		width: 100%; /* Adjust the width as needed */
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		transition: background-color 0.3s, color 0.3s;
		top: 0;
		z-index: 100;
	}
`;

const StyledLinkContainer = styled("div")`
	margin-right: 20px;
	display: flex;
	gap: 20px;
	@media (max-width: 950px) {
		margin-top: 15px;
	}
	margin-bottom: 10px;
`;

const StyledAuthorAndDarkModeBtn = styled("div")`
	display: flex;
	align-items: center;
	gap: 20px;
	margin-top: 15px;
	@media (max-width: 950px) {
		margin-top: 5px;
	}
`;

const StyledLink = styled(Link)`
	&& {
		color: ${({ theme }) => theme.customTheming.formTextColor};
		text-decoration: underline;
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
