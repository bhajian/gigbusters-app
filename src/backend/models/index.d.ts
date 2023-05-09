import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fromUserId: string;
  readonly toUserId: string;
  readonly type?: string | null;
  readonly status?: string | null;
  readonly message?: string | null;
  readonly referredPhone?: string | null;
  readonly referredEmail?: string | null;
  readonly referredName?: string | null;
  readonly dateTime: string;
  readonly transactionId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fromUserId: string;
  readonly toUserId: string;
  readonly type?: string | null;
  readonly status?: string | null;
  readonly message?: string | null;
  readonly referredPhone?: string | null;
  readonly referredEmail?: string | null;
  readonly referredName?: string | null;
  readonly dateTime: string;
  readonly transactionId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}