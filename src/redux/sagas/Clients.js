import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	LOAD_CLIENTS,
	DELETE_CLIENT,
} from '../constants/Clients';
import {
	setClients,
	showClientsErrorMessage
} from "../actions/Clients";

import clientsService from 'services/ClientsService';

export function* loadClients() {
  yield takeEvery(LOAD_CLIENTS, function* () {
		try {
			const clients = yield call(clientsService.getClients);
			yield put(setClients(clients));
		} catch (err) {
			yield put(showClientsErrorMessage(err.message));
		}
	});
}

export function* deleteClientById() {
  yield takeEvery(DELETE_CLIENT, function* ({id}) {
		try {
			const clients = yield call(clientsService.deleteClient, id);
			yield put(setClients(clients));
		} catch (err) {
			yield put(showClientsErrorMessage(err.message));
		}
	});
}

export default function* rootSaga() {
  yield all([
		fork(loadClients),
		fork(deleteClientById),
  ]);
}
