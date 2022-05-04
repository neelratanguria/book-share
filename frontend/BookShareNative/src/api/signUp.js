const axios = require('axios')
import { apiKey, appId } from '../../env'

export const signUp = async (mEmail, mPassword) => {
    const res = await axios.post("https://parseapi.back4app.com/users", {
        "username": mEmail,
        "password": mPassword
    }, {
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-REST-API-Key': apiKey
        }
    })

    if (res.status == 201) {
        return {
            success: true,
            message: "User created successfully",
            sessionToken: res.data.sessionToken
        }
    } else {
        return {
            success: false,
            message: "Error"
        }
    }
    
}