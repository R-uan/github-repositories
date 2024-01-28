import mongoose from "mongoose";

export interface IRepository {
	name: String;
	description: String;
	topics: [String];
	url: String;
}

const RepositorySchema = new mongoose.Schema({
	name: String,
	description: String,
	topics: [String],
	url: String,
});

export default mongoose.model("repository", RepositorySchema);
