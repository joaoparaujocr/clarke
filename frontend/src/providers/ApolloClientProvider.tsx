import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { ReactNode } from 'react';

interface ApolloClientProviderProps {
  children: ReactNode
}

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_API_ENDPOINT}/graphql`,
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: ApolloClientProviderProps) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

export default ApolloClientProvider