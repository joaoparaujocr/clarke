import { ReactNode } from "react"
import ApolloClientProvider from "./ApolloClientProvider"
import { BrowserRouter } from "react-router"

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => (
  <ApolloClientProvider>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </ApolloClientProvider>
)

export default Providers