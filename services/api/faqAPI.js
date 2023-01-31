import { getApiNoAuth } from "../genericServices";

export async function getFAQs() {
    return await getApiNoAuth('faq')
}