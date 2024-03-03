import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";

import MySideTab from "./MySideTab/MySideTab";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import MainTab from "./MainTab/MainTab";
import { useEffect, useMemo, useState } from "react";

function App() {
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "Georgey",
        songName: "Alag Aasmaan Cover",
        image: "http://localhost:8080/pictures/alag_aasmaan.png",
        songUrl: "http://localhost:8080/songs/alag_aasmaan.wav",
      },
      {
        id: 2,
        name: "Georgey",
        songName: "Self Control Cover",
        image: "http://localhost:8080/pictures/self_control.png",
        songUrl: "http://localhost:8080/songs/self_control.wav",
      },
    ],
    []
  );

  const [currentSong, setCurrentSong] = useState(null);
  const [active, setActive] = useState(false);
  let audio = useMemo(() => {
    return new Audio(data[currentSong - 1]?.songUrl);
  }, [currentSong, data]);

  useEffect(() => {
    if (currentSong === "" || currentSong === null) {
      return;
    }
    audio.play();
    return () => {
      audio.pause();
    };
  }, [audio, currentSong]);

  const obj = {
    currentSong: currentSong,
    setCurrentSong: setCurrentSong,
    audio: audio,
    data: data,
    active: active,
    setActive: setActive,
  };

  return (
    <div style={{ fontFamily: "Roboto", background: "black" }} className="App">
      <MySideTab dataObj={obj} />
      <MainTab dataObj={obj} />
      <MusicPlayer dataObj={obj} />
    </div>
  );
}

export default App;
