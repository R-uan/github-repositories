import { RepositoryService } from "./database/RepositoryService";
import AuthenticationFilter from "./util/AuthenticationFilter";
import { IRepository } from "./database/RepositoryModel";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
config();

const MongoDBURI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const AllowedOrigin = process.env.FRONT_URL;
const ServerPort = 3001;
const App = express();

if (!AllowedOrigin) throw new Error("CORS Exception - No Origin Provided!");
App.use(cors({ origin: AllowedOrigin }));
App.use(express.json());

App.get("/api/repositories", async (Req: Request, Res: Response) => {
	try {
		const Response = await RepositoryService.GetRepositories();
		if (Response) return Res.json(Response).status(200);
		else return Res.json("response null or undefined").status(204);
	} catch (error) {
		return Res.json({ error: error }).status(500);
	}
});

App.post("/api/repositories", AuthenticationFilter, async (Req: Request, Res: Response) => {
	try {
		const RequestBody: IRepository = Req.body;
		const Response = await RepositoryService.PostARepository(RequestBody);
		if (Response) return Res.json(Response).status(200);
		else return Res.json("response null or undefined").status(204);
	} catch (error) {
		return Res.json({ error: error }).status(500);
	}
});

App.delete("/api/repositories/:name", AuthenticationFilter, async (Req: Request, Res: Response) => {
	const Response = RepositoryService.DeleteARepository(Req.params.name);
	return Res.json(Response);
});

async function DatabaseConnection() {
	console.log("Connected to HTTP Server");
	await mongoose.connect(MongoDBURI);
	console.log("Connected to Mongo Database");
}

App.listen(ServerPort, DatabaseConnection);
