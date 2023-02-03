import cache from "./cacheService";

const basePath = "https://swapi.dev/api/"

const jsonFetch = (url) => fetch(url).then(resp => resp.json());
const getPath = (url) => url.replace(basePath, "");

export const fetchCategorySearch = async function (path, query) {
  path = path + "/?search=" + query;
  return await jsonFetch(basePath + path);
}

export const fetchPaths = async function (path = "api/category") {
  return await cache.get(path) || await jsonFetch(basePath).then(data => cache.save(path, data));
}

export const fetchPathData = async function (path) {
  path = path.includes("https://") ? getPath(path) : path + "/";
  return cache.get(path) || await jsonFetch(basePath + path).then(data => cache.save(path, data));
}