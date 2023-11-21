import { Grid } from '@mui/material'
import classes from './ChatPanel.module.scss'
import { useQuery } from '@tanstack/react-query';
import MessageArea from '../messageArea/MessageArea';
import RoomList from '../roomList/RoomList';

export default function ChatPanel() {
  // ログイン中のUserId(Global Client Data)
  const {
    data: loginUser
  } = useQuery<number>({
    queryKey: ['loginUser'],
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
              </>
            }
          </div>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar}>
            {loginUser !== 0 &&
              <>
                <MessageArea />
              </>
            }
          </div>
        </main>
      </Grid>
    </>
  );
}
