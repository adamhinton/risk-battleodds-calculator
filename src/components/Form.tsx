import { useState } from "react";
import generateResults, { Results } from "../utils/resultsCalculator";
import { UserInputs } from "../utils/resultsCalculator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { InputLabel } from "@mui/material";
import Slider from "@mui/material/Slider";
import styled from "styled-components";
import FormLabel from "@mui/material/FormLabel";
// Thanks to this site for the toast help:
//www.magicbell.com/blog/react-toast-notifications-made-easy

type FormProps = {
	setResults: Function;
};

type FormValues = {
	attackerCount: number;
	defenderCount: string;
	numSimulations: number;
};

const Form = (props: FormProps) => {
	const { setResults } = props;

	const [formValues, setFormValues] = useState<FormValues>({
		attackerCount: 10,
		defenderCount: "10",
		// The number of simulations corresponds to the position on the slider. So the first position is 1 simulations, secondis 10, third is 100, all the way through #6 at 100,000 simulations.
		// So numSimulations: 5 means that there are 10,000 simulations by default unless the user changes it by adjusting the slider.
		// This is a little wonky, I'd like to refactor.
		numSimulations: 5,
	});

	function handleChange(evt: Readonly<React.ChangeEvent<HTMLInputElement>>) {
		const value = evt.target.value;
		setFormValues({
			...formValues,
			[evt.target.name]:
				evt.target.name === "defenderCount" ? value : Number(value),
		});
	}

	return (
		<StyledForm
			onSubmit={(e) => {
				e.preventDefault();

				const defenderValidationRegex = /^\s*\d+(\s*,\s*\d+)*\s*$/;
				// Check to make sure defender input is a list of integers
				if (!formValues.defenderCount.match(defenderValidationRegex)) {
					toast(
						"Invalid Defenders input. Please separate multiple defenders with commas, eg 10, 5, 5, 3"
					);
				} else {
					// Convert user's multiple defender inputs from a string to number[]
					const userInputs: UserInputs = {
						...formValues,
						defenderCount: formValues.defenderCount.split(",").map((item) => {
							return Number(item);
						}),
						numSimulations: calculateValue(formValues.numSimulations),
					};

					const results: Results = generateResults(userInputs);
					setResults(results);
				}
			}}
		>
			<FormLabel>
				<h2>Inputs</h2>
			</FormLabel>
			<StyledInputAndLabel>
				<InputLabel htmlFor="attackers">Attackers:</InputLabel>
				<StyledAttackerInput
					id="attackers"
					type="number"
					inputComponent="input"
					inputProps={{ min: "1" }}
					name="attackerCount"
					value={formValues.attackerCount}
					onChange={handleChange}
					data-testid="attackers-input"
				></StyledAttackerInput>
			</StyledInputAndLabel>

			<StyledInputAndLabel>
				<InputLabel htmlFor="defenders">Defenders:</InputLabel>
				<StyledInput
					id="defenders"
					type="text"
					inputProps={{ min: 1, max: 10000 }}
					name="defenderCount"
					value={formValues.defenderCount}
					onChange={handleChange}
					data-testid="defenders-input"
				></StyledInput>
			</StyledInputAndLabel>

			<div>
				<InputLabel htmlFor="simulations">Number of Simulations:</InputLabel>
				{/* slider component showing values 1, 10, 100, 1000, 10000, 100000 spaced evenly apart on the screen */}
				<StyledSlider
					min={1}
					max={6}
					name="numSimulations"
					marks={marks}
					defaultValue={5}
					scale={calculateValue}
					value={formValues.numSimulations}
					onChange={(event, value) => {
						setFormValues({
							...formValues,
							numSimulations: value as number,
						});
					}}
					data-testid="numsimulations-input"
					step={null}
					valueLabelDisplay="auto"
				></StyledSlider>
			</div>

			<Button type="submit" data-testid="submit-btn" variant="outlined">
				Run Simulations
			</Button>
			<ToastContainer />
		</StyledForm>
	);
};

export default Form;

const StyledForm = styled("form")`
	border: 1px solid blue;
	padding: 10px 50px 25px;
	text-align: center;
	background-color: ${({ theme }) => {
		return theme.customTheming.formAndInputsBGC;
	}};
	// TODO: This isn't giving me what I want in dark mode or light mode. Something is overriding it
	h2,
	div,
	label,
	span {
		color: ${({ theme }) => {
			return theme.customTheming.formTextColor;
		}};
	}
`;

const StyledInputAndLabel = styled("div")`
	margin: 15px;
	display: flex;
	align-items: center;
`;

const StyledInput = styled(Input)`
	&& {
		margin-left: 10px;
		background: white;
		color: ${({ theme }) => {
			return theme.customTheming.inputTextColor;
		}};
	}
`;

const StyledAttackerInput = styled(StyledInput)`
	&& {
		width: 70px;
	}
`;

const StyledSlider = styled(Slider)`
	&& {
		width: 350px;
	}
`;

// marks and calculateValues are utilities to make the Slider values space evenly
function calculateValue(value: number): any {
	switch (value) {
		case 1:
			return 1;
		case 2:
			return 10;
		case 3:
			return 100;
		case 4:
			return 1000;
		case 5:
			return 10000;
		case 6:
			return 100000;
	}
}

const marks = [1, 2, 3, 4, 5, 6].map((value) => ({
	value,
	label: calculateValue(value),
}));
