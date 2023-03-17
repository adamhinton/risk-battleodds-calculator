import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

test("[1] Renders without errors", () => {
	render(<Header />);
});

test("[2] All elements show up as expected", () => {
	render(<Header />);
	const title = screen.getByTestId("title");
	const author = screen.getByTestId("author");
	const sourceLinks = screen.getByTestId("links");

	expect(title).toBeInTheDocument();
	expect(author).toBeInTheDocument();
	expect(sourceLinks).toBeInTheDocument();
});
