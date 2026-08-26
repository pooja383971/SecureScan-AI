import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import "./MainLayout.css";

function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="layout">
                <Sidebar />
                <main className="content">
                    {children}
                </main>
            </div>
        </>
    );
}

export default MainLayout;