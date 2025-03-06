import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { useEffect, useReducer } from "react";
import { MeQuery } from "../__generated__/graphql";

interface IMeState {
  user?: MeQuery['me']
}

type Action<T extends keyof IMeState> = {
  field: T;
  value: IMeState[T];
};


const AUTH_ME = gql(`
  query Me {
    me {
      id
      email
      firstName
      lastName
      type
    }
  }
`)

const reducer = (state: IMeState, action: Action<keyof IMeState>) => {
  return {
    ...state,
    [action.field]: action.value
  }
}

const useMe = () => {
  const [state, dispatch] = useReducer(reducer, { user: undefined })
  const { data, loading, error, refetch } = useQuery(AUTH_ME, {
    errorPolicy: 'all'
  })

  useEffect(() => {
    if (!loading && data?.me) {
      dispatch({ field: 'user', value: data?.me })
    }
  }, [data?.me, loading])

  return { ...state, loading, error, refetch }
}

export default useMe