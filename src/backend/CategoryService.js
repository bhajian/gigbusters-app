import {API} from "aws-amplify";

const reviewApiName = 'GigbusterApi'
const reviewPath = '/category'

let profile = null
export class CategoryService {

    constructor() {

    }

    async createCategory(params) {
        const path = reviewPath
        const data = {
            body: {
                category: params.category,
                ranking: 0
            }
        }
        const category = await API.put(reviewApiName, path, data)
        return category
    }

    async queryCategories(params) {
        const path = `${reviewPath}`
        const data = {
            queryStringParameters: {
                prefix: params.prefix,
                limit: params.limit,
                lastEvaluatedCategory: params.lastEvaluatedCategory
            }
        }
        const reviews = await API.get(reviewApiName, path, data)
        return reviews
    }

}