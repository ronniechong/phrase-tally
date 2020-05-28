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
    const query = '?h={"$orderby":{"count": -1, "lastupdate": 1}}';
    const url = `${this.host}${path}${query}`;
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

  async addPost(text) {
    const path = '/posts';

    const sanitise = (string) => {
      const map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          // '"': '&quot;',
          // "'": '&#x27;',
          // "/": '&#x2F;',
      };
      const reg = /[&<>"'/]/ig;
      return string.replace(reg, (match) => (map[match]));
    }

    const data = {
      text: sanitise(text),
      count: 1,
      lastupdate: new Date(),
    }
    return await this.apiCall(path, 'post', data);
  }

  async deletePost(id) {
    const path = `/posts/${id}`;
    return await this.apiCall(path, 'delete');
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