import {API, Auth, Storage} from "aws-amplify"
const taskApiName = 'GigbusterApi'
const taskPath = '/task'
const applicantPath = '/applicant'
const transactionPath = '/transaction'
const applyPath = '/apply'
const withdrawPath = '/withdraw'
const passPath = '/pass'
const acceptPath = '/accept'
const rejectPath = '/reject'
const photoPath = '/photo'
const queryPath = '/query'
let myTaskLastEvaluatedKey = undefined
let neighboursTaskLastEvaluatedKey = undefined
let lastTimeMyTasksFetched = null
let transactions = new Map()
let myTasks = new Map()
let neighboursTasks = []

export class TaskService {

    constructor() {

    }

    getTransaction(transactionId) {
        return transactions?.get(transactionId)
    }

    setTransaction(transaction) {
        transactions.set(transaction?.transaction?.id, transaction)
    }

    deleteTransaction(transactionId) {
        transactions.delete(transactionId)
    }
    getMyTransactions() {
        return [...transactions.values()]
    }

    async fetchMyTransaction(params) {
        const path = taskPath + transactionPath
        const data = {
            queryStringParameters: {
                limit: params.limit,
                persona: params.persona
            }
        }
        const trnsactionArray = await API.get(taskApiName, path, data)
        for(let i=0; i<trnsactionArray.length; i++){
            if(trnsactionArray[i].worker?.profilePhoto){
                trnsactionArray[i].worker.profilePhotoURL =
                    await this.getMainPhoto(trnsactionArray[i].worker?.profilePhoto)
            }
            if(trnsactionArray[i].customer?.profilePhoto){
                trnsactionArray[i].customer.profilePhotoURL =
                    await this.getMainPhoto(trnsactionArray[i].customer?.profilePhoto)
            }
            if(trnsactionArray[i].task?.photos && trnsactionArray[i].task?.photos[0]){
                const photo = trnsactionArray[i].task?.photos[0]
                trnsactionArray[i].task.photoURL =
                    await this.getMainPhoto(photo)
            }
        }
        transactions = new Map(trnsactionArray.map(i => [i?.transaction?.id, i]))
        return trnsactionArray
    }

    async listTasks(params) {
        const path = taskPath
        const data = {
            queryStringParameters: params
        }
        const response = await API.get(taskApiName, path, data)
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
        const data = {
            queryStringParameters: params
        }
        const response = await API.get(taskApiName, path, data)
        neighboursTasks = response?.Items
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
        const images = params.images
        delete params.images
        const path = taskPath
        const data = {
            body: params,
        }
        const task = await API.post(taskApiName, path, data)

        task.photos=[]
        const user = await Auth.currentCredentials()
        for(let x=0; x<images.length; x++){
            const photo = await this.addPhoto({
                type: 'main',
                taskId: task.id,
                identityId: user.identityId,
                photo: images[x]
            })
            task.photos.push(photo)
        }

        if(task?.photos?.length > 0){
            task.mainPhotoURL = await this.getMainPhoto(task?.photos[0])
        }

        this.setTask(task)
        return task
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
        const res = await API.del(taskApiName, path, data)
        this.deleteTaskById(params.taskId)
    }

    async applyTask(params) {
        const path = `${taskPath}/${params.taskId}${applyPath}`
        const data = {
            body: {},
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }

    async passTask(params) {
        const path = `${taskPath}/${params.taskId}${passPath}`
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
        const t = transactions.get(params.transactionId)
        t.transaction.status = 'applicationAccepted'
        transactions.set(params.transactionId, t)
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

    async terminateTransaction(params) {
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
        const tasksArray = await this.listTasks(params)
        myTasks = new Map(tasksArray.map(i => [i?.id, i]))
        return tasksArray
    }

    getTaskById(taskId) {
        return myTasks?.get(taskId)
    }

    setTask(task) {
        myTasks.set(task?.transaction?.id, task)
    }

    deleteTaskById(taskId) {
        myTasks.delete(taskId)
    }
    getMyTasks() {
        return [...myTasks.values()]
    }

    async fetchNeighboursTasks(params) {
        neighboursTasks = await this.listNeighborsTasks(params)
        return neighboursTasks
    }

}