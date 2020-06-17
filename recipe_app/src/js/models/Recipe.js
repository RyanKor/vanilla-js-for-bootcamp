import axios from "axios";
import { key, proxy } from "../config";
export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      const res = await axios(
        `${proxy}http://food2for.com/api/get?key=${key}&rId=${this.id}`
      );
      console.log(res);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.incredients;
    } catch (error) {
      console.log(error);
      alert("Somthing went wrong :(");
    }
  }
  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }
  calcServings() {
    this.serving = 4;
  }
}
