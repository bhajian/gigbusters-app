import {API, Storage} from "aws-amplify";

const reviewApiName = 'GigbusterApi'
const reviewPath = '/review'
const complexReviewPath = '/complexReview'
const reviewablePath = '/reviewable'
const queryPath = '/query'
const photoPath = '/photo'
let reviews = null

export class ReviewService {

    constructor() {

    }
    async queryReviews(params) {
        const path = reviewPath + queryPath
        const data = {
            queryStringParameters: params
        }
        const reviews = await API.get(reviewApiName, path, data)
        return reviews
    }

    async createReview(review) {
        const path = reviewPath + complexReviewPath
        const data = {
            body: review,
        }
        const res = await API.post(reviewApiName, path, data)
        return res
    }

    async queryReviewables(params) {
        const path = reviewablePath + queryPath
        const data = {
            queryStringParameters: params
        }
        const reviewables = await API.get(reviewApiName, path, data)
        for(let i=0; i<reviewables.length; i++){
            if(reviewables[i].profilePhoto){
                reviewables[i].profilePhotoURL = await this.getMainPhoto(reviewables[i].profilePhoto)
            }
        }
        return reviewables
    }

    async getMainPhoto(params) {
        try {
            if (params) {
                const key = params.key
                const bucket = params.bucket
                const identityId = params.identityId
                const signedURL = await Storage.get(key, {
                    bucket: bucket,
                    level: 'protected',
                    identityId: identityId,
                    expires: 60 * 60 * 12
                })
                return signedURL
            } else{
                return undefined
            }
        } catch (e) {
            console.log(e)
        }
        return undefined
    }

    async addPhoto(params) {
        const path = `${reviewPath}/${params.reviewId}${photoPath}`
        const data = {
            body: params,
        }
        const res = await API.post(reviewApiName, path, data)
        await this.uploadPhoto({
            ...res,
            photo: params.photo
        })
        return res
    }

    async uploadPhoto(params) {
        try{
            const photoObj = await fetch(params.photo)
            const blob = await photoObj.blob()
            const key = params.key
            await Storage.put(key, blob, {
                bucket: params.bucket,
                level: 'protected',
                contentType: blob.type,
                progressCallback: progress => {
                }
            })
        } catch (e) {
            console.log(e)
        }
    }


}