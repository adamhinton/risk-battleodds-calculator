import {
	sortPlayerRolls,
	generatePlayerRolls,
	AttackerRolls,
} from "../utils/resultsCalculator";

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

	test("[2] sortPlayerRolls takes an array with multiple elements of the same value", () => {
		const rolls: AttackerRolls = [4, 4, 4];
		const sortedRolls = sortPlayerRolls(rolls);
		expect(sortedRolls).toEqual([4, 4, 4]);
	});
});

describe("[2] generatePlayerRolls", () => {
	test("[1] generatePlayerRolls returns array of sorted dice rolls, each number is between 1-6", () => {
		const rolls = generatePlayerRolls("attacker", 3);
		expect(rolls.length).toBe(3);
		expect(rolls[0]).toBeGreaterThanOrEqual(1);
		expect(rolls[0]).toBeLessThanOrEqual(6);
		expect(rolls[1]).toBeGreaterThanOrEqual(1);
		expect(rolls[1]).toBeLessThanOrEqual(6);
		expect(rolls[2]).toBeGreaterThanOrEqual(1);
		expect(rolls[2]).toBeLessThanOrEqual(6);
		expect(rolls[0]).toBeGreaterThanOrEqual(rolls[1]!);
		expect(rolls[1]).toBeGreaterThanOrEqual(rolls[2]!);
	});

	test("[2] Returns array of correct length for various attacker unit numbers", () => {
		const attackerRollLarge = generatePlayerRolls("attacker", 1500);
		expect(attackerRollLarge).toHaveLength(3);

		const attackerRollThree = generatePlayerRolls("attacker", 3);
		expect(attackerRollThree).toHaveLength(3);

		const attackerRollTwo = generatePlayerRolls("attacker", 2);
		expect(attackerRollTwo).toHaveLength(2);

		const attackerRollOne = generatePlayerRolls("attacker", 1);
		expect(attackerRollOne).toHaveLength(1);
	});

	test("[3] Returns array of correct length for various defender unit numbers", () => {
		const defenderRollLarge = generatePlayerRolls("defender", 1500);
		expect(defenderRollLarge).toHaveLength(2);

		const defenderRollThree = generatePlayerRolls("defender", 3);
		expect(defenderRollThree).toHaveLength(2);

		const defenderRollTwo = generatePlayerRolls("defender", 2);
		expect(defenderRollTwo).toHaveLength(2);

		const defenderRollOne = generatePlayerRolls("defender", 1);
		expect(defenderRollOne).toHaveLength(1);
	});
});
