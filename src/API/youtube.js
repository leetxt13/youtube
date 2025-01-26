export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }
  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: 'snippet', id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }
  async relatedVideos(channelId) {
    return this.apiClient
      .playlist({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          channelId,
          order: 'date',
        },
      })
      .then((res) => res.data.items.map((item) => ({ ...item, id: item.id })));
  }
  async #searchByKeyword(keyword) {
    //mock데이터이므로 keyword는 실제로 필요 X
    return this.apiClient
      .search({
        params: { part: 'snippet', maxResults: 25, type: 'video', q: keyword },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
          regionCode: 'KR',
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id })));
  }
}
