import { HomeRounded, SearchRounded } from "@mui/icons-material";
import "./MySideTab.css";

export default function MySideTab() {
  return (
    <aside style={{ padding: "0.5rem 0.5rem 0 0.5rem" }} id="side_tab">
      <NavigationTab />
      <Library />
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

function Library() {
  return (
    <section
      style={{
        background: "#121212",
        height: "calc(100% - 118px)",
        borderRadius: "0.5rem",
      }}
    ></section>
  );
}
