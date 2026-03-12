
import "./App.css";
import "./stores/themes/themes.css";
import TitleBar from "./components/layout/TitleBar";
import Sidebar from "./components/layout/SideBar";
import AppRoutes from "./routes/AppRoutes";
import "./ExtensionHandler/SourceLoader"
import { getSourceList, loadSource } from "./ExtensionHandler/SourceLoader";
import { useEffect } from "react";
import { corFetch } from "./coreFetch";
import { SourceResponse } from "./types/ExtensionData";
import { applyTheme, useConfigStore } from "./stores/configStore";

function App() {
  const { config, setConfig } = useConfigStore();


  useEffect(() => {
    applyTheme(config.theme); // to prevent instant light mode as default


    const handleExtensionLoad = async () => {
      const extensions = await Promise.all(
        config.sources.map(async (source: SourceResponse) => {
          const ExtensionClass = await loadSource(source.script);
          let extension = new ExtensionClass(corFetch);

          return extension
        })
      );

      console.log(extensions, "Loading installed extensions: ", JSON.stringify(extensions));

      setConfig("installedSources", extensions);
    };
    handleExtensionLoad()
  }, [])



  return (

    <div className="w-screen h-screen flex flex-row overflow-hidden relative bg-surface">
      <Sidebar />


      <div className="flex-1 flex flex-col bg-surface ml-13">

        <TitleBar />

        <main className="flex-1 bg-background rounded-tl-2xl text-black overflow-scroll scrollbar-hide">
          {/* this is for SPA, redirecting to pages ruins UX */}
          <AppRoutes />
        </main>

      </div>
    </div>
  );
}

export default App;
