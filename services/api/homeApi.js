import { getApiNoAuth } from "../genericServices";

export async function getHome() {
  return await getApiNoAuth("home");
}
