import { getApiNoAuth } from "../genericServices";

export async function getAbout() {
    return await getApiNoAuth('about')
}