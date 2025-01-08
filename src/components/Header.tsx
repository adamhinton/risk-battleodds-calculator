import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import styled from "styled-components";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { spacing, typography } from "../utils/styles";
import { useTheme } from "@mui/material/styles";

type HeaderProps = {
	isDark: boolean;
	setIsDark: Function;
};

const Header = (headerProps: HeaderProps) => {
	const { isDark, setIsDark } = headerProps;
	const theme = useTheme();

	return (
		<StyledAppBar position="static">
			<Typography
				variant="h4"
				component="h1"
				data-testid="title"
				style={{ ...typography.h4 }}
			>
				<div>
					Risk Battleodds Calculator <Logo src="/risk-favicon.png" />
				</div>
			</Typography>
			<StyledLinkContainer data-testid="links">
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
			<Typography style={{ fontSize: "0.8rem" }}>
				For the classic board game <b>RISK</b>
			</Typography>
			<StyledAuthorAndDarkModeBtn>
				<Typography
					variant="h6"
					component="h2"
					data-testid="author"
					style={{ ...typography.h6 }}
				>
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
		background: ${({ theme }) => theme.customTheming.headerBGC};
		color: ${({ theme }) => theme.customTheming.headerTextColor};
		padding: ${spacing.paddingSmall};
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		transition: background 0.3s, color 0.3s;
		top: 0;
		z-index: 100;
		position: sticky;

		@media (max-width: 950px) {
			flex-direction: column;
			align-items: center;
			padding: ${spacing.paddingSmall};
		}
	}
`;

const StyledLinkContainer = styled("div")`
	margin-right: 20px;
	display: flex;
	gap: 20px;
	@media (max-width: 950px) {
		margin-top: 10px;
		margin-right: 0px;
		margin-bottom: 5px;
		flex-wrap: wrap;
		justify-content: center;
	}
`;

const StyledAuthorAndDarkModeBtn = styled("div")`
	display: flex;
	align-items: center;
	gap: 20px;
	margin-top: 10px;
	@media (max-width: 950px) {
		margin-top: 5px;
	}
`;

const StyledLink = styled(Link)`
	&& {
		color: ${({ theme }) => theme.customTheming.headerTextColor};
		text-decoration: none;
		transition: color 0.3s;
		border-bottom: 1px solid transparent;
		font-size: 0.9rem;
		&:hover {
			color: ${({ theme }) => theme.customTheming.accentColor};
			border-bottom: 1px solid ${({ theme }) => theme.customTheming.accentColor};
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
			style={{ cursor: "pointer" }}
		/>
	);
}

const Logo = styled.img`
	width: 50px;
	height: 50px;

	display: block;
	margin: 0 auto;
`;
