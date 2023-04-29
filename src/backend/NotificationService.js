import {API, Auth, Storage} from "aws-amplify";

const notificationApiName = 'GigbusterApi'
const notificationPath = '/notification'
let lastEvaluatedKey = undefined
let notifications = new Map()

export class NotificationService {

    constructor() {

    }

    async fetchNotifications(params) {
        const path = `${notificationPath}`
        const data = {
            queryStringParameters: {
                limit: params.limit,
            }
        }
        const res = await API.get(notificationApiName, path, data)
        const notificationArr = res?.Items
        lastEvaluatedKey = res?.LastEvaluatedKey?.id

        for(let i=0; i<notificationArr?.length; i++){
            if(notificationArr[i]?.subject?.profilePhoto){
                notificationArr[i].subject.profilePhotoURL =
                    await this.getPhoto(notificationArr[i]?.subject?.profilePhoto)
            }
            if(notificationArr[i]?.user?.profilePhoto){
                notificationArr[i].user.profilePhotoURL =
                    await this.getPhoto(notificationArr[i]?.user?.profilePhoto)
            }
            if(notificationArr[i]?.task?.photos && notificationArr[i]?.task?.photos[0]){
                const photo = notificationArr[i]?.task?.photos[0]
                notificationArr[i].task.photoURL =
                    await this.getPhoto(photo)
            }
        }
        notifications = new Map(notificationArr.map(i => [i?.transaction?.id, i]))
        return notificationArr
    }

    async fetchNotificationsNextPage(params) {
        const path = `${notificationPath}`
        const data = {
            queryStringParameters: {
                limit: params.limit,
                lastEvaluatedKey: lastEvaluatedKey
            }
        }
        const res = await API.get(notificationApiName, path, data)
        notifications = res?.Items
        lastEvaluatedKey = res?.LastEvaluatedKey?.id
        return notifications
    }

    async getPhoto(params) {
        try {
            if (params && params.key && params.bucket) {
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

    setNotification(notification) {
        notifications.set(notification?.id, notification)
    }

    deleteNotificationById(notificationId) {
        notifications.delete(notificationId)
    }
    getNotifications() {
        return [...notifications.values()]
    }

}