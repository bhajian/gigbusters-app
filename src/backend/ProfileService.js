import {API, Auth, Storage} from "aws-amplify";

const profileApiName = 'GigbusterApi'
const profilePath = '/profile'
const requestValidationPath = '/requestValidation'
const validatePath = '/validate'
const addProfilePhotoPath = '/photo'
const profileSettingsPath = '/setting'
const setPhotoLocationPath = '/location'
let profile = null
export class ProfileService {

    constructor() {

    }
    async fetchProfile(params) {
        const currentUser = await Auth.currentAuthenticatedUser()
        const userId = currentUser.sub
        const path = `${profilePath}/${userId}`
        const data = {}
        profile = await API.get(profileApiName, path, data)
        if(profile && profile.photos){
            const mainPhotos = profile.photos
                .filter((item) => item.type === 'main')
            if(mainPhotos && mainPhotos.length > 0){
                const mainPhoto = mainPhotos[0]
                profile.mainPhotoUrl = await this.getProfileMainPhoto(mainPhoto)
            }
        }
        return profile
    }

    async listProfiles(params) {
        const data = {
            queryStringParameters: {
                prefix: params.prefix,
                limit: params.limit,
                lastEvaluatedCategory: params.lastEvaluatedCategory
            }
        }
        const profiles = await API.get(profileApiName, profilePath, data)
        for(let i=0; i< profiles.length; i++){
            const profile = profiles[i]
            if(profile && profile.photos){
                const mainPhotos = profile.photos
                    .filter((item) => item.type === 'main')
                if(mainPhotos && mainPhotos.length > 0){
                    const mainPhoto = mainPhotos[0]
                    profile.mainPhotoUrl = await this.getProfileMainPhoto(mainPhoto)
                }
            }
        }
        return profiles
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

    async getProfileMainPhoto(photo) {
        try{
            const key = photo.key
            const bucket = photo.bucket
            const identityId = photo.identityId
            const signedURL = await Storage.get(key, {
                bucket: bucket,
                level: 'protected',
                identityId: identityId,
                expires: 60 * 60 * 12,
            })
            return signedURL
        } catch (e) {
            console.log(e)
        }
        return undefined
    }

    async changeAndRequestPhoneValidation(props) {
        const data = {
            body: props,
        }
        const path = profilePath+'/'+profile.userId+requestValidationPath
        const res = await API.post(profileApiName, path , data)
        profile = (res ? res : null)
        return res
    }

    async validatePhone(props) {
        const data = {
            body: props,
        }
        const path = profilePath+'/'+profile.userId+validatePath
        const res = await API.post(profileApiName, path , data)
        profile = (res ? res : null)
        return res
    }

    async setProfilePhoto(props) {
        const data = {
            body: props,
        }
        const path = profilePath + '/' + profile.userId + addProfilePhotoPath
        const res = await API.put(profileApiName, path , data)
        profile.photos = [res]
        return res
    }

    async getProfileSettings(props) {
        const data = {
            body: props,
        }
        const path = profilePath + '/' + profile.userId + profileSettingsPath
        const res = await API.get(profileApiName, path , data)
        profile.settings = res
        return res
    }

    async setProfileSettings(props) {
        const data = {
            body: props,
        }
        const path = profilePath + '/' + profile.userId + profileSettingsPath
        const res = await API.put(profileApiName, path , data)
        profile.settings = res
        return res
    }

    async deactivateProfile(props) {
        const data = {
        }
        const path = profilePath + '/' + profile.userId
        const res = await API.del(profileApiName, path , data)
        profile.settings = res
        return res
    }

    async changeUserLocation(props) {
        const data = {
            body: props,
        }
        const path = profilePath + '/' + profile.userId + setPhotoLocationPath
        const res = await API.put(profileApiName, path , data)
        profile.location = props
        return res
    }
}