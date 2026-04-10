function bigIntToUUID(bigInt) {
  // Convert BigInt to hex and pad to 32 characters (128 bits)
  let hex = bigInt.toString(16).padStart(32, '0');
  
  // Insert hyphens at 8-4-4-4-12 positions
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function UUIDToBigInt(uuid) {
	const bigIntValue = BigInt("0x" + uuid.replace(/-/g, ""));
	return bigIntValue
}

const maxInt = UUIDToBigInt("ffffffff-ffff-ffff-ffff-ffffffffffff")
const maxString = bigIntToUUID(maxInt)
console.log('maxInt', maxInt)
console.log('maxString', maxString)
console.log(maxInt === 340282366920938463463374607431768211455n)

console.log(maxInt / 2n)
console.log(bigIntToUUID(maxInt / 2n))

console.log((maxInt / 2n) - 1n)
console.log(bigIntToUUID((maxInt / 2n) - 1n))
