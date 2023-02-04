import { postApiNoAuth } from "../genericServices";
import { getCookie } from "cookies-next";

export async function updateAuthTokenApi(){
    return await postApiNoAuth('updateAuthToken', {
        "refreshToken": getCookie('onlusRefreshToken')
    })
}

