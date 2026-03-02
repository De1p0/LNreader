
import "./App.css";
import TitleBar from "./components/layout/TitleBar";
import Sidebar from "./components/layout/SideBar";
import AppRoutes from "./routes/AppRoutes";
import { applyTheme } from './stores/configStore';
import "./ExtensionHandler/SourceLoader"
import { getSourceList, loadSource } from "./ExtensionHandler/SourceLoader";
import { useEffect } from "react";
function App() {
  applyTheme("system"); // to prevent instant light mode as default





  return (

    <div className="w-screen h-screen flex flex-row overflow-hidden relative bg-surface">
      <Sidebar />


      <div className="flex-1 flex flex-col bg-surface ml-13">

        <TitleBar />

        <main className="flex-1 bg-background rounded-tl-2xl text-black">
          {/* this is for SPA, redirecting to pages ruins UX */}
          <AppRoutes />
        </main>

      </div>
    </div>
  );
}

export default App;
