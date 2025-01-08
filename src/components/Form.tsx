import { useState } from "react";
import generateResults, { Results } from "../utils/generateResults";
import { UserInputs } from "../utils/generateResults";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, InputLabel, Checkbox, FormControlLabel } from "@mui/material";
import { Button } from "@mui/material";
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
		numSimulations: 10_000,
		stopAt: 3,
	});

	const [isCollapsed, setIsCollapsed] = useState(false);
	const [shouldCollapse, setShouldCollapse] = useState(true);

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
			isCollapsed
			onSubmit={(e) => {
				e.preventDefault();
				const defenderValidationRegex = /^\s*\d+(\s*,\s*\d+)*\s*$/;
				if (!formValues.defenderCount.match(defenderValidationRegex)) {
					toast(
						"Invalid Defenders input. Separate with commas (e.g., 10, 5, 5, 3)"
					);
				} else if (formValues.stopAt >= formValues.attackerCount) {
					toast("Stop At must be less than Attackers");
				} else {
					const userInputs: UserInputs = {
						...formValues,
						defenderCount: formValues.defenderCount
							.split(",")
							.map((item) => Number(item)),
						numSimulations: formValues.numSimulations,
					};

					const results: Results = generateResults(userInputs);
					setResults(results);

					if (shouldCollapse) {
						setIsCollapsed(true);
					}
				}
			}}
		>
			<StyledHeader>
				<h2>Battle Outcomes Calculator</h2>
			</StyledHeader>

			{!isCollapsed ? (
				<>
					<StyledInputGroup>
						<InputLabel htmlFor="attackers">Attacking Troops</InputLabel>
						<StyledInput
							id="attackers"
							type="number"
							name="attackerCount"
							value={formValues.attackerCount}
							onChange={handleChange}
						/>
					</StyledInputGroup>

					<StyledInputGroup>
						<InputLabel htmlFor="defenders">
							Defending Troops
							<Tooltip title="Comma-separated list of defenders (e.g., 10,5,5)">
								<QuestionMarkIcon />
							</Tooltip>
						</InputLabel>
						<StyledInput
							id="defenders"
							type="text"
							name="defenderCount"
							value={formValues.defenderCount}
							onChange={handleChange}
						/>
					</StyledInputGroup>

					<StyledInputGroup>
						<InputLabel htmlFor="stop-at">
							Stop At
							<Tooltip title="Stop at this number of attackers left">
								<QuestionMarkIcon />
							</Tooltip>
						</InputLabel>

						<StyledInput
							id="stop-at"
							type="number"
							name="stopAt"
							value={formValues.stopAt}
							onChange={handleChange}
						/>
					</StyledInputGroup>

					<StyledSliderGroup>
						<InputLabel htmlFor="simulations">
							Simulations
							<Tooltip title="Number of simulations to run (max 10k)">
								<QuestionMarkIcon />
							</Tooltip>
						</InputLabel>
						<StyledSlider
							min={1}
							max={10000}
							name="numSimulations"
							value={formValues.numSimulations}
							onChange={(event, value) =>
								setFormValues({
									...formValues,
									numSimulations: value as number,
								})
							}
							step={100}
							valueLabelDisplay="auto"
						/>
					</StyledSliderGroup>

					<StyledFormControlLabel
						control={
							<Checkbox
								checked={shouldCollapse}
								onChange={() => setShouldCollapse((prev) => !prev)}
								color="primary"
							/>
						}
						label="Hide form after running simulations"
					/>

					<StyledButton type="submit">Run Simulations</StyledButton>
				</>
			) : (
				// Show this if results are displaying
				// User can toggle off this collapse feature
				<CollapsedForm>
					<StyledButton onClick={() => setIsCollapsed(false)}>
						Expand Form
					</StyledButton>
				</CollapsedForm>
			)}

			<ToastContainer />
		</StyledForm>
	);
};

export default Form;

type StyledComponentFormProps = {
	isCollapsed: boolean;
};

const StyledForm = styled.form<StyledComponentFormProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.customTheming.formBGC};
	color: ${({ theme }) => theme.customTheming.formTextColor};
	width: 100%;
	max-width: 400px;
	padding: ${spacing.paddingSmall};
	border-radius: ${spacing.borderRadius};
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	gap: 12px;
`;

const StyledHeader = styled.div`
	font-size: 1.1rem;
	color: ${({ theme }) => theme.customTheming.formTextColor};
	text-align: center;
	height: 65px;
	@media (max-width: 320px) {
		font-size: 0.75rem;
	}
`;

const StyledInputGroup = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	label {
		font-size: 0.875rem;
		color: ${({ theme }) => theme.customTheming.formTextColor};
		font-weight: bold;
		display: flex;
		align-items: center;
	}
	> div {
		margin-top: 6px;
	}
`;

const StyledInput = styled(Input)`
	width: 80%;
	height: 35px;
	font-size: 0.875rem;
	padding: 6px 8px;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.customTheming.inputBGC};
	color: ${({ theme }) => theme.customTheming.inputTextColor + "!important"};
	border: 1px solid ${({ theme }) => theme.customTheming.accentColor};
	transition: border-color 0.2s ease;
	&:focus {
		border-color: ${({ theme }) => theme.customTheming.accentColor};
	}
`;

const StyledSliderGroup = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	label {
		font-size: 0.875rem;
		color: ${({ theme }) => theme.customTheming.formTextColor};
		font-weight: bold;
		display: flex;
		align-items: center;
	}
	> div {
		margin-top: 6px;
	}
`;

const StyledSlider = styled(Slider)`
	&& {
		width: 100%;
		color: ${({ theme }) => theme.customTheming.accentColor};
	}
`;

const StyledButton = styled(Button)`
	width: 100%;
	background-color: ${({ theme }) => theme.customTheming.accentColor};
	color: ${({ theme }) => theme.customTheming.formTextColor};
	padding: 8px 16px;
	font-size: 0.875rem;
	border-radius: 8px;
	font-weight: bold;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: ${({ theme }) => theme.customTheming.accentColor};
		transform: scale(1.05);
	}
`;

const StyledFormControlLabel = styled(FormControlLabel)`
	width: 100%;
`;

const CollapsedForm = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 75;
	padding: ${spacing.paddingSmall};
	background-color: ${({ theme }) => theme.customTheming.formBGC};
	color: ${({ theme }) => theme.customTheming.formTextColor};
	border-radius: ${spacing.borderRadius};
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	@media (max-width: 320px) {
		height: 20px;
	}
`;
