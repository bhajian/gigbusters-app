import {API, Storage} from "aws-amplify"
import async from "async";

const taskApiName = 'GigbusterApi'
const taskPath = '/task'
const applyPath = '/apply'
const withdrawPath = '/withdraw'
const acceptPath = '/accept'
const rejectPath = '/reject'
const photoPath = '/photo'
const queryPath = '/query'

export class TaskService {

    constructor() {

    }

    async listTasks() {
        const path = taskPath
        const data = {
        }
        const tasks = await API.get(taskApiName, path, data)
        for(let i=0; i<tasks.length; i++){
            tasks[i].mainPhotoURL = await this.getMainPhoto(tasks[i])
        }
        return tasks
    }

    async listNeighborsTasks(params) {
        const path = taskPath + queryPath
        const data = {
            queryStringParameters: params
        }
        const requests = await API.get(taskApiName, path, data)
        for(let i=0; i<requests.length; i++){
            requests[i].mainPhotoURL = await this.getMainPhoto(requests[i])
        }
        return requests
    }

    async createTask(params) {
        const path = taskPath
        const data = {
            body: params,
        }
        const res = await API.post(taskApiName, path, data)
        return res
    }

    async updateTask(params) {
        const path = taskPath
        const data = {
            body: params,
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }

    async deleteTask(params) {
        const path = taskPath
        const data = {
        }
        const reviews = await API.del(taskApiName, path, data)
        return reviews
    }

    async applyTask(params) {
        const path = `${taskPath}/${params.taskId}${applyPath}`
        const data = {
            body: {},
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }

    async withdrawApplication(params) {
        const path = `${taskPath}/${params.taskId}${withdrawPath}`
        const data = {
            body: {},
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }

    async acceptApplication(params) {
        const path = `${taskPath}/${params.taskId}${acceptPath}`
        const data = {
            body: {
                applicantId: params.params
            },
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }
    async rejectApplication(params) {
        const path = `${taskPath}/${params.taskId}${rejectPath}`
        const data = {
            body: {
                applicantId: params.params
            },
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }

    async addPhoto(params) {
        const path = `${taskPath}/${params.taskId}${photoPath}`
        const data = {
            body: params,
        }
        const res = await API.post(taskApiName, path, data)
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

    async getMainPhoto(params) {
        try {
            if (params && params.photos) {

                const mainPhoto = params.photos
                    .filter((item) => item.type === 'main')
                const key = mainPhoto[0].key
                const bucket = mainPhoto[0].bucket
                const identityId = mainPhoto[0].identityId
                const signedURL = await Storage.get(key, {
                    bucket: bucket,
                    level: 'protected',
                    identityId: identityId
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

}