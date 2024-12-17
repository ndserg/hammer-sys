import {
  LOAD_CLIENTS,
  SET_CLIENTS,
  DELETE_CLIENT,
  SHOW_CLIENTS_ERROR_MESSAGE,
  HIDE_CLIENTS_ERROR_MESSAGE
} from '../constants/Clients';

export const loadClients = () => {
  return {
    type: LOAD_CLIENTS
  };
};

export const setClients = (clients) => {
  return {
    type: SET_CLIENTS,
    payload: clients
  };
};

export const deleteClient = (id) => {
  return {
    type: DELETE_CLIENT,
    id
  };
};

export const showClientsErrorMessage = (message) => {
  return {
    type: SHOW_CLIENTS_ERROR_MESSAGE,
    message
  };
};

export const hideClientsErrorMessage = () => {
  return {
    type: HIDE_CLIENTS_ERROR_MESSAGE,
  };
};