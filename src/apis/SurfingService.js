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

  getSurfDetails = async (params) => {
    try {
      const queryParams = Object.keys(params)
        .map((param) => param + "=" + (params[param]))
        .join("&");

      const resp = await axios.get(
        `${this.url}/development/surf-score?${queryParams}`
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

  sendEmail = async (params) => {
    try {

      const body =  {
        "user_id": params["user_id"],
        "type": params["type"],
        "body": params["body"]
      }

      const resp = await axios.post(
        `${this.url}/development/send_email`, body
      );
            
      if (resp.status !== 200) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getSurfAccountDetails = async (userId) => {
    // var data = '{\n    "user_id":"' + userId + '"\n}';
    var data = '';

    var config = {
      method: 'get',
      url: 'https://usvfzvu80m.execute-api.us-east-1.amazonaws.com/development/user/accountDetails?user_id=' + userId,
      headers: {},
      data: data
    };

    const resp = await axios(config);
    console.log("surfing account details", resp)
    return resp;
  }

  createSurfingAccount = async (userId) => {
    console.log(userId)
    var data = '{\n    "user_id":"' + userId + '",\n    "details": {}\n}'

    var config = {
      method: 'put',
      url: 'https://usvfzvu80m.execute-api.us-east-1.amazonaws.com/development/user/accountDetails',
      headers: {
        'Content-Type': 'text/plain'
      },
      data: data
    };

    console.log("creating new account", resp)
    const resp = await axios(config);
  }

  putSurfingAccount = async (userId, accountDetails) => {
    console.log("putting surfing account info")
    var data = '{\n    "user_id":"' + userId;
    data += '",\n    "details": {\n        "location": "' + accountDetails.location;
    data += '",\n        "fullName": "' + accountDetails.fullName;
    data += '",\n        "title": "' + accountDetails.title;
    data += '",\n        "mantra": "' + accountDetails.mantra;
    data += '"\n    }\n}';

    var config = {
      method: 'put',
      url: 'https://usvfzvu80m.execute-api.us-east-1.amazonaws.com/development/user/accountDetails',
      headers: {
        'Content-Type': 'text/plain'
      },
      data: data
    };

    const resp = await axios(config);
    console.log("done", resp)
  }

  getProfilePic = async (userId) => {
    try {
      let baseURL = "https://surfworld-user-profile-pics.s3.amazonaws.com/" + userId;

      var config = {
        method: 'get',
        url: baseURL,
      };

      await axios(config);

      return baseURL;
    }
    catch {
      return null;
    }
  }

  putProfilePic = async (userId, image) => {
    let baseURL = "https://usvfzvu80m.execute-api.us-east-1.amazonaws.com/development/profilepic/" + userId;

    console.log(image)

    var config = {
      method: 'put',
      url: baseURL,
      headers: {
        'Content-Type': image.type,
      },
      data: image
    };

    const resp = await axios(config);
  }

  getFavorites = async (userId) => {
      let baseURL = "https://usvfzvu80m.execute-api.us-east-1.amazonaws.com/development/user/favorites?user_id=" + userId;

      var config = {
        method: 'get',
        url: baseURL,
      };

      var favs = await axios(config);
      favs = favs.data.filter((f) => {
        return f !== '[object Object]'
      })

      return favs;
  }

  putFavorites = async (userId, beachId) => {
    var data = '{\n    "user_id":"';
    data += userId + '",\n    "beach_id": "';
    data += beachId + '"\n}';

    var config = {
      method: 'put',
      url: 'https://usvfzvu80m.execute-api.us-east-1.amazonaws.com/development/user/favorites',
      headers: {
        'Content-Type': 'text/plain'
      },
      data: data
    };

    const resp = await axios(config);
  }

  deleteFavorites = async (userId, beachId) => {
    var data = '{\n    "user_id":"';
    data += userId + '",\n    "beach_id": "';
    data += beachId + '"\n}';

    var config = {
      method: 'delete',
      url: 'https://usvfzvu80m.execute-api.us-east-1.amazonaws.com/development/user/favorites',
      headers: {
        'Content-Type': 'text/plain'
      },
      data: data
    };

    const resp = await axios(config);
  }

  getFavoriteLocation = async (surfId) => {

    let baseURL = "https://usvfzvu80m.execute-api.us-east-1.amazonaws.com/development/get_favorite?id=" + surfId;

    var config = {
      method: 'get',
      url: baseURL,
      headers: { }
    };

    const resp = await axios(config);

    return resp.data.body;
  }
}

export default SurfingService;
