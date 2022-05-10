const axios = require('axios')
import { apiKey, appId } from '../../env'

export const GetListing = async (filter) => {
    const res = await axios.post("https://parseapi.back4app.com/parse/functions/v1_getListings", {}, {
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-REST-API-Key': apiKey
        }
    }).catch((err) => {
        console.log(err)
    })
    if (res.status == 200) {
        return {
            success: true,
            message: "Listings fetched",
            listings : res.data.result.listings
        }
    } else {
        console.log("error")
        return {
            success: false,
            message: "Error"
        }
    }
    
}