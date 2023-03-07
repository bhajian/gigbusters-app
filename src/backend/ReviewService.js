import {API} from "aws-amplify";

const reviewApiName = 'GigbusterApi'
const reviewPath = '/review'
const complexReviewPath = '/complexReview'
const reviewablePath = '/reviewable'
const queryPath = '/query?'

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
        return reviewables
    }


}