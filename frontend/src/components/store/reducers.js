import { combineReducers } from 'redux';
import axios from 'axios'

const GET_IMAGE_LOADING = 'GET_IMAGE_LOADING';
const GET_IMAGE_SUCCESS = 'GET_IMAGE_SUCCESS';
const GET_IMAGE_ERROR = 'GET_IMAGE_ERROR';

export function getImageLoading(bool) {
  return {
    type: GET_IMAGE_LOADING,
    loading: bool
  };
}

export function getImageSuccess(imageData) {
  return {
    type: GET_IMAGE_SUCCESS,
    imageData
  };
}

export function getImageError(bool) {
  return {
    type: GET_IMAGE_ERROR,
    error: bool
  };
}

export function getImage(url) {
  const api_path = `/api/getImage`

  return (dispatch) => {
    dispatch(getImageLoading(true));
    axios.post(api_path)
    .then(res => {
      return res.data;
    })
    .then((data) => {
      dispatch(getImageSuccess(data.items))
      dispatch(getImageLoading(false));
    })
    .catch(() => dispatch(getImageError(true)));
  };
}

export function error(state = false, action) {
  switch (action.type) {
    case GET_IMAGE_ERROR:
      return action.error;
    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case GET_IMAGE_LOADING:
      return action.loading;
    default:
      return state;
  }
}

export function imageData(state = [], action) {
  console.log(state, action)
  switch (action.type) {
    case GET_IMAGE_SUCCESS:
      return action.imageData;
    default:
      return state;
  }
}

export default combineReducers({
  loading,
  imageData,
  error,
});
