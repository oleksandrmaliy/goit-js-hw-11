import axios from 'axios';

export default class ApiService {
  static ENDPOINT = 'https://pixabay.com/api/';
  static API_KEY = '35869427-65f66342165db7316d77cd90d';

  constructor() {
    this.query = '';
    this.page = 1;
  }

  getfetchPhoto() {
    const url = `${ApiService.ENDPOINT}?key=${ApiService.API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    return axios.get(url).then(data => {
      this.incrementPage();
      return data.data;
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
