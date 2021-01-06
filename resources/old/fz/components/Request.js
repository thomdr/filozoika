import axios from 'axios';
import config from '../config.json';

export default class Request {
  static post = (functionName, data) =>
    axios
      .post(config.serverUrl, { functionName, data })
      .then(response => response.data)
      .catch(() => ({
        error: 1,
        message: 'Error tijdens een server verzoek.'
      }));
  static postFile = data =>
    axios
      .post(config.serverUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => response.data)
      .catch(() => ({
        error: 1,
        message: 'Error tijdens een server verzoek.'
      }));
}
