import { ThemeProvider } from "@emotion/react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Fab, createTheme } from "@mui/material";

import "./MainTab.css";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#131313",
      light: "#131313",
      dark: "#131313",
      contrastText: "#fff",
    },
  },
});

export default function MainTab({ dataObj }) {
  return (
    <main id="main_tab" style={{ padding: "0.5rem 0.5rem 0 0rem" }}>
      <div
        style={{
          background: "rgb(38,36,36)",
          background:
            "linear-gradient(158deg, rgba(47,45,45,1) 0%, rgba(15,15,15,1) 82%, rgba(2,0,36,1) 100%)",
          filter:
            'progid:DXImageTransform.Microsoft.gradient(startColorstr="#2f2d2d",endColorstr="#020024",GradientType=1)',
          height: "100%",
          width: "100%",
          borderRadius: "0.5rem",
        }}
      >
        <SearchPage dataObj={dataObj} />
      </div>
    </main>
  );
}

function SearchPage({ dataObj }) {
  return (
    <ThemeProvider theme={theme}>
      <SearchHeader />
      <h3 style={{ marginLeft: "2rem", color: "white", fontSize: "2rem" }}>
        Your Results
      </h3>
      <SearchBody dataObj={dataObj} />
    </ThemeProvider>
  );
}

function SearchHeader() {
  const [query, setQuery] = useState("");

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div
      className="search_page_container"
      style={{
        padding: "1rem 2rem 2rem 1rem",
      }}
    >
      <Fab style={{ marginLeft: "0.5rem" }} size="small" color="primary">
        <ArrowBackIos style={{ paddingLeft: "8px", color: "lightgray" }} />
      </Fab>
      <Fab style={{ marginLeft: "0.5rem" }} size="small" color="primary">
        <ArrowForwardIos style={{ paddingLeft: "0.5px", color: "lightgray" }} />
      </Fab>
      <input
        value={query}
        onChange={(e) => {
          handleQueryChange(e);
        }}
        type="text"
        id="search_bar"
        placeholder="Search for Artists"
        style={{
          padding: "1.2rem 1.5rem 1.2rem 1.5rem",
          color: "lightgray",
          fontSize: "1rem",
          marginLeft: "0.5rem",
          width: "300px",
          borderRadius: "2rem",
          background: "#4B4C4C",
          border: "none",
        }}
      />
    </div>
  );
}

function SearchBody({ dataObj }) {
  return (
    <section
      style={{
        padding: "1rem 2rem 2rem 2rem",
        width: "100%",
        height: "calc(100% - 170px)",
        overflow: "hidden",
      }}
    >
      {dataObj.data.map((obj) => (
        <Music dataObj={{ ...dataObj, ...obj }} key={obj.id} />
      ))}
    </section>
  );
}

function Music({ dataObj }) {
  const { setCurrentSong } = dataObj;

  function handleClick(e) {
    if (
      Number(e.target.closest(".music_result").getAttribute("data-id")) ===
      dataObj.currentSong
    ) {
      dataObj.audio.play();
      dataObj.setActive((cur) => true);
    } else {
      dataObj.setActive((cur) => true);
      setCurrentSong((cur) => dataObj.id);
    }
  }

  return (
    <div
      onClick={handleClick}
      className="music_result"
      data-id={dataObj.id}
      style={{ fontWeight: "500", display: "block", borderRadius: "0.3rem" }}
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
    </div>
  );
}
