import React, { useEffect, useState } from "react";
import InteractiveLandscape from "../InteractiveLandscape/InteractiveLandscape";
import {
  mouseCoordinates,
  cameraCoordinates,
} from "../../store/actions/landscape.action";
import { useDispatch, useSelector } from "react-redux";

function ParentComponent() {
  const dispatch = useDispatch();
  const mouseCoordinate = useSelector(
    (state) => state.landscapeReducer.mouseCoordinates
  );
  const cameraCoordinate = useSelector(
    (state) => state.landscapeReducer.cameraCoordinates
  );

  useEffect(() => {
    initializeMouseEvents();
  }, []);

  const initializeMouseEvents = () => {
    if ("ontouchstart" in window) {
      window.addEventListener("touchmove", onInputMove, { passive: false });
    } else {
      window.addEventListener("mousemove", onInputMove);
    }
  };

  const onInputMove = (event) => {
    event.preventDefault();
    dispatch(mouseCoordinates(event));
  };

  return (
    <div>
      <InteractiveLandscape
        mouseXY={mouseCoordinate}
        cameraXY={cameraCoordinate}
        doomHeight={10}
        speed={3}
        dampingFactor={0.1}
        title='Mirror'
      />
    </div>
  );
}

export default ParentComponent;
