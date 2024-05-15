import Footer from '@/components/ui/buttons/global/footer'
import CustomHeader from '@/components/ui/buttons/global/header/custom-header'
import { Provider } from '@/utils/providers'
import React from 'react'

const RouteLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
    return (
        <Provider>
            <CustomHeader navList={["Home", "Shop", "Collections", "Categories"]} />
            <main className="md:border-x md:mx-20">{children}</main>
            <Footer/>
        </Provider>
    )
}

export default RouteLayout