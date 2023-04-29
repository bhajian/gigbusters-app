import {API, Auth, graphqlOperation} from "aws-amplify";
import {listMessagesByTransactionId} from "../backend/graphql/queries";
import {onCreateMessage} from "../backend/graphql/subscriptions";

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

}