import { getApiNoAuth } from "../genericServices";

export async function getSocial() {
  return await getApiNoAuth("social");
}
