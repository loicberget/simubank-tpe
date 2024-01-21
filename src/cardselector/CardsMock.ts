export default interface Card {
	id: number,
	imgFileName: string,
	number: string,
	firstName: string,
	lastName: string,
	expirationDate: string,
	cvv: string,
	hashedCode: string
}