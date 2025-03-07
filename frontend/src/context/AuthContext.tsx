import { createContext } from "react";
import { Exact, MeQuery } from "../__generated__/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { Action, IMeState } from "../hooks/useMe";

interface IAuthContext {
  user?: MeQuery['me']
  refetch: (variables?: Partial<Exact<{
    [key: string]: never;
  }>> | undefined) => Promise<ApolloQueryResult<MeQuery>>
  dispatchMe: React.ActionDispatch<[action: Action<keyof IMeState>]>
}

const AuthContext = createContext({} as IAuthContext)

export default AuthContext