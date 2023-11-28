import { tables } from "@/api/fetchData";
import { Message, User } from "@/types/fetchData";
import { Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./UserList.module.scss";

export default function UserList() {
  // 選択中のRoomで発言しているUserのみを一覧に表示する
  // User選択時、UserIdをキャッシュに格納する

  const queryClient = useQueryClient();

  // 選択中のRoomId(Client)
  const {
    data: selectedRoom
  } = useQuery<number>({
    queryKey: ['selectedRoom'],
    enabled: false
  });

  // Message(Server)
  // 全てのMessagesを取得して、キャッシュに格納する。
  // その中から、選択中のRoomIdを持つMessageだけをdataに入れる。
  // selectedRoomが変更されたら、messagesOnRoomも自動的に変更されるようにする。
  const {
    data: messagesOnRoom,
    error: messagesOnRoomError
  } = useQuery<Message[]>({
    queryKey: ['messagesOnRoom', selectedRoom],
    queryFn: tables.messages.fetchTable,
    select: (mes) => mes.filter((mes) => mes.roomId == selectedRoom),
    refetchOnWindowFocus: false//  window にフォーカスがあたった時にデータの再取得をするかどうか
  });

  // Users一覧(Server)
  const {
    data: users,
    error: usersError
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: tables.users.fetchTable
  });

  // フィルタで選択中のUserId(Client)
  const {
    data: filterdUser
  } = useQuery<number>({
    queryKey: ['filterdUser'],
    enabled: false
  });
  // filterdUserのsetter
  // Mutationでは変更しないので、キャッシュを直接変更する
  const setFilterdUser = (filterdUser: number): void => {
    queryClient.setQueryData<number>(['filterdUser'], filterdUser);
  }

  if (usersError) {
    return <div>Usersが読み込めませんでした: {usersError.message}</div>;
  }

  if (messagesOnRoomError) {
    return <div>Messagesが読み込めませんでした: {messagesOnRoomError.message}</div>;
  }

  // 選択中のRoom内のMessageの発言者に該当するUserのUserIdのリスト
  const userIdsOnRoom = new Set(messagesOnRoom?.map((mes) => mes.userId));

  // 上記UserIdのリストに該当するUserのリスト
  const usersOnRoom: User[] | undefined = users?.filter((user) => userIdsOnRoom.has(user.userId));

  const handleClick = (userId: number) => {
    setFilterdUser(userId);
  }

  return (
    <>
      <Typography>発言者でフィルタ:</Typography>
      <ul className={classes.ul}>
        {usersOnRoom?.map((user) => (
          <li
            key={user.userId}
            onClick={() => handleClick(user.userId)}
            className={user.userId === filterdUser ? classes.selected : classes.normal}
          >
            {user.name}
          </li>
        ))}
        <li onClick={() => handleClick(0)} className={classes.normal}>
          フィルタクリア
        </li>
      </ul>
    </>
  )
}
