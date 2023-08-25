import { useState } from "react";
import generateResults, { Results } from "../utils/generateResults";
import { UserInputs } from "../utils/generateResults";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { InputLabel } from "@mui/material";
import Slider from "@mui/material/Slider";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { spacing } from "../utils/styles";

type FormProps = {
	setResults: Function;
};

type FormValues = {
	attackerCount: number;
	defenderCount: string;
	numSimulations: number;
	stopAt: number;
};

const Form = (props: FormProps) => {
	const { setResults } = props;

	const [formValues, setFormValues] = useState<FormValues>({
		attackerCount: 10,
		defenderCount: "10",
		numSimulations: 5,
		stopAt: 3,
	});

	function handleChange(evt: Readonly<React.ChangeEvent<HTMLInputElement>>) {
		const { value } = evt.target;

		setFormValues({
			...formValues,
			[evt.target.name]:
				evt.target.name === "defenderCount"
					? String(value)
					: parseFloat(value.toString()),
		});
	}

	return (
		<StyledForm
			onSubmit={(e) => {
				e.preventDefault();

				const defenderValidationRegex = /^\s*\d+(\s*,\s*\d+)*\s*$/;
				if (!formValues.defenderCount.match(defenderValidationRegex)) {
					toast(
						"Invalid Defenders input. Please separate multiple defenders with commas, e.g., 10, 5, 5, 3"
					);
				} else if (formValues.stopAt >= formValues.attackerCount) {
					toast("Stop At must be less than Attackers");
				} else {
					const userInputs: UserInputs = {
						...formValues,
						defenderCount: formValues.defenderCount
							.split(",")
							.map((item) => Number(item)),
						numSimulations: calculateValue(formValues.numSimulations),
					};

					const results: Results = generateResults(userInputs);
					setResults(results);
				}
			}}
		>
			<StyledHeader>
				<h2>Inputs</h2>
			</StyledHeader>
			<StyledInputAndLabel>
				<InputLabel htmlFor="attackers">Attackers:</InputLabel>
				<Tooltip title="Number of attackers...">
					<QuestionMarkIcon />
				</Tooltip>
				<StyledInput
					id="attackers"
					type="number"
					inputComponent="input"
					inputProps={{ min: "1" }}
					name="attackerCount"
					value={formValues.attackerCount}
					onChange={handleChange}
					data-testid="attackers-input"
				/>
			</StyledInputAndLabel>

			<StyledInputAndLabel>
				<InputLabel htmlFor="defenders">Defenders:</InputLabel>
				<Tooltip title="Number of defenders...">
					<QuestionMarkIcon />
				</Tooltip>
				<StyledWiderInput
					id="defenders"
					type="text"
					inputProps={{ min: 1, max: 10000 }}
					name="defenderCount"
					value={formValues.defenderCount}
					onChange={handleChange}
					data-testid="defenders-input"
				/>
			</StyledInputAndLabel>

			<StyledInputAndLabel>
				<InputLabel htmlFor="stop-at">Stop At:</InputLabel>
				<Tooltip title="Stop when you have this number of attackers left...">
					<QuestionMarkIcon />
				</Tooltip>
				<StyledNarrowerInput
					id="stop-at"
					type="number"
					inputComponent="input"
					inputProps={{ min: "0" }}
					name="stopAt"
					value={formValues.stopAt}
					onChange={handleChange}
					data-testid="stop-at-input"
				/>
			</StyledInputAndLabel>

			<StyledSliderContainer>
				<InputLabel htmlFor="simulations">Number of Simulations:</InputLabel>
				<StyledSlider
					min={1}
					max={5}
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
				/>
			</StyledSliderContainer>

			<StyledButton type="submit" data-testid="submit-btn" variant="contained">
				Run Simulations
			</StyledButton>
			<ToastContainer />
		</StyledForm>
	);
};

export default Form;

const StyledForm = styled("form")`
	border: 1px solid blue;
	padding: 10px 50px 10px;
	text-align: center;
	background-color: ${({ theme }) => theme.customTheming.formAndInputsBGC};
	color: ${({ theme }) => theme.customTheming.formTextColor};
	padding: ${spacing.paddingMedium};
	width: 400px; /* Adjust the width as needed */
	h2,
	div,
	label,
	span {
		color: ${({ theme }) => theme.customTheming.formTextColor};
	}
	border-radius: 10px;
	margin-bottom: 20px;
`;

const StyledHeader = styled.div`
	margin-bottom: 20px;
	color: ${({ theme }) => theme.customTheming.formTextColor};
	font-size: 1.5rem;
`;

const StyledInputAndLabel = styled("div")`
	margin: 15px 0;
	display: flex;
	align-items: center;
`;

const StyledInput = styled(Input)`
	&& {
		margin-left: 10px;
		background: white;
		color: ${({ theme }) => theme.customTheming.inputTextColor};
		width: 80px;
	}
`;

const StyledWiderInput = styled(StyledInput)`
	&& {
		width: 120px; /* Adjust the width as needed */
	}
`;

const StyledNarrowerInput = styled(StyledInput)`
	&& {
		width: 60px; /* Adjust the width as needed */
	}
`;

const StyledSliderContainer = styled.div`
	margin-top: 20px;
`;

const StyledSlider = styled(Slider)`
	&& {
		width: 100%;
	}
`;

const StyledButton = styled(Button)`
	margin-top: 20px;
	color: white;
	background-color: ${({ theme }) => theme.customTheming.formTextColor};
	&:hover {
		background-color: ${({ theme }) => theme.customTheming.formTextColor};
	}
`;

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
	}
}

const marks = [1, 2, 3, 4, 5].map((value) => ({
	value,
	label: calculateValue(value),
}));
