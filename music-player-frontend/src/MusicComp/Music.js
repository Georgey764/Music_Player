import { FavoriteBorder, Pause, PlayArrow } from "@mui/icons-material";
import "./Music.css";
import { Fab } from "@mui/material";

export default function Music({ dataObj }) {
  const { setCurrentSong } = dataObj;

  function handleClick(e) {
    console.log(e.target.closest(".play") === null);
    if (
      Number(e.target.closest(".music_result").getAttribute("data-id")) ===
        dataObj.currentSong &&
      e.target.closest(".like") === null &&
      e.target.closest(".play") === null
    ) {
      dataObj.audio.play();
      dataObj.setActive((cur) => true);
    } else if (e.target.closest(".play") !== null) {
      return;
    } else if (e.target.closest(".like") !== null) {
      return;
    } else {
      dataObj.setActive((cur) => true);
      setCurrentSong((cur) => dataObj.id);
    }
  }

  function handlePlayButtonClick() {
    dataObj.setCurrentSong(() => dataObj.id);
    if (
      dataObj.currentSong === dataObj.id ||
      dataObj.currentSong === null ||
      (dataObj.id !== dataObj.currentSong && !dataObj.active)
    ) {
      dataObj.setActive((cur) => !cur);
    }
    dataObj.active ? dataObj.audio.pause() : dataObj.audio.play();
  }

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: " center",
        width: "calc(100% - 5rem)",
        padding: "0.5rem",
        fontWeight: "500",
        borderRadius: "0.3rem",
        position: "relative",
      }}
      className="music_result"
      data-id={dataObj.id}
    >
      <img
        style={{
          margin: "0",
          marginLeft: "0.1rem",
          display: "inline-block",
          objectFit: "cover",
          width: "50px",
          height: "50px",
          borderRadius: "0.3rem",
          verticalAlign: "middle",
        }}
        src={dataObj.image}
        alt="Current song album cover"
      />
      <span
        style={{
          display: "inline-block",
          paddingLeft: "1.5rem",
          verticalAlign: "middle",
        }}
      >
        <p style={{ color: "white", margin: "0" }}>{dataObj.songName}</p>
        <p
          style={{
            color: "lightgrey",
            fontSize: "0.8rem",
            margin: "0",
            marginTop: "0.2rem",
          }}
        >
          {dataObj.name}
        </p>
      </span>
      <Fab
        size="small"
        onClick={() => {
          handlePlayButtonClick();
        }}
        className="play"
        style={{
          transform: "scale(0.8)",
          position: "absolute",
          left: "calc(100% - 60px)",
        }}
      >
        {dataObj.active && dataObj.currentSong === dataObj.id ? (
          <Pause />
        ) : (
          <PlayArrow />
        )}
      </Fab>
      <FavoriteBorder
        className="like"
        size="medium"
        onClick={() => console.log("liked")}
        style={{
          position: "absolute",
          left: "calc(100% - 100px)",
        }}
      />
    </div>
  );
}
