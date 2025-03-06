import { ReactNode } from "react"
import ApolloClientProvider from "./ApolloClientProvider"
import { BrowserRouter } from "react-router"
import { Toaster } from "react-hot-toast"
import AuthProvider from "./AuthProvider"

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => (
  <ApolloClientProvider>
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
    <Toaster />
  </ApolloClientProvider>
)

export default Providers