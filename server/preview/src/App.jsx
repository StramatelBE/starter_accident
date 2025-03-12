import { useEffect } from "react";
import Editor from "./components/Editor";
import Medias from "./components/Medias";
import useData from "./hooks/useData";
import useSocketData from "./stores/socketDataStore";
import TestComponent from "./components/TestComponent";
function App() {
  const { socketData } = useSocketData();

  useData();

  useEffect(() => {
    console.log("Données actuelles du socket:", socketData);
  }, [socketData]);

  return (
    <div
      style={{
        opacity: socketData?.brightness !== undefined
          ? socketData.brightness === 0
            ? 0
            : socketData.brightness / 10
          : 1,
        zIndex: 9999,
      }}
    >
    
      {socketData?.mode === "media" && (
        <Medias media={socketData.PlaylistItem.media} />
      )}
      {socketData?.mode === "data" && (
        <Editor data={socketData.PlaylistItem.data} />
      )}
      {socketData?.mode === "test" && <TestComponent />}
    </div>
  );
}

export default App;
