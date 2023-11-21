// TODO：useQueryの理解のために、一旦このカスタムhookは使わずに、各コンポーネントで都度実装する

// import { QueryKey, useQuery } from "@tanstack/react-query";
// import { Dispatch, SetStateAction } from "react";

// export function useQState<T>(key: QueryKey, initial?: T): [T, Dispatch<SetStateAction<T>>] {
//   const stateValue = useQuery<T>(key, {
//     enabled: false
//   })
// }