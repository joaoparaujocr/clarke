import { ReactNode } from "react"
import ApolloClientProvider from "./ApolloClientProvider"
import { BrowserRouter } from "react-router"
import { Toaster } from "react-hot-toast"

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => (
  <ApolloClientProvider>
    <BrowserRouter>
      {children}
    </BrowserRouter>
    <Toaster />
  </ApolloClientProvider>
)

export default Providers