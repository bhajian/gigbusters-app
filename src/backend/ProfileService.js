import {API} from "aws-amplify";

const profileApiName = 'ProfileApi'
const profilePath = '/profile'
const requestValidationPath = '/requestValidation'
const validatePath = '/validate'
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

    async changeAndRequestPhoneValidation(props) {
        const data = {
            body: props,
        }
        const path = profilePath+'/'+profile.accountId+requestValidationPath
        console.log(path)
        const res = await API.post(profileApiName, path , data)
        profile = (res ? res : null)
        return res
    }

    async validatePhone(props) {
        const data = {
            body: props,
        }
        const path = profilePath+'/'+profile.accountId+validatePath
        console.log(path)
        const res = await API.post(profileApiName, path , data)
        profile = (res ? res : null)
        return res
    }
}