import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';

interface ApolloClientProviderProps {
  children: ReactNode
}

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_API_ENDPOINT}/graphql`,
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: ApolloClientProviderProps) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

export default ApolloClientProvider