const axios = require('axios')
import { apiKey, appId } from '../../env'

export const signUp = async (mEmail, mPassword, name) => {
    const res = await axios.post("https://parseapi.back4app.com/users", {
        "username": mEmail,
        "password": mPassword,
        "name" : name
    }, {
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-REST-API-Key': apiKey
        }
    }).catch((err) => {
        console.log(err.response.data)
    })
    console.log(res.data)
    if (res.status == 201) {
        return {
            success: true,
            message: "User created successfully",
            user : {
                objectId : res.data.objectId,
                name: name,
                email: mEmail,
                sessionToken: res.data.sessionToken
            }
        }
    } else {
        return {
            success: false,
            message: "Error"
        }
    }
    
}