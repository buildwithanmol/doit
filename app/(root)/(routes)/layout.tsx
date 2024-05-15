import CustomHeader from '@/components/ui/buttons/global/header/custom-header'
import { Provider } from '@/utils/providers'
import React from 'react'

const RouteLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
    return (
        <Provider>
            <CustomHeader navList={["Home", "Shop", "Collections", "Categories"]} />
            <div className="md:flex hidden absolute top-0 bottom-0 left-20 w-[2px] bg-secondary/50"></div>
            <main className="md:px-20 px-2">{children}</main>
            <div className="md:flex hidden absolute top-0 bottom-0 right-20 w-[2px] bg-secondary/50"></div>
        </Provider>
    )
}

export default RouteLayout