import { RESTDataSource } from "apollo-datasource-rest";
import camelCaseKeys from "camelcase-keys";

const API_URL = "https://api.chucknorris.io/";

export class ChuckAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_URL;
  }

  async getAllCategories() {
    const data = await this.get(`jokes/categories`);

    return camelCaseKeys(data, { deep: true });
  }

  async getCategoryJoke(category: string) {
    const data = await this.get("jokes/random", { q: category });

    return camelCaseKeys(data, { deep: true });
  }

  async getQueryJoke(query: string) {
    const data = await this.get("jokes/search", { query: query });

    return camelCaseKeys(data.result, { deep: true });
  }

  async getCountJokes() {
    const data = await this.get("jokes/search", { query: "Chuck" });

    return camelCaseKeys(data.result.length, { deep: true });
  }

  async getJokeById(id: string) {
    const data = await this.get(`jokes/${id}`);

    return camelCaseKeys(data, { deep: true });
  }
}

export const dataSources = () => ({
  chuckApi: new ChuckAPI(),
});
