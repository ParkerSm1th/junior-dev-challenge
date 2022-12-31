import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

type Point = {
  x: number;
  y: number;
};

function App() {
  const [removedPoints, setRemovedPoints] = useState<Point[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY }]);
  };

  const undoPoint = () => {
    const lastPoint = points.pop();
    if (lastPoint) {
      setRemovedPoints([...removedPoints, lastPoint]);
    }
  };

  const redoPoint = () => {
    const lastPoint = removedPoints.pop();
    if (lastPoint) {
      setPoints([...points, lastPoint]);
    }
  };

  const clear = () => {
    setPoints([]);
    setRemovedPoints([]);
  };

  // Check for the user clicking command + z
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key === "z") {
        e.preventDefault();
        redoPoint();
        return;
      }

      if (e.metaKey && e.key === "z") {
        e.preventDefault();
        undoPoint();
      }

      if (e.metaKey && e.key === "c") {
        e.preventDefault();
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undoPoint, redoPoint, clear]);

  return (
    <>
      <div className="SourceBar">
        <div
          onClick={() =>
            window.open("https://github.com/ParkerSm1th/junior-dev-challenge")
          }
        >
          Source Code
        </div>
      </div>

      <div className="ControlBar">
        <div
          className={points.length > 0 ? "" : "disabled"}
          onClick={undoPoint}
        >
          Undo
        </div>
        <div
          className={removedPoints.length > 0 ? "" : "disabled"}
          onClick={redoPoint}
        >
          Redo
        </div>
        <div
          className={
            points.length == 0 && removedPoints.length == 0 ? "disabled" : ""
          }
          onClick={clear}
        >
          Clear
        </div>
      </div>
      <div className="App" onClick={handleClick}>
        {points.length == 0 && (
          <div className="CTATextWrapper">
            <div className="CTAText">
              <h1>Click anywhere to add a point</h1>
              <h2>
                a project made by{" "}
                <a href="https://parkersmith.io">Parker Smith</a>
              </h2>
              <div className="CTAKeys">
                {[
                  {
                    keys: ["⌘", "Z"],
                    description: "Undo point",
                  },
                  {
                    keys: ["⌘", "⇧", "Z"],
                    description: "Redo point",
                  },
                  {
                    keys: ["⌘", "C"],
                    description: "Clear point",
                  },
                ].map((key, index) => (
                  <div key={index} className="Key">
                    <div className="KeyDesc">{key.description}</div>
                    <div className="Keys">
                      {key.keys.map((key, index) => (
                        <div key={index} className="KeyItem">
                          {key}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {points.map((point, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: point.y - 7.5,
              left: point.x - 7.5,
            }}
            className="Circle"
          />
        ))}
      </div>
    </>
  );
}

export default App;
