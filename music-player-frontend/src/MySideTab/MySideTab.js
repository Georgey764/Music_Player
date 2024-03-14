import { HomeRounded, SearchRounded, Search } from "@mui/icons-material";
import "./MySideTab.css";
import Music from "./../MusicComp/Music.js";

export default function MySideTab({ dataObj }) {
  return (
    <aside style={{ padding: "0.5rem 0.5rem 0 0.5rem" }} id="side_tab">
      <NavigationTab />
      <Library dataObj={dataObj} />
    </aside>
  );
}

function NavigationTab() {
  return (
    <nav>
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          borderRadius: "0.5rem",
          background: "#121212",
          margin: "0 0 0.5rem 0",
          height: "110px",
        }}
      >
        <li>
          <div className="NavButton">
            <HomeRounded className="NavIcon" />
            <span className="NavText">Home</span>
          </div>
        </li>
        <li>
          <div className="NavButton">
            <SearchRounded className="NavIcon" />
            <span className="NavText">Search</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

function Library({ dataObj }) {
  return (
    <section
      style={{
        background: "#121212",
        height: "calc(100% - 118px)",
        borderRadius: "0.5rem",
        padding: "2rem",
      }}
    >
      <h2 style={{ color: "white", marginTop: "0rem" }}>Your Library</h2>
      <div
        style={{
          margin: "0",
          padding: "0",
          position: "relative",
          display: "inline-block",
          width: "100%",
        }}
      >
        <Search
          color="primary"
          style={{
            position: " absolute",
            top: "50%",
            left: "2%",
            transform: "translateY(-50%)",
            width: "20px",
            color: "lightgray",
          }}
        />
        <input
          type="text"
          className="search_bar"
          placeholder="Search your Liked Music"
          style={{
            padding: "0.4rem 0.4rem 0.4rem 2rem",
            height: "20px",
            color: "lightgray",
            fontSize: "0.8rem",
            width: "calc(100% - 2.9rem)",
            borderRadius: "0.8rem",
            background: "#4B4C4C",
            border: "none",
          }}
        />
      </div>
    </section>
  );
}
