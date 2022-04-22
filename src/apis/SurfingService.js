import axios from 'axios';

class SurfingService {

  url;
  constructor() {

    if (!SurfingService.instance) {
      SurfingService.instance = this;
    }
    SurfingService.instance = this;

    this.url = "https://usvfzvu80m.execute-api.us-east-1.amazonaws.com"
  }

  getSurfData = async (params) => {
    try {
      const queryParams = Object.keys(params)
        .map((param) => param + "=" + (params[param]))
        .join("&");

      const resp = await axios.get(
        `${this.url}/development/search?${queryParams}`
      );
      
      if (resp.status !== 200) {
        return false;
      }
      return resp.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

}

export default SurfingService;
