import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Side_bar from "./side/Side_bar";

export default function Layout({ children }) {
  return (
    <section className="w-[95%] m-auto">
      <Header />
        <Side_bar />
      <div className="bg-white border-1 rounded-lg shadow-md p-5 relative">
        {children}
      </div>
      {/* <Footer/> */}
    </section>
  );
}
