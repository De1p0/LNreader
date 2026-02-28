import { Routes, Route, useLocation } from "react-router-dom";
import Library from "../pages/Library";
import Settings from "../pages/Settings";


export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<Library />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/browse" element={<Browse />} />
            <Route path="/history" element={<History />} />
            <Route path="/search" element={<Search />} /> */}
        </Routes>
    );
}                          