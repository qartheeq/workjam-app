import axios from 'axios';

class API {
    constructor() {
        this.baseAPI = axios.create({ baseURL: 'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty' });
    }

    getStories() {
        return this.baseAPI.get('locations');
    }

    getLocation(id) {
        return this._api.get(`locations/${id}`);
    }

    getBuildingTypes() {
        return this._api.get('buildingtypes');
    }
}

export default new API();
