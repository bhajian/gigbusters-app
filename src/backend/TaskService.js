import {API, Storage} from "aws-amplify"
import async from "async";

const taskApiName = 'GigbusterApi'
const taskPath = '/task'
const applicantPath = '/applicant'
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
            if(tasks[i].photos){
                const mainPhoto = tasks[i].photos
                    .filter((item) => item.type === 'main')
                tasks[i].mainPhotoURL = await this.getMainPhoto(mainPhoto[0])
            }
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
            if(requests[i].photos) {
                const mainPhoto = requests[i].photos
                    .filter((item) => item.type === 'main')
                requests[i].mainPhotoURL = await this.getMainPhoto(mainPhoto[0])
            }
            if(requests[i].profilePhoto){
                requests[i].profilePhotoURL = await this.getMainPhoto(requests[i].profilePhoto)
            }

        }
        return requests
    }

    async listApplicants(params) {
        const path = `${taskPath}/${params.taskId}${applicantPath}`
        const data = {
        }
        const applicants = await API.get(taskApiName, path, data)
        for(let i=0; i<applicants.length; i++){
            if(applicants[i].profilePhoto){
                applicants[i].profilePhotoURL = await this.getMainPhoto(applicants[i].profilePhoto)
            }
        }
        return applicants
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
        console.log(params)
        console.log(path)
        const data = {
            body: {
                applicantId: params.applicantId
            },
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }
    async rejectApplication(params) {
        const path = `${taskPath}/${params.taskId}${rejectPath}`
        console.log(params)
        console.log(path)
        const data = {
            body: {
                applicantId: params.applicantId
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

}