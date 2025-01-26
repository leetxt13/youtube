import axios from 'axios';

export default class FakeYoutube {
  //   constructor() {}

  async search({ params }) {
    return params.channelId
      ? axios.get('/videos/channel.json')
      : axios.get('/videos/search.json');
  }
  async videos() {
    return axios.get('/videos/popular.json');
  }
  async channels() {
    return axios.get('videos/channel.json');
  }
}
