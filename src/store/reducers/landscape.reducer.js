import ACTION_TYPES from "../actions/type.action";

const initialState = {
  mouseCoordinates: { x: 0, y: 0 },
  cameraCoordinates: { x: 0, y: 0 },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.UPDATE_MOVE_POSITION:
      return {
        ...state,
        mouseCoordinates: { ...payload },
      };
    case ACTION_TYPES.UPDATE_CAMERA_POSITION:
      return {
        ...state,
        cameraCoordinates: payload,
      };

    default:
      return state;
  }
};

export default reducer;
