import { ReactNode } from "react"
import ApolloClientProvider from "./ApolloClientProvider"
import { BrowserRouter } from "react-router"
import { Toaster } from "react-hot-toast"
import AuthProvider from "./AuthProvider"
import AppTheme from "../shared-theme/AppTheme"

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => (
  <ApolloClientProvider>
    <AppTheme>
      <BrowserRouter>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </AppTheme>
  </ApolloClientProvider>
)

export default Providers