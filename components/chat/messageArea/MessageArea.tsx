import { useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./MessageArea.module.scss";
import { Message, User } from "@/types/fetchData";
import { tables } from "@/api/fetchData";
import { MessageList, MessageType } from "react-chat-elements";

export default function MessageArea() {
  // マウント時：何もしない
  // ログイン完了時：ログイン中のUserに紐づくMessagesをリクエストして、エリアに表示する
  // Message入力時：入力したMessageをエリアに表示する
  // 他のUserによるMessage入力時？？：

  const queryClient = useQueryClient();

  // 表示位置のために、ログイン中のUser(Global Client Data)のuserIdを取得
  // NOTE: データの取得はQueryClient.getQueryDataでもできるが、
  //       結局useQueryで取得しないと画面更新が引き起されないし、
  //       さらに特定条件でガーベジコレクションされてしまうので、
  //       値はuseQueryで取得するのが良い。
  const {
    data: loginUser
  } = useQuery<number>({
    queryKey: ['loginUser'],
    enabled: false
  });

  // 選択中のRoomId(Global Client Data)
  const {
    data: selectedRoom
  } = useQuery<number>({
    queryKey: ['selectedRoom'],
    enabled: false
  });

  // フィルタで選択されているUserId(Global Client Data)
  const {
    data: filterdUser
  } = useQuery<number>({
    queryKey: ['filterdUser'],
    enabled: false
  });

  // User名取得のためにUsersを取得(Server Data)
  const {
    data: allUsers,
    error: usersError
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: tables.users.fetchTable
  });

  // Message(Server Data)
  // 全てのMessagesを取得して、キャッシュに格納する。
  // その中から、選択中のRoomIdを持つMessageだけをdataに入れる。
  // selectedRoomが変更されたら、messagesOnRoomも自動的に変更されるようにする。
  const {
    data: messagesOnRoom,
    error: messagesOnRoomError
  } = useQuery<Message[]>({
    queryKey: ['messagesOnRoom', selectedRoom],
    queryFn: tables.messages.fetchTable,
    select: (mes) => mes.filter((mes) => mes.roomId === selectedRoom),
    staleTime: Infinity,  // キャッシュの有効期限。default：0。この期限が切れ、データ再取得すると、再fetchが走る
    gcTime: 1 * 60 * 1000, // 非アクティブなクエリがキャッシュから削除されるまでの期間。default：5分。
    refetchInterval: 1 * 60 * 1000, // 自動更新間隔。default: false。
    refetchOnWindowFocus: false//  window にフォーカスがあたった時にデータの再取得をするかどうか
  });

  // ・フィルタで選択されているUserIdのMessageのみ表示
  // ・User名・・・MessageのUserIdをUsersから検索
  // ・表示位置・・・ログイン中のUserIdとMessageのUserIdが一致すればright
  const convertedMessages = messagesOnRoom
    ?.filter((mes: any) => (!filterdUser || mes.userId === filterdUser))
    .map<MessageType>((m) => ({
      id: m.userId,
      position: m.userId === loginUser ? 'right' : 'left',
      text: m.content,
      title: (allUsers?.find((user) => user.userId === m.userId)?.name) || '',
      focus: false,
      date: Date.parse(m.createdAt as string),
      titleColor: 'black',
      forwarded: false,
      replyButton: false,
      removeButton: false,
      status: 'read',
      notch: false,
      retracted: false,
      type: 'text',
    })).reverse();

  if (usersError) {
    return <div>Usersが読み込めませんでした: {usersError.message}</div>;
  }

  if (messagesOnRoomError) {
    return <div>Messagesが読み込めませんでした: {messagesOnRoomError.message}</div>;
  }

  return (
    <>
      {convertedMessages &&
        <MessageList
          className={classes.messageList}
          dataSource={convertedMessages}
          downButton={true}
          downButtonBadge={10}
          referance={undefined}
          lockable={false}
        />
      }
    </>
  );
}
