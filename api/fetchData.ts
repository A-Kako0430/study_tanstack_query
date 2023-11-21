import { type Room, type Message, type User } from "@/types/fetchData";
import axios from "axios";

export const FETCH_INTERVAL = 15 * 1000;
export const EXPIRE_TIME = 10 * 1000;

// NOTE: nextjsは「NEXT_PUBLIC_」、Reactだと「REACT_APP_」
export const APIKEY = process.env.NEXT_PUBLIC_APIKEY ?? 'Please setup API key';

const TABLE_ID_MESSAGES = process.env.NEXT_PUBLIC_TABLE_ID_MESSAGES ?? 'Please setup messages table ID(site id)'
const TABLE_ID_ROOMS = process.env.NEXT_PUBLIC_TABLE_ID_ROOMS ?? 'Please setup rooms table ID(site id)'
const TABLE_ID_USERS = process.env.NEXT_PUBLIC_TABLE_ID_USERS ?? 'Please setup users table ID(site id)'

class TableInfo<T> {
  tableId: string;
  rawDataToData: (rawData: any) => T;
  dataToRawData: (data: T) => any;

  constructor(
    tableId: string,
    rawDataToData: (rawMessage: any) => T,
    dataToRawData: (data: T) => any
  ) {
    this.tableId = tableId;
    this.rawDataToData = rawDataToData;
    this.dataToRawData = dataToRawData;
  }

  fetchTable = async () => {
    const response = await axios.post(
      `/api/items/${this.tableId}/get`,
      {
        'ApiVersion': '1.1',
        'ApiKey': APIKEY
      }
    )

    if(!response.data.Response) {
      return Promise.reject("Server Errorです")
    }

    const rawData = response.data.Response.Data;
    return rawData.map(this.rawDataToData);
  }

  create = (data: T) => {
    return axios.post(
      `/api/items/${this.tableId}/create`,
      {
        "ApiVersion": '1.1',
        "ApiKey": APIKEY,
        ...this.dataToRawData(data)
      }
    )
  }
}

export const tables = {
  messages: new TableInfo<Message>(
    TABLE_ID_MESSAGES,
    (rawMessage: any) => ({
      messageId: rawMessage.ResultId,
      createdAt: rawMessage.CreatedTime,
      userId: Number(rawMessage.ClassHash.ClassA),
      roomId: Number(rawMessage.ClassHash.ClassB),
      content: rawMessage.Body,
    }),
    (message: Message) => ({
      ClassHash: {
        ClassA : message.userId,
        ClassB: message.roomId,
      },
      Body: message.content,
    })
  ),
  rooms: new TableInfo<Room>(
    TABLE_ID_ROOMS,
    (rawRoom: any) => ({
      roomId: rawRoom.ResultId,
      name: rawRoom.Title,
    }),
    (room: Room) => ({
      Title: room.name
    }),
  ),
  users: new TableInfo<User>(
    TABLE_ID_USERS,
    (rawUser: any) => ({
      userId: rawUser.ResultId,
      name: rawUser.Title,
    }),
    (user: User) => ({
      Title: user.userId,
    }),
  )
}

export const queryFn = async ({ queryKey: [url] }: { queryKey: [string] }) => {
  const res = await axios.post(
    url,
    JSON.stringify({
      "ApiVersion": '1.1',
      "ApiKey": APIKEY
    })
  );

  if (!res.data.Response) {
    throw Error(`Server Error on ${url}`);
  }
  return res.data.Response.Data;
}

export const rawMessageToMessage = (rawMessage: any): Message => ({
  messageId: rawMessage.ResultId,
  createdAt: rawMessage.CreatedTime,
  userId: Number(rawMessage.ClassHash.ClassA),
  roomId: Number(rawMessage.ClassHash.ClassB),
  content: rawMessage.Body,
});
