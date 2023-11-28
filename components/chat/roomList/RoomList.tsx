import { tables } from "@/api/fetchData";
import { Room } from "@/types/fetchData";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./RoomList.module.scss";

export default function RoomList() {
  // Room選択時、RoomIdをキャッシュに格納する

  const queryClient = useQueryClient();

  // Room一覧
  const {
    data: rooms,
    error
  } = useQuery<Room[]>({
    queryKey: ['rooms'],
    queryFn: tables.rooms.fetchTable
  })

  // 選択中のRoomId
  const {
    data: selectedRoom
  } = useQuery<number>({
    queryKey: ['selectedRoom'],
    enabled: false
  });
  // selectedRoomのsetter
  const setSelectedRoom = (room: number): void => {
    queryClient.setQueryData<number>(['selectedRoom'], room);
  }

  const handleClick = (room: number) => {
    setSelectedRoom(room);
  }

  // Roomsのfetchに失敗した場合
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <Typography>閲覧するルームを選択してください:</Typography>
      <ul className={classes.ul}>
        {rooms?.map((room) => (
          <li key={room.roomId}
            onClick={() => handleClick(room.roomId)}
            className={room.roomId === selectedRoom ? classes.selected : classes.normal}
          >
            <span>{`${room.roomId}:${room.name}`}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
