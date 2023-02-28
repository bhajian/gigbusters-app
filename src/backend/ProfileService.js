import {API} from "aws-amplify";

const profileApiName = 'ProfileApi'
const profilePath = '/profile'
const requestValidationPath = '/requestValidation'
const validatePath = '/validate'
const addProfilePhotoPath = '/photo'
const setPhotoLocationPath = '/location'
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
        const res = await API.post(profileApiName, path , data)
        profile = (res ? res : null)
        return res
    }

    async validatePhone(props) {
        const data = {
            body: props,
        }
        const path = profilePath+'/'+profile.accountId+validatePath
        const res = await API.post(profileApiName, path , data)
        profile = (res ? res : null)
        return res
    }

    async changeProfilePhoto(props) {
        const data = {
            body: props,
        }
        const path = profilePath + '/' + profile.accountId + addProfilePhotoPath
        const res = await API.put(profileApiName, path , data)
        profile.photos = [res]
        return res
    }

    async changeUserLocation(props) {
        const data = {
            body: props,
        }
        const path = profilePath + '/' + profile.accountId + setPhotoLocationPath
        const res = await API.put(profileApiName, path , data)
        profile.location = props
        return res
    }
}