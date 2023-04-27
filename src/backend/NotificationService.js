import {API, Auth} from "aws-amplify";

const notificationApiName = 'GigbusterApi'
const notificationPath = '/notification'
export class NotificationService {

    constructor() {

    }
    async createNotification(params) {

        return
    }

    async queryNotifications(params) {
        const path = `${notificationPath}`
        const data = {
            queryStringParameters: {
                limit: params.limit,
                lastEvaluatedKey: params.lastEvaluatedKey
            }
        }
        const res = await API.get(notificationApiName, path, data)
        const notifications = res?.Items
        return notifications
    }

}