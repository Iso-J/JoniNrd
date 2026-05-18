import React from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import { CDN_BASE } from "./config";
import { useState } from "react";

function Pelit({ toggled }) {
  const { t, i18n } = useTranslation("global");
  const [activeGame, setActiveGame] = useState(null);

  return (
    <>
      <div className="app">
        <div className="tietoa">
          <div className={`background`}>
            <div className="title">{t("header.pelit")}</div>
            <div className="content">
              <div className="title">Take care of horse</div>
              <br></br>
              <div>
                <img
                src={`${CDN_BASE}/images/horsey.png`}
                className={`banner ${toggled ? "dark" : ""}`}
              ></img>
              <p>{t("pelit.takecareofhorsedesc")}</p>
              </div>
              <div className={`game ${toggled ? "dark" : ""}`}>
                {activeGame !== "horse" ? (
                  <button
                    className={`navButton ${toggled ? "dark" : ""}`}
                    onClick={() => setActiveGame("horse")}
                  >
                    Play Take Care of Horse
                  </button>
                ) : (
                  <>

                    <iframe
                      src="webglunity/Takecareofhorse/index.html"
                      width="1280"
                      height="765"
                    />
                    <br></br>
                    <button
                      className={`navButton ${toggled ? "dark" : ""}`}
                      onClick={() => setActiveGame(null)}
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
              <div className="title"></div>
              <div className="title">Take care of horse</div>
              <br></br>
              <div>
                <img
                src={`${CDN_BASE}/images/horsey.png`}
                className={`banner ${toggled ? "dark" : ""}`}
              ></img>
              <p>{t("pelit.takecareofhorsedesc")}</p>
              </div>
              <div className={`game ${toggled ? "dark" : ""}`}>
                {activeGame !== "horse2" ? (
                  <button
                    className={`navButton ${toggled ? "dark" : ""}`}
                    onClick={() => setActiveGame("horse2")}
                  >
                    Play Take Care of Horse
                  </button>
                ) : (
                  <>

                    <iframe
                      src="webglunity/Takecareofhorse/index.html"
                      width="1280"
                      height="765"
                    />
                    <br></br>
                    <button
                      className={`navButton ${toggled ? "dark" : ""}`}
                      onClick={() => setActiveGame(null)}
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Pelit;
