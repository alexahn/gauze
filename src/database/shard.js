function bigIntToUUID(bigInt) {
	// Convert BigInt to hex and pad to 32 characters (128 bits)
	let hex = bigInt.toString(16).padStart(32, "0");

	// Insert hyphens at 8-4-4-4-12 positions
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function UUIDToBigInt(uuid) {
	const bigIntValue = BigInt("0x" + uuid.replace(/-/g, ""));
	return bigIntValue;
}

const maxInt = UUIDToBigInt("ffffffff-ffff-ffff-ffff-ffffffffffff");
const maxString = bigIntToUUID(maxInt);
console.log("maxInt", maxInt);
console.log("maxString", maxString);
console.log(maxInt === 340282366920938463463374607431768211455n);

console.log(maxInt / 2n);
console.log(bigIntToUUID(maxInt / 2n));

console.log(maxInt / 2n - 1n);
console.log(bigIntToUUID(maxInt / 2n - 1n));

//[0, 340282366920938463463374607431768211455n]
function split(ranges) {
	return ranges
		.map(function (range) {
			const first_end = range[0] + (range[1] - range[0]) / 2n - 1n;
			const second_start = range[0] + (range[1] - range[0]) / 2n;
			return [
				[range[0], first_end],
				[second_start, range[1]],
			];
		})
		.flat();
}

// spliting on ordered_test_ranges and ordering again will return the ranges in the order when the config file is incremented by splitting half the existing nodes at each step
function order_ranges(ranges) {
	const even = ranges.filter(function (range, idx) {
		return idx % 2 === 0;
	});
	const odd = ranges.filter(function (range, idx) {
		return idx % 2 === 1;
	});
	return even.concat(odd);
}

const test_ranges = split(split([[0n, 340282366920938463463374607431768211455n]]));
const ordered_test_ranges = order_ranges(test_ranges);
console.log("test_ranges", ordered_test_ranges);

const test_ranges2 = split(ordered_test_ranges);
const ordered_test_ranges2 = order_ranges(test_ranges2);
console.log("test_ranges2", ordered_test_ranges2);

//console.log(split([[0n, 340282366920938463463374607431768211455n]]))
//console.log(split(split([[0n, 340282366920938463463374607431768211455n]])))
