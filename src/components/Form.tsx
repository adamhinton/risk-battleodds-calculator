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
import { spacing, typography } from "../utils/styles";
import { useTheme } from "@mui/material/styles";

type FormProps = {
	setResults: Function;
};

type FormValues = {
	attackerCount: number;
	defenderCount: string;
	numSimulations: number;
	stopAt: number;
};

const Form = (formProps: FormProps) => {
	const { setResults } = formProps;
	const [formValues, setFormValues] = useState<FormValues>({
		attackerCount: 10,
		defenderCount: "10",
		numSimulations: 5,
		stopAt: 2,
	});
	const theme = useTheme();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const { attackerCount, defenderCount, numSimulations, stopAt } = formValues;

		if (!attackerCount || !defenderCount || !numSimulations || !stopAt) {
			toast.error("Please fill in all fields");
			return;
		}

		const parsedDefenderCount = parseInt(defenderCount);

		if (isNaN(parsedDefenderCount)) {
			toast.error("Please enter a valid number for defenders");
			return;
		}

		const userInputs: UserInputs = {
			attackerCount: attackerCount,
			defenderCount: [parsedDefenderCount],
			numSimulations: numSimulations,
			stopAt: stopAt,
		};

		const results = generateResults(userInputs);
		setResults(results);
	};

	const marks = [
		{
			value: 1,
			label: "100",
		},
		{
			value: 2,
			label: "1,000",
		},
		{
			value: 3,
			label: "10,000",
		},
		{
			value: 4,
			label: "100,000",
		},
		{
			value: 5,
			label: "1,000,000",
		},
	];

	const calculateValue = (value: number) => {
		return Math.pow(10, value + 1);
	};

	return (
		<StyledForm onSubmit={handleSubmit} data-testid="form">
			<StyledHeader>
				<StyledHeaderText style={{ ...typography.h2 }}>
					Battle Simulation
				</StyledHeaderText>
			</StyledHeader>
			<StyledInputAndLabel>
				<InputLabel htmlFor="attacker-count" style={{ ...typography.body }}>
					Attackers:
				</InputLabel>
				<StyledInput
					id="attacker-count"
					type="number"
					inputComponent="input"
					inputProps={{ min: "0" }}
					name="attackerCount"
					value={formValues.attackerCount}
					onChange={handleChange}
					data-testid="attacker-count-input"
				/>
			</StyledInputAndLabel>

			<StyledInputAndLabel>
				<InputLabel htmlFor="defender-count" style={{ ...typography.body }}>
					Defenders:
				</InputLabel>
				<StyledWiderInput
					id="defender-count"
					type="text"
					inputComponent="input"
					name="defenderCount"
					value={formValues.defenderCount}
					onChange={handleChange}
					data-testid="defender-count-input"
				/>
			</StyledInputAndLabel>

			<StyledInputAndLabel>
				<InputLabel htmlFor="stop-at" style={{ ...typography.body }}>
					Stop At:
				</InputLabel>
				<Tooltip title="Stop when you have this many attackers left. If unsure, input 2.">
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
				<InputLabel htmlFor="simulations" style={{ ...typography.body }}>
					Number of Simulations:
				</InputLabel>
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
	background-color: ${({ theme }) => theme.customTheming.formAndInputsBGC};
	color: ${({ theme }) => theme.customTheming.formTextColor};
	padding: ${spacing.paddingMedium};
	width: 100%;
	max-width: 500px;
	border-radius: 10px;
	margin-bottom: 20px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	flex: 1;
	min-width: 300px;

	@media (max-width: 768px) {
		padding: ${spacing.paddingSmall};
		margin-bottom: ${spacing.marginSmall};
	}
`;

const StyledHeader = styled.div`
	margin-bottom: ${spacing.marginSmall};
	color: ${({ theme }) => theme.customTheming.formTextColor};
`;

const StyledHeaderText = styled.h2`
	margin: 5px;
`;

const StyledInputAndLabel = styled("div")`
	margin: ${spacing.marginSmall} 0;
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
	box-sizing: border-box;

	@media (max-width: 600px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const StyledInput = styled(Input)`
	&& {
		padding-left: 3px;
		margin-left: 10px;
		background: white;
		color: ${({ theme }) => theme.customTheming.inputTextColor};
		width: 80px;
		box-sizing: border-box;
		@media (max-width: 600px) {
			margin-left: 0px;
			margin-top: 5px;
			width: 100%;
		}
	}
`;

const StyledWiderInput = styled(StyledInput)`
	&& {
		width: 120px;
		@media (max-width: 600px) {
			width: 100%;
		}
	}
`;

const StyledNarrowerInput = styled(StyledInput)`
	&& {
		width: 60px;
		@media (max-width: 600px) {
			width: 100%;
		}
	}
`;

const StyledSliderContainer = styled.div`
	margin-top: ${spacing.marginMedium};
	width: 100%;
`;

const StyledSlider = styled(Slider)`
	&& {
		width: 100%;
	}
`;

const StyledButton = styled(Button)`
	margin-top: ${spacing.marginMedium};
	color: white;
	background-color: ${({ theme }) => theme.customTheming.accentColor};
	&:hover {
		background-color: ${({ theme }) => theme.customTheming.accentColor};
		opacity: 0.8;
	}
`;
