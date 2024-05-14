import { Provider } from '@/utils/providers'
import React from 'react'

const RouteLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}

export default RouteLayout