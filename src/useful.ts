import CryptoJS from 'crypto-js';
export const positiveModulo = (n: number, m: number) => {
	const mod = n % m;
	return mod < 0 ? mod + m : mod;
}
export function hashString(input: string): string {
	const hashedString = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
	return hashedString;
}

export const regexName = /^[a-zA-ZÀ-ÖØ-öø-ÿ-']{3,20}$/;
export const regexCardNumber = /^\d{4} \d{4} \d{4} \d{4}$/;


