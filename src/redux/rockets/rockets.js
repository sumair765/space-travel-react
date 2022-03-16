// Variables
const ADD_RESERVATION = 'space-travelers/rockets/ADD_ROCKET_RESERVATION';
const REMOVE_RESERVATION = 'space-travelers/rockets/REMOVE__ROCKET_RESERVATION';
const GET_ROCKETS = 'space-travelers/rockets/GET_ROCKETS';
const baseURL = 'https://api.spacexdata.com/v3/rockets';

// initial state - Array
const initialState = [];

// Action Creators
export const addRocketReservation = (payload) => ({
  type: ADD_RESERVATION,
  payload,
});

export const removeRocketReservation = (payload) => ({
  type: REMOVE_RESERVATION,
  payload,
});

export const getRockets = (payload) => ({
  type: GET_ROCKETS,
  payload,
});

// Functions -Thunk action

export const fetchRocketsAPI = () => async (dispatch) => {
  await fetch(`${baseURL}`)
    .then((response) => response.json())
    .then((rocketsList) => {
      const arrangedList = rocketsList.map((rocket) => ({
        id: rocket.rocket_id,
        name: rocket.rocket_name,
        type: rocket.rocket_type,
        flickr_images: rocket.flickr_images,
        reservation: false,
      }));
      if (arrangedList) {
        dispatch(getRockets(arrangedList));
      }
    });
};

// Function - Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESERVATION: {
      const newState = state.map((rocket) => {
        if (rocket.id !== action.id) return rocket;
        return { ...rocket, reserved: true };
      });
      return [...newState];
    }
    case REMOVE_RESERVATION: {
      const newState = state.map((rocket) => {
        if (rocket.id !== action.id) return rocket;
        return { ...rocket, reserved: false };
      });
      return [...newState];
    }
    case GET_ROCKETS:
      return [...action.payload];
    default:
      return state;
  }
};

export default reducer;
