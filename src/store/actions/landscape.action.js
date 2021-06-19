import ACTION_TYPE from "./type.action";

export const mouseCoordinates = (event) => async (dispatch) => {
  if (event.changedTouches && event.changedTouches.length) {
    event.x = event.changedTouches[0].clientX;
    event.y = event.changedTouches[0].clientY;
  }
  if (event.x === undefined) {
    event.x = event.clientX;
    event.y = event.clientY;
  }

  let mouseMoveEvent = {
    x: event.x,
    y: event.y,
  };
  dispatch({
    type: ACTION_TYPE.UPDATE_MOVE_POSITION,
    payload: mouseMoveEvent,
  });
};

export const cameraCoordinates = (cameraEvent) => async (dispatch) => {
  dispatch({
    type: ACTION_TYPE.UPDATE_CAMERA_POSITION,
    payload: cameraEvent,
  });
};
