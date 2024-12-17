import fetch from 'auth/FetchInterceptor';

const addAvatarsToClients = (data) => {
  let clients = null;

  if (Array.isArray(data)) {
    clients = data.map((client) => {
      return {...client, 'img':`/img/avatars/thumb-${client.id + 1}.jpg`}
    })
  } else {
    clients = {...data, 'img':`/img/avatars/thumb-${data.id}.jpg`};
  }

  return clients;
}

const clientsService = {
  getClients: async () => {
    const data = await fetch({
      url: '/users',
      method: 'get',
    });

    const clients = addAvatarsToClients(data);

    return clients;
  },

  getClientById: async (id, onSuccess, onError) => {
    try {
      const data = await fetch({
        url: `/users/${id}`,
        method: 'get',
      });

      const client = addAvatarsToClients(data);

      onSuccess(client);
    } catch(err) {
      onError(err.message);
    }
  },

  deleteClient: async (id) => {
    const data = await fetch({
      url: '/users',
      method: 'get',
    });

    const filteredClients = data.filter((client) => {
      return client.id !== id
    })
    
    const clients = addAvatarsToClients(filteredClients);

    return clients;
  },
};

export default clientsService
