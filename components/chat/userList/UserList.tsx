import { tables } from "@/api/fetchData";
import { useQuery } from "@tanstack/react-query";

export default function UserList() {
  // User選択時、UserIdをキャッシュに格納する


  // Users一覧
  const {
    data: users,
    error
  } = useQuery({
    queryKey: ['users'],
    queryFn: tables.users.fetchTable
  })

  // 選択中のUserId

}
