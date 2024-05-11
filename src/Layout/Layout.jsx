import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Layout({children}) {
    return <>
        <Header/>
            <div className="bg-white border-1 rounded-lg shadow-md mt-20 mb-20 mx-4 p-2">
                {children}
            </div>
        <Footer/>
    </>
}

