import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache(),
});

interface ApolloClientProviderProps {
  children: ReactNode
}

const ApolloClientProvider = ({ children }: ApolloClientProviderProps) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

export default ApolloClientProvider