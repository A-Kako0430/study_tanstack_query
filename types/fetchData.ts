export type Message = {
  messageId?: number,
  createdAt?: string,
  userId: number,
  roomId: number,
  content: string,
}

export type Room = {
  roomId: number,
  name: string,
}

export type User = {
  userId: number,
  name: string,
}