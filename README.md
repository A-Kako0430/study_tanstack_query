# Study TanStack(React) Query

## TODO
- [/components/todos](https://github.com/A-Kako0430/study_tanstack_query/tree/main/components/todos)
- [React Queryとは？状態管理・データ再取得の仕組みを作ろう](https://musclecoding.com/react-query/?fbclid=IwAR3AX21wQVYg-OOMP8mB3csskgs_bqJYRLlL9us8TSszvhd9Fjb18khStdc) を参考に実装
- 学習内容
    - 概要の理解
    - データをfetchして、useQueryを使ってServerDataをキャッシュに格納
    - データをPOSTして、useMutationでキャッシュのデータを更新。同じデータを参照するコンポーネントが更新される
    - errorやisLoadingなどの状態の利用

## CHAT
- [/components/chat](https://github.com/A-Kako0430/study_tanstack_query/tree/main/components/chat)
- [React Queryを状態管理ライブラリとして使い倒そう！/useQStateのススメ](https://qiita.com/uehaj/items/4e41e294181b3771e77a) を参考に実装し、公式GUIDEなどを参照して得た知識を追加実装
- 学習内容
    - 複数のコンポーネントが関係し合う、TODOよりも複雑な実装で、useQuery・useMutationの使い方に慣れる
        - staleTime等のいくつかのオプションの確認
    - useQueryを使って、ServerDataだけでなく、GlobalなClientDataもReactQueryで管理する
    - DevToolを使ってキャッシュデータを確認しながら実装
    - 自動テスト、lintの実装
- サーバーサイドの動かし方
    - https://github.com/Implem/Implem.Pleasanter をclone。
    - Quick Startに記載の通り、Dockerで起動する。
    - http://localhost:50001/ をブラウザで開き、「管理」-「サイトパッケージのインポート」にて https://github.com/uehaj/react-query-chat/tree/master/schema の３つのファイルをインポートする。
    - usersとroomsに適当に登録する。
    - 「Administorator」-「API設定」にて、APIKEYを取得する。
    - 当プロジェクトの.envファイルにAPIKEYを記載する。（テーブルキーも変更になっていれば、.env側を適宜変更する）

## 参照した記事
- [TanStack Query v5 公式ガイド](https://tanstack.com/query/latest/docs/react/overview)
- [React Queryとは？状態管理・データ再取得の仕組みを作ろう](https://musclecoding.com/react-query/?fbclid=IwAR3AX21wQVYg-OOMP8mB3csskgs_bqJYRLlL9us8TSszvhd9Fjb18khStdc)
- [React Queryを状態管理ライブラリとして使い倒そう！/useQStateのススメ](https://qiita.com/uehaj/items/4e41e294181b3771e77a)
- [React Query-基礎知識編 〜 テスト編](https://zenn.dev/akineko/articles/8c047c3473aed0)
- [React 状態管理ツールの沼にハマった話](https://zenn.dev/mitsuruokura/articles/f6073c61b944ea)
