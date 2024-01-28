import RepositoryModel, { IRepository } from "./RepositoryModel";
export class RepositoryService {
	public static async GetRepositories() {
		const QueryResponse = await RepositoryModel.find();
		return QueryResponse;
	}

	public static async PostARepository(data: IRepository) {
		const { name, description, topics, url } = data;
		if (!name || !description || !topics || !url)
			throw new Error("Missing Information: " + data);
		const QueryResponse = RepositoryModel.create(data);
		return QueryResponse;
	}

	public static async DeleteARepository(name: string) {
		const Response = RepositoryModel.deleteOne({ name: name });
		return Response;
	}
}
