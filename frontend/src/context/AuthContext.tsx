import { createContext } from "react";
import { Exact, MeQuery } from "../__generated__/graphql";
import { ApolloQueryResult } from "@apollo/client";

interface IAuthContext {
  user?: MeQuery['me']
  refetch: (variables?: Partial<Exact<{
    [key: string]: never;
  }>> | undefined) => Promise<ApolloQueryResult<MeQuery>>

}

const AuthContext = createContext({} as IAuthContext)

export default AuthContext