import { Grid } from '@mui/material'
import classes from './ChatPanel.module.scss'
import { useQuery } from '@tanstack/react-query';
import MessageArea from '../messageArea/MessageArea';
import RoomList from '../roomList/RoomList';
import InputArea from '../inputArea/InputArea';
import UserList from '../userList/UserList';
import 'react-chat-elements/dist/main.css';

export default function ChatPanel() {
  // ログイン中のUserId(Global Client Data)
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

  return (
    <>
      <Grid className={classes.root}>
        <nav className={classes.navigation}>
          <div className={classes.toolbar}>
            {loginUser !== 0 &&
              <>
                <RoomList />
                <UserList />
              </>
            }
          </div>
        </nav>
        <main className={classes.content}>
          {loginUser !== 0 &&
            <>
              <MessageArea />
              {selectedRoom && <InputArea />}
            </>
          }
        </main>
      </Grid>
    </>
  );
}
