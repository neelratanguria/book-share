const axios = require('axios')
import { apiKey, appId } from '../../env'

export const signIn = async (email, password) => {
    console.log(email, password, apiKey, appId)
    const res = await axios.get('https://parseapi.back4app.com/login', {
        params: {
            username: email,
            password: password
        }, headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-REST-API-Key': apiKey
        },
    });

    if (res.status == 200) {
        return {
            success: true,
            message: "User Signed In",
            sessionToken: res.data.sessionToken
        }
    } else {
        return {
            success: false,
            message: "Error"
        }
    }
}