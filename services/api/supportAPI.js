import { getApiNoAuth } from "../genericServices";

export async function getSupportData() {
    return await getApiNoAuth('support')
}