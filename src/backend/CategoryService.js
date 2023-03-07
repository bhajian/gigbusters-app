import {API} from "aws-amplify";
import {join} from "path";

const reviewApiName = 'GigbusterApi'
const reviewPath = '/category'
const queryPath = '/query?'

let profile = null
export class ProfileService {

    constructor() {

    }
    async querycategories(params) {
        const path = reviewPath + queryPath
        const data = {
            queryStringParameters: params
        }
        const reviews = await API.get(reviewApiName, path, data)
        return reviews
    }

}