import { jwtVerify } from 'jose';
import { JOSEError } from 'jose/errors';
import { UserClaims, UserClaimValidator } from '../types/config.js';

// Function to parse the JWT
async function ParseJwt(signedToken: string, secretKey: string) {
	try {
		const encodedSecretKey = new TextEncoder().encode(secretKey);
		const decoded = await jwtVerify<UserClaims>(signedToken, encodedSecretKey);
		const userClaim: UserClaims = {
			email: decoded.payload.email,
			username: decoded.payload.username,
			role: decoded.payload.role,
			id: decoded.payload.id,
			avatar: decoded.payload.avatar,
			group: decoded.payload.group,
			year: decoded.payload.year,
			exp: decoded.payload.exp,
		};
		try {
			UserClaimValidator.parse(userClaim);
		} catch (e) {
			throw new Error('Invalid Payload');
		}
		return decoded;
	} catch (err) {
		if (err instanceof JOSEError) {
			//@ts-ignore
			throw err;
		} else {
			console.error(`Invalid Payload: ${err}`);
			throw err;
		}
	}
}

// Function to validate the JWT and extract user details
export async function ValidateToken(signedToken: string, secretKey: string) {
	const decoded = await ParseJwt(signedToken, secretKey);

	const expTime = decoded.payload.exp;
	if (expTime < Date.now() / 1000) {
		return new Error('EXPIRED TOKEN');
	}

	return decoded.payload;
}
