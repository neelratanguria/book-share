const axios = require('axios')
import { apiKey, appId } from '../../env'

export const signIn = async (email, password) => {
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
            user: {
                sessionToken: res.data.sessionToken,
                email: res.data.username,
                objectId: res.data.objectId,
                name: res.data.name
            }
        }
    } else {
        return {
            success: false,
            message: "Error"
        }
    }
}