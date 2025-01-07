import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

const mockTheme = {
	customTheming: {
		formBGC: "your-color-here",
		formTextColor: "your-color-here",
	},
};

test("[1] Renders without errors", () => {
	render(
		<ThemeProvider theme={mockTheme}>
			<Header isDark={true} setIsDark={jest.fn()} />
		</ThemeProvider>
	);
});

test("[2] All elements show up as expected", () => {
	render(
		<ThemeProvider theme={mockTheme}>
			<Header isDark={true} setIsDark={jest.fn()} />
		</ThemeProvider>
	);
	const title = screen.getByTestId("title");
	const author = screen.getByTestId("author");
	const sourceLinks = screen.getByTestId("links");

	expect(title).toBeInTheDocument();
	expect(author).toBeInTheDocument();
	expect(sourceLinks).toBeInTheDocument();
});

test("[3] Matches snapshot from 3.17.23", () => {
	const tree = renderer
		.create(
			<ThemeProvider theme={mockTheme}>
				<Header isDark={true} setIsDark={jest.fn()} />
			</ThemeProvider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
