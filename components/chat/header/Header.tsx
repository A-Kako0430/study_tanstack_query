import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classes from "./Header.module.scss";
import { User } from "@/types/fetchData";

export default function Header() {
  const queryClient = useQueryClient();

  // ログインUserId
  const {
    data: loginUser
  } = useQuery<number>({
    queryKey: ['loginUser'],
    enabled: false
  });
  // ログインUserIdのsetter
  const setLoginUser = (newValue: number) => {
    queryClient.setQueryData<number>(['loginUser'], newValue);
  }

  // ログインUserのnameを表示するために、Usersを取得
  // ClientDataであるloginUserに紐づくUserを取得するため、再フェッチはしない。
  // キャッシュに保存されているデータを使用する
  const {
    data: users
  } = useQuery<User[]>({
    queryKey: ['users'],
    enabled: false
  });

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h5" color="inherit" className={classes.title}>
          Chat App
        </Typography>
        <Typography variant="h6" component="div" className={classes.name}>
          ログインユーザ： {users?.find((user) => ( user.userId === loginUser ))?.name ?? "未ログイン"}
        </Typography>
        {loginUser !==0 &&
          <Button color="inherit" onClick={() => { setLoginUser(0); }}>
            ログアウト
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}