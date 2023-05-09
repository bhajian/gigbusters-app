import {API, Auth, graphqlOperation} from "aws-amplify";
import {listMessagesByTransactionId} from "../backend/graphql/queries";
import {onCreateMessage} from "../backend/graphql/subscriptions";
import {createMessage} from "./graphql/mutations";

export class MessageService {

    constructor() {

    }
    subscribeToMessages(params) {
        const subscription = API.graphql(
            graphqlOperation(onCreateMessage, {
                filter: { transactionId: { eq: params?.transactionId } },
            })
        ).subscribe({
            next: params.next,
            error: (err) => console.warn(err),
        })
        return subscription
    }

    async listMessagesByTransaction(params) {
        const messagesObj = await API.graphql(graphqlOperation(listMessagesByTransactionId, {
            transactionId: params.transactionId,
            sortDirection: params.sortDirection,
        }))
        return messagesObj?.data?.listMessagesByTransactionId?.items
    }

    async createMessage(params) {
        const messageObj = await API.graphql(
            graphqlOperation(createMessage, { input: {
                    transactionId: params.transactionId,
                    type: 'message',
                    dateTime: (new Date()).toISOString(),
                    message: params.message,
                    fromUserId: params.fromUserId,
                    toUserId: params.toUserId,
                }})
        )
        return messageObj
    }

    async createReferralMessage(params) {
        const messageObj = await API.graphql(
            graphqlOperation(createMessage, { input: params })
        )
        return messageObj
    }

}