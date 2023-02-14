import {API} from "aws-amplify";

const profileApiName = 'ProfileApi'
const profilePath = '/profile'
let profiles = []
export class ProfileService {

    // profiles = []
    constructor() {

    }
    async pullProfiles() {
        const data = {}
        profiles = await API.get(profileApiName, profilePath, data)
        return profiles
    }

    async createProfile(profile) {
        const data = {
            body: profile,
        }
        const res = await API.post(profileApiName, profilePath, data)
        profiles.push(res)
        return res
    }

    getProfiles() {
        return profiles
    }
}