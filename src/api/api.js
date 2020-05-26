import axios from 'axios';
class Api {
  constructor(config = {}) {
    this.host = config.host || undefined;
    this.key = config.key || undefined;
    if (!this.host) {
      throw new Error('No Host path defined');
    }
    if (!this.key) {
      throw new Error('No API key defined');
    }
    this.headers = {
      'cache-control': 'no-cache',
      'x-apikey': this.key,
      'content-type': 'application/json',
    }
  }

  async apiCall(path, method = 'get', data = undefined) {
    const url = `${this.host}${path}`;
    return axios(
      {
        data,
        headers: this.headers,
        method,
        url,
      }
    )
    .then((response) => response)
    .catch((error) => error);
  }

  async getPosts(id = undefined) {
    const path = id ? `/posts/${id}` : '/posts';
    return await this.apiCall(path);
  }

  async addTally(id, count = 1) {
    const path = `/posts/${id}`;
    const data = {
      '$inc': {
        count,
      },
      lastupdate: new Date(),
    }
    return await this.apiCall(path, 'put', data);
  }
}

export default Api;