import { tables } from "@/api/fetchData";
import { User } from "@/types/fetchData";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function LoginForm() {
  // マウント時：Usersをリクエストし、キャッシュする
  // 選択->OK押下時：ログイン中のUser情報をキャッシュする(GlobalなClientDataもReactQueryで管理)

  const queryClient = useQueryClient();

  // Users(Server Data)
  const {
    data: users,
    error
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: tables.users.fetchTable
  });

  // ログイン中のUser(Global Client Data)
  const {
    data: loginUser
  } = useQuery<number>({
    queryKey: ['loginUser'],
    enabled: false, // 自動fetch停止
    // fetchしないのでqueryFnは指定無し
  })
  // loginUserのsetter
  const setLoginUser = (newValue: number): void => {
    queryClient.setQueryData<number>(['loginUser'], newValue);
  }
  
  // リスト上で選択中のUser(Client Data)
  const [selectedUser, setSelectedUser] = useState(0);

  // Usersのfetchに失敗した場合
  if (error) {
    return <div>Error: {error.message}</div>
  }

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedUser(event.target.value as number);
  }

  const handleClick = () => {
    setLoginUser(selectedUser);
  }

  return (
    <div>
      <Dialog open={!loginUser} fullWidth={true}>
        <DialogTitle>ログインアカウント選択</DialogTitle>
        <DialogContent>
          <Select
            defaultValue={0}
            onChange={handleChange}>
            {users?.map((user) =>
              <MenuItem key={user.userId} value={user.userId}>
                {user.name}
              </MenuItem>
            )}
            <MenuItem key={0} value={0}>
              ログアウト
            </MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
