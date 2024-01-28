import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
config();

const AdminUsername = process.env.ADMIN_USERNAME;
const AdminPassword = process.env.ADMIN_PASSWORD;

export default function AuthenticationFilter(Req: Request, Res: Response, Next: NextFunction) {
	const CredentialsHeader = Req.headers.authorization;
	if (CredentialsHeader) {
		const Credentials = CredentialsHeader.split(" ")[1];
		const DecodedCredentials = Buffer.from(Credentials, "base64").toString("utf-8").split(":");
		if (DecodedCredentials[0] === AdminUsername && DecodedCredentials[1] === AdminPassword) {
			Next();
		} else {
			Res.status(403).send("Invalid Credentials");
		}
	} else {
		Res.send("Provide credentials.").status(400);
	}
}
