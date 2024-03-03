import { Slider, Fab } from "@mui/material";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  VolumeUp,
} from "@mui/icons-material";
import "./MusicPlayer.css";
import { useState, useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: grey,
  },
});

export default function MusicPlayer({ dataObj }) {
  return (
    <ThemeProvider theme={theme}>
      {dataObj.currentSong !== null && dataObj.currentSong !== "" ? (
        <CurrentSongDivision dataObj={dataObj} />
      ) : (
        ""
      )}
      <section id="audio_player_tab" style={{ background: "black" }}>
        <div style={{ width: "170px" }}></div>
        <CenterDivision dataObj={dataObj} />
        <VolumeDivision dataObj={dataObj} />
      </section>
    </ThemeProvider>
  );
}

function CurrentSongDivision({ dataObj }) {
  return (
    <div
      className="current_song_division"
      style={{
        position: "fixed",
        top: "calc(100% - 68px)",
        left: "20px",
        fontWeight: "500",
        width: "400px",
      }}
    >
      (
      <img
        style={{
          margin: "0",
          marginLeft: "0.1rem",
          display: "inline-block",
          objectFit: "cover",
          width: "50px",
          height: "50px",
        }}
        src={dataObj.data[dataObj.currentSong - 1]?.image}
        alt="Current song album cover"
      />
      )
      <span
        style={{
          color: "grey",
          display: "inline-block",
          paddingLeft: "0.8rem",
        }}
      >
        <p style={{ color: "white", margin: "0" }}>
          {dataObj.data[dataObj.currentSong - 1].songName}
        </p>
        <p style={{ fontSize: "0.8rem", margin: "0", marginTop: "0.2rem" }}>
          {dataObj.data[dataObj.currentSong - 1].name}
        </p>
      </span>
    </div>
  );
}

function CenterDivision({ dataObj }) {
  const [currentTime, setCurrentTime] = useState(0);
  const { audio, currentSong, data, active } = dataObj;
  let duration = audio?.duration;

  useEffect(() => {
    let increaseCurrentTime;
    if (active) {
      increaseCurrentTime = setInterval(function () {
        setCurrentTime((cur) => {
          return cur + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(increaseCurrentTime);
    };
  }, [active, setCurrentTime, currentSong, dataObj.data.id]);

  useEffect(() => {
    setCurrentTime((cur) => 0);
  }, [currentSong]);

  function handleClick(e) {
    if (currentSong === "" || currentSong === null) {
      return;
    }
    dataObj.active ? audio.pause() : audio.play();
    dataObj.setActive((cur) => !cur);
  }

  function handleChange(e) {
    audio.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  }

  return (
    <div className="center_division">
      <div className="center_upper_division">
        <SkipPrevious
          style={{ fontSize: "2rem", paddingRight: "1rem" }}
          color="primary"
        />
        <Fab onClick={(e) => handleClick(e)} color="primary" size="small">
          {dataObj.active ? <Pause /> : <PlayArrow />}
        </Fab>
        <SkipNext
          style={{ fontSize: "2rem", paddingLeft: "1rem" }}
          color="primary"
        />
      </div>
      <Slider
        aria-label="time-indicator"
        className="music_bar"
        size="medium"
        value={currentTime ? currentTime : 0}
        min={0}
        step={1}
        max={duration ? duration : 0}
        valueLabelDisplay="auto"
        onChange={(e) => handleChange(e)}
        color="primary"
        sx={{
          height: 4,
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&::before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${
                theme.palette.mode === "dark"
                  ? "rgb(255 255 255 / 16%)"
                  : "rgb(0 0 0 / 16%)"
              }`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
        }}
      />
    </div>
  );
}

function VolumeDivision({ dataObj }) {
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    dataObj.audio.volume = volume / 100;
  }, []);

  function handleChange(e) {
    dataObj.audio.volume = e.target.value / 100;
    setVolume(e.target.value);
  }

  return (
    <div
      className="volume_division"
      style={{ width: "125px", marginRight: "3rem" }}
    >
      <VolumeUp color="primary" />
      <Slider
        aria-label="time-indicator"
        className="music_bar"
        size="medium"
        value={volume}
        min={0}
        step={1}
        max={100}
        valueLabelDisplay="auto"
        onChange={(e) => handleChange(e)}
        color="primary"
      />
    </div>
  );
}
