export enum ChatType {
    PRIVATE = "PRIVATE",
    GROUP = "GROUP",
}

export type CreateChatBody = {
  id?: string;
  type?: ChatType;
  memberIds: string[];
  groupName?: string;
};
