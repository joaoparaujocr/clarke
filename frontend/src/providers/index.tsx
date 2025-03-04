import { ReactNode } from "react"
import ApolloClientProvider from "./ApolloClientProvider"

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => (
  <ApolloClientProvider>
    {children}
  </ApolloClientProvider>
)

export default Providers