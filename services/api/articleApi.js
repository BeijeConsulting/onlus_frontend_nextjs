import { getApiNoAuth } from "../genericServices";

export async function getArticles() {
  return await getApiNoAuth("article/");
}

export async function getCategories() {
  return await getApiNoAuth("category");
}

export async function getArticlesFromCategory(category) {
  return await getApiNoAuth("article/articles_category/" + category);
}

export async function getSingleArticle(id) {
  return await getApiNoAuth("article/" + id);
}
