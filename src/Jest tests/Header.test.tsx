import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import renderer from "react-test-renderer";

test("[1] Renders without errors", () => {
	render(<Header isDark={true} setIsDark={jest.fn()} />);
});

test("[2] All elements show up as expected", () => {
	render(<Header isDark={true} setIsDark={jest.fn()} />);
	const title = screen.getByTestId("title");
	const author = screen.getByTestId("author");
	const sourceLinks = screen.getByTestId("links");

	expect(title).toBeInTheDocument();
	expect(author).toBeInTheDocument();
	expect(sourceLinks).toBeInTheDocument();
});

test("[3] Matches snapshot from 3.17.23", () => {
	const tree = renderer
		.create(<Header isDark={true} setIsDark={jest.fn()} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
