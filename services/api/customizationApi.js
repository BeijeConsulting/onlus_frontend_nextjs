import { getApiNoAuth } from "../genericServices";

export async function getCustomization() {
    return await getApiNoAuth('customization')
}