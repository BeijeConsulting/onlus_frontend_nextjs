import { getApi} from "../genericServices";


export async function getAllDonation() {
    return await getApi('donation/own')
}