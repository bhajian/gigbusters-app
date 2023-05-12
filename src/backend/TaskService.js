import {API, Auth, Storage} from "aws-amplify"
const taskApiName = 'GigbusterApi'
const taskPath = '/task'
const applicantPath = '/applicant'
const transactionRequestAcceptPath = '/requestAccept'
const transactionRequestRejectPath = '/requestReject'
const transactionPath = '/transaction'
const applyPath = '/apply'
const withdrawPath = '/withdraw'
const passPath = '/pass'
const acceptPath = '/applicationAccept'
const rejectPath = '/applicationReject'
const photoPath = '/photo'
const queryPath = '/query'
const updateLastMessagePath = '/updateLastMessage'
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
        for(let i=0; i<trnsactionArray?.length; i++){
            if(trnsactionArray[i]?.worker?.profilePhoto){
                trnsactionArray[i].worker.profilePhotoURL =
                    await this.getMainPhoto(trnsactionArray[i]?.worker?.profilePhoto)
            }
            if(trnsactionArray[i]?.customer?.profilePhoto){
                trnsactionArray[i].customer.profilePhotoURL =
                    await this.getMainPhoto(trnsactionArray[i]?.customer?.profilePhoto)
            }
            if(trnsactionArray[i]?.referrer?.profilePhoto){
                trnsactionArray[i].referrer.profilePhotoURL =
                    await this.getMainPhoto(trnsactionArray[i]?.referrer?.profilePhoto)
            }
            if(trnsactionArray[i]?.task?.photos && trnsactionArray[i]?.task?.photos[0]){
                const photo = trnsactionArray[i]?.task?.photos[0]
                trnsactionArray[i].task.photoURL =
                    await this.getMainPhoto(photo)
            }
        }
        transactions = new Map(trnsactionArray.map(i => [i?.transaction?.id, i]))
        return trnsactionArray
    }

    async fetchMyTasks(params) {
        const path = taskPath
        const data = {
            queryStringParameters: params
        }
        const response = await API.get(taskApiName, path, data)
        const tasksArray = response?.Items
        for(let i=0; i<tasksArray?.length; i++){
            if(tasksArray[i]?.photos){
                const mainPhoto = tasksArray[i].photos
                    .filter((item) => item?.type === 'main')
                tasksArray[i].photoURL = await this.getMainPhoto(mainPhoto[0])
            }
        }
        myTasks = new Map(tasksArray.map(i => [i?.id, i]))
        return tasksArray
    }

    async listNeighborsTasks(params) {
        const path = taskPath + queryPath
        const data = {
            queryStringParameters: params
        }
        const response = await API.get(taskApiName, path, data)
        neighboursTasks = response?.Items
        for(let i=0; i< neighboursTasks?.length; i++){
            if(neighboursTasks[i].photos) {
                const mainPhoto = neighboursTasks[i]?.photos
                    .filter((item) => item?.type === 'main')
                neighboursTasks[i].mainPhotoURL =
                    await this.getMainPhoto(mainPhoto[0])
            }
            if(neighboursTasks[i]?.profilePhoto){
                neighboursTasks[i].profilePhotoURL =
                    await this.getMainPhoto(neighboursTasks[i]?.profilePhoto)
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
        const images = params.images
        delete params.images
        const path = taskPath
        const data = {
            body: params,
        }
        const task = await API.put(taskApiName, path, data)
        const user = await Auth.currentCredentials()
        for(let x=0; x<images.length; x++){
            const photo = await this.addPhoto({
                type: 'main',
                taskId: task.id,
                identityId: user.identityId,
                photo: images[x]
            })
            task.photos = [photo, ...params.photos]
        }

        if(task?.photos?.length > 0){
            task.mainPhotoURL = await this.getMainPhoto(task?.photos[0])
        }
        this.setTask(task)
        return task
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

    async updateLastUpdatedMessage(params) {
        const path = `${taskPath}/${updateLastMessagePath}`
        const data = {
            body: {
                id: params.id,
                lastMessage: params.lastMessage,
                senderId: (params.senderId? params.senderId : ''),
                receiverId: (params.receiverId? params.receiverId : ''),
                lastSenderRead: (params.lastSenderRead? params.lastSenderRead : ''),
                lastReceiverRead: (params.lastReceiverRead? params.lastReceiverRead : ''),
            },
        }
        await API.put(taskApiName, path, data)
        return
    }

    async createTransaction(params) {
        const path = `${taskPath}${transactionPath}`
        const data = {
            body: {
                type: params.type,
                taskId: params.taskId,
                customerId: params.customerId,
            },
        }
        const transaction = await API.post(taskApiName, path, data)
        return transaction
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
        const path = `${taskPath}${transactionPath}${acceptPath}`
        const data = {
            body: {
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
        const path = `${taskPath}${transactionPath}${rejectPath}`
        const data = {
            body: {
                transactionId: params.transactionId,
            },
        }
        const res = await API.put(taskApiName, path, data)
        return res
    }

    async acceptTransactionRequest(params) {
        const path = `${taskPath}${transactionPath}${transactionRequestAcceptPath}`
        const data = {
            body: {
                transactionId: params.transactionId,
            },
        }
        const res = await API.put(taskApiName, path, data)
        const t = transactions.get(params.transactionId)
        t.transaction.status = 'applicationAccepted'
        transactions.set(params.transactionId, t)
        return res
    }

    async rejectTransactionRequest(params) {
        const path = `${taskPath}${transactionPath}${transactionRequestRejectPath}`
        const data = {
            body: {
                transactionId: params.transactionId,
            },
        }
        const res = await API.put(taskApiName, path, data)
        const t = transactions.get(params.transactionId)
        t.transaction.status = 'applicationAccepted'
        transactions.set(params.transactionId, t)
        return res
    }

    async terminateTransaction(params) {
        const path = `${taskPath}${transactionPath}/${params.transactionId}`
        const data = {
            body: {
            },
        }
        const res = await API.del(taskApiName, path, data)
        transactions.delete(params.transactionId)
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

    getTaskById(taskId) {
        return myTasks?.get(taskId)
    }

    setTask(task) {
        myTasks.set(task?.id, task)
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