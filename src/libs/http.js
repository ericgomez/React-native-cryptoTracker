class Http {
  // Creamos una instancia Http
  static instance = new Http();

  get = async url => {
    try {
      // Obtenemos una respuesta de la url
      const request = await fetch(url);

      // Converimos la respuesta a json
      const json = await request.json();
      return json;
    } catch (err) {
      console.error('HTTP GET Error: ', err);
      throw Error(err);
    }
  };

  post = async (url, body) => {
    try {
      // Obtenemos una respuesta de la url
      const request = await fetch(url, {
        method: 'POST',
        body,
      });

      // Converimos la respuesta a json
      const json = await request.json();
      return json;
    } catch (err) {
      console.error('HTTP POST Error: ', err);
      throw Error(err);
    }
  };

  remove = async url => {
    try {
      const request = await fetch(url, {
        method: 'DELETE',
      });
      const json = await request.json();
      return json;
    } catch (err) {
      console.error('HTTP DELETE Error: ', err);
      throw Error(err);
    }
  };

  put = async (url, body) => {
    try {
      const request = await fetch(url, {
        method: 'PUT',
        body,
      });
      const json = await request.json();
      return json;
    } catch (err) {
      console.error('HTTP PUT Error: ', err);
      throw Error(err);
    }
  };
}

export default Http;
