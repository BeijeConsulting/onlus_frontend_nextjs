import { getApi } from "../genericServices";

export async function getPersonalDatas(id) {
    return await getApi('user/' + id)
}