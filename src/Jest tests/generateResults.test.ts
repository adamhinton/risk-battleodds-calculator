import { sortPlayerRolls } from "../utils/resultsCalculator";
import { AttackerRolls } from "../utils/resultsCalculator";

describe("[1] sortPlayerRolls", () => {
	test("[1] sortPlayerRolls sorts arrays of numbers (lengths 3, 2, or 1) in descending order", () => {
		const rollsThree: AttackerRolls = [3, 5, 1];
		const rollsTwo: AttackerRolls = [1, 5];
		const rollsOne: AttackerRolls = [1];

		const sortedRollsThree = sortPlayerRolls(rollsThree);
		const sortedRollsTwo = sortPlayerRolls(rollsTwo);
		const sortedRollsOne = sortPlayerRolls(rollsOne);

		expect(sortedRollsThree).toEqual([5, 3, 1]);
		expect(sortedRollsTwo).toEqual([5, 1]);
		expect(sortedRollsOne).toEqual([1]);
	});
});
