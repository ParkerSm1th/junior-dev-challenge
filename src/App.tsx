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
