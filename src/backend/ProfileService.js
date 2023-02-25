import {API} from "aws-amplify";

const profileApiName = 'ProfileApi'
const profilePath = '/profile'
let profile = null
export class ProfileService {

    constructor() {

    }
    async fetchProfile() {
        const data = {}
        const profiles = await API.get(profileApiName, profilePath, data)
        profile = (profiles[0] ? profiles[0] : null)
        return profile
    }

    async createProfile(profileData) {
        const data = {
            body: profileData,
        }
        const res = await API.post(profileApiName, profilePath, data)
        profile = (res ? res : null)
        return res
    }

    async updateProfile(profileData) {
        const data = {
            body: profileData,
        }
        const res = await API.put(profileApiName, profilePath, data)
        profile = res
        return res
    }

    clearProfile() {
        profile = null
    }
    getProfile() {
        return profile
    }

    changeAndVerifyPhone(props) {

    }
}