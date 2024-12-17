import {
  LOAD_CLIENTS,
  SET_CLIENTS,
  DELETE_CLIENT,
  SHOW_CLIENTS_ERROR_MESSAGE,
  HIDE_CLIENTS_ERROR_MESSAGE
} from '../constants/Clients';

const clientsState = {
  data: null,
  isLoading: false,
  showMessage: false,
  messageText: '',
}

const clients = (state = clientsState, action) => {
	switch (action.type) {
		case LOAD_CLIENTS:
			return {
				...state,
				isLoading: true
			};
    case SET_CLIENTS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case DELETE_CLIENT:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    case SHOW_CLIENTS_ERROR_MESSAGE:
      return {
        ...state,
        isLoading: false,
        showMessage: true,
        messageText: action.message
      };
    case HIDE_CLIENTS_ERROR_MESSAGE: 
      return {
        ...state,
        messageText: '',
        showMessage: false
      };
    default:
      return state;
    }
};

export default clients;
