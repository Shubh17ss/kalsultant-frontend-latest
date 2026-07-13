'use client'
import { FormContextProvider } from '../context/formContext'
import { Toaster } from 'react-hot-toast'
import { RouteProgress } from '../components/routeProgress/routeProgress'

export function Providers({ children }) {
    return (
        <FormContextProvider>
            <RouteProgress />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
        </FormContextProvider>
    )
}
