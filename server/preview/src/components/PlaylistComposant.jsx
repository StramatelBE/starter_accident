import React, { useEffect, useState, useRef } from "react";
import useSocketData from "../stores/socketDataStore";
import AccidentComposant from "./AccidentComposant";

function PlaylistComposant() {
  const { socketData } = useSocketData();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const medias = socketData.playlist.medias;
    if (medias.length === 0) return;

    const currentMedia = medias[currentMediaIndex];
    if (!currentMedia) return;

    const duration = currentMedia.duration * 1000;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % medias.length);
    }, duration);

    return () => clearInterval(intervalRef.current);
  }, [currentMediaIndex, socketData.playlist.medias.length]);

  const currentMedia = socketData.playlist.medias[currentMediaIndex];
  if (!currentMedia) return null;

  const mediaPath = `${import.meta.env.VITE_REACT_APP_FRONT_URL}${
    currentMedia?.path
  }`;

  return (
    <div>
      {currentMedia?.type === "video" ? (
        <video
          className="medias"
          src={mediaPath}
          onError={() =>
            setCurrentMediaIndex(
              (prevIndex) => (prevIndex + 1) % socketData.playlist.medias.length
            )
          }
          autoPlay
          muted
          loop
          preload="auto"
        />
      ) : currentMedia?.type === "image" ? (
        <img
          className="medias"
          src={mediaPath}
          onError={() =>
            setCurrentMediaIndex(
              (prevIndex) => (prevIndex + 1) % socketData.playlist.medias.length
            )
          }
          alt={currentMedia?.original_file_name}
        />
      ) : (
        currentMedia?.type === "accident" && <AccidentComposant />
      )}
    </div>
  );
}

export default PlaylistComposant;
