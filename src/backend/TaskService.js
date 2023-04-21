import {API, Storage} from "aws-amplify"
const taskApiName = 'GigbusterApi'
const taskPath = '/task'
const applicantPath = '/applicant'
const transactionPath = '/transaction'
const applyPath = '/apply'
const withdrawPath = '/withdraw'
const acceptPath = '/accept'
const rejectPath = '/reject'
const photoPath = '/photo'
const queryPath = '/query'
let myTasks = []
let myTaskLastEvaluatedKey = undefined
let neighboursTasks = []
let neighboursTaskLastEvaluatedKey = undefined
let lastTimeMyTasksFetched = null

export class TaskService {

    constructor() {

    }

    async listMyTransaction(params) {
        const path = taskPath + transactionPath
        const data = {
            queryStringParameters: {
                limit: params.limit,
                persona: params.persona
            }
        }
        const transactions = await API.get(taskApiName, path, data)
        for(let i=0; i<transactions.length; i++){
            if(transactions[i].worker?.profilePhoto){
                transactions[i].worker.profilePhotoURL =
                    await this.getMainPhoto(transactions[i].worker?.profilePhoto)
            }
            if(transactions[i].customer?.profilePhoto){
                transactions[i].customer.profilePhotoURL =
                    await this.getMainPhoto(transactions[i].customer?.profilePhoto)
            }
            if(transactions[i].task?.photos && transactions[i].task?.photos[0]){
                const photo = transactions[i].task?.photos[0]
                transactions[i].task.photoURL =
                    await this.getMainPhoto(photo)
            }
        }
        return transactions
    }

    async listTasks(params) {
        const path = taskPath
        // if(myTaskLastEvaluatedKey)
        //     params.lastEvaluatedKey = myTaskLastEvaluatedKey
        const data = {
            queryStringParameters: params
        }
        const response = await API.get(taskApiName, path, data)
        // myTaskLastEvaluatedKey = response?.LastEvaluatedKey?.id
        const tasks = response?.Items
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

        // params.lastEvaluatedKey = neighboursTaskLastEvaluatedKey
        const data = {
            queryStringParameters: params
        }
        const response = await API.get(taskApiName, path, data)

        neighboursTasks = response?.Items
        // neighboursTaskLastEvaluatedKey = response?.LastEvaluatedKey?.id
        for(let i=0; i< neighboursTasks.length; i++){
            if(neighboursTasks[i].photos) {
                const mainPhoto = neighboursTasks[i].photos
                    .filter((item) => item.type === 'main')
                neighboursTasks[i].mainPhotoURL =
                    await this.getMainPhoto(mainPhoto[0])
            }
            if(neighboursTasks[i].profilePhoto){
                neighboursTasks[i].profilePhotoURL =
                    await this.getMainPhoto(neighboursTasks[i].profilePhoto)
            }
        }
        return neighboursTasks
    }

    async listApplicants(params) {
        const path = `${taskPath}/${params.taskId}${applicantPath}`
        const data = {
        }
        const applicants = await API.get(taskApiName, path, data)

        for(let i=0; i<applicants.length; i++){
            if(applicants[i].worker?.profilePhoto){
                applicants[i].worker.profilePhotoURL =
                    await this.getMainPhoto(applicants[i].worker?.profilePhoto)
            }
            if(applicants[i].customer?.profilePhoto){
                applicants[i].customer.profilePhotoURL =
                    await this.getMainPhoto(applicants[i].customer?.profilePhoto)
            }
            if(applicants[i].task?.photos && applicants[i].task?.photos[0]){
                const photo = applicants[i].task?.photos[0]
                applicants[i].task.photoURL =
                    await this.getMainPhoto(photo)
            }
        }


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
        myTasks.push(res)
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
        const path = `${taskPath}/${params.taskId}`
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
                applicantId: params.applicantId,
                transactionId: params.transactionId,
            },
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }
    async rejectApplication(params) {
        const path = `${taskPath}/${params.taskId}${rejectPath}`
        const data = {
            body: {
                applicantId: params.applicantId,
                transactionId: params.transactionId,
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

    async fetchMyTasks(params) {
        const tasks = await this.listTasks(params)
        // myTasks = [...tasks, ...myTasks]
        lastTimeMyTasksFetched = new Date()
        return tasks
    }

    async fetchNeighboursTasks(params) {
        neighboursTasks = await this.listNeighborsTasks(params)
        return neighboursTasks
    }

    async getMyTasks() {
        return myTasks
    }

    async clearMyTasks() {
        myTasks = []
    }

    getNeighboursTasks() {
        return neighboursTasks
    }

}