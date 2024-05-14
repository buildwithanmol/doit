import { Provider } from '@/utils/providers'
import React from 'react'

const AccountLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}

export default AccountLayout