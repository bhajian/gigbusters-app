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
        const reviews = await API.get(taskApiName, path, data)
        return reviews
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
        const path = taskPath
        const data = {
            body: params,
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }

    async withdrawApplication(params) {
        const path = taskPath
        const data = {
            body: params,
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }

    async acceptApplication(params) {
        const path = taskPath
        const data = {
            body: params,
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }
    async rejectApplication(params) {
        const path = taskPath
        const data = {
            body: params,
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
        return res
    }

    async getMainPhoto(params) {
        try{
            const mainPhoto = params.photos
                .filter((item) => item.type === 'main')
            const key = mainPhoto[0].key
            const bucket = mainPhoto[0].bucket
            const signedURL = await Storage.get(key, {
                bucket: bucket,
                level: 'protected'
            })
            return signedURL
        } catch (e) {
            console.log(e)
        }
        return undefined
    }

}