/**
 * https://leetcode.com/problems/palindrome-number/
 */

const text = document.getElementById("text");

const x = 121;

const palindrome = (x) => {
	const xAsArray = Array.from(JSON.stringify(x));
	let xAsArrayReversed = [...xAsArray].reverse();
	if (xAsArray.join() === xAsArrayReversed.join()) {
		return true;
	}
	return false;
};

text.innerText = palindrome(x);
