import { Input, Button } from 'react-chat-elements';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tables } from '@/api/fetchData';
import { createRef, useState } from 'react';

export default function InputArea() {
  // 「送信」ボタン押下でServerにMessageをPOSTし、キャッシュを更新する。
  const queryClient = useQueryClient();

  // Messageに必要なデータ
  // ログイン中のUserId
  const {
    data: loginUser
  } = useQuery<number>({
    queryKey: ['loginUser'],
    enabled: false
  });

  // 選択中のRoomId
  const {
    data: selectedRoom
  } = useQuery<number>({
    queryKey: ['selectedRoom'],
    enabled: false
  });

  // MessageをPOSTし、キャッシュを更新
  const mutation = useMutation({
    mutationFn: tables.messages.create,
    retry: 3,
    onMutate: (message) => {
      // 更新関数実行前の処理
      // 基本成功するという前提で、見た目上だけ先に反映させたい場合、
      // onMutateで先に反映し、onSuccessで正しいデータに直すoronErrorで巻き戻すといった運用も可能
      console.log(`Mutate:${message.content}`);
      return 'Mutateでリターン';
    },
    onError: (error, message, context) => {
      // エラー発生時の処理
      console.log(`onError:error:${error.message}、message:${message.content}、context:${context}`);
    },
    onSuccess: (data, message, context) => {
      // 成功時の処理
      console.log(`onSuccess:data:${data.status}、message:${message.content}、context:${context}`);
      queryClient.invalidateQueries({
        queryKey: ['messagesOnRoom', selectedRoom]});
    },
    onSettled: (data, error, message, context) => {
      // 成功・エラー問わず実行する後処理
      // data: 更新関数が返すデータ
      // error: エラー情報
      // context: onMutate で return したもの
      console.log(`onSettled:data:${data?.status}、error:${error?.message}、message:${message.content}、context:${context}`);
    }
  });

  const [inputText, setInputText] = useState('');

  const inputRef = createRef<HTMLInputElement>();

  const postMessage = () => {
    if (inputRef.current && loginUser && selectedRoom) {
      mutation.mutate({
        // POSTするMessage型データ
        userId: loginUser,
        roomId: selectedRoom,
        content: inputText
      }, {
        // useMutation側より後に実行される
        onError: (error, message, context) => {
          // エラー発生時の処理
          console.log(`mutate:onError:error:${error.message}、message:${message.content}、context:${context}`);
        },
        onSuccess: (data, message, context) => {
          // 成功時の処理
          console.log(`mutate:onSuccess:data:${data.status}、message:${message.content}、context:${context}`);
        },
        onSettled: (data, error, message, context) => {
          // 成功・エラー問わず実行する後処理
          console.log(`mutate:onSettled:data:${data?.status}、error:${error?.message}、message:${message.content}、context:${context}`);
        }
      });
      // 送信後、入力欄を空欄にする
      setInputText('');
    }
  }

  return (
    <>
      {mutation.error ?
        // dataやerrorなどの状態を初期化
        <span onClick={() => mutation.reset()}>エラー。やり直す</span>
      :
        <Input
          value={inputText}
          referance={inputRef}
          autofocus={true}
          maxHeight={30}
          placeholder="入力してください"
          rightButtons={
            <Button
              text="送信"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                postMessage();
                e.preventDefault();
              }}
            />
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputText(e.target.value);
          }}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              postMessage();
              e.preventDefault();
            }
          }}
        />
      }
    </>
  )
}
