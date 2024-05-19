import Header from './Header/Header'
import Footer from './Footer/Footer'

export default function Layout({children}) {
    return <>
        <Header/>
            <div className="bg-white border-1 rounded-lg shadow-md mb-20 mx-4 p-5">
                {children}
            </div>
        <Footer/>
    </>
}

