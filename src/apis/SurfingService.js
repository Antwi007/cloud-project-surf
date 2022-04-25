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

  getSurfAccountDetails = async (userId) => {
    // var data = '{\n    "user_id":"' + userId + '"\n}';
    var data = '';

    var config = {
      method: 'get',
      url: 'https://usvfzvu80m.execute-api.us-east-1.amazonaws.com/development/user/accountDetails?user_id=' + userId,
      headers: { },
      data : data
    };

    const resp = await axios(config);
    console.log("done", resp)
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

    const resp = await axios(config);
    console.log("done", resp)
  }

  putSurfingAccount = async (userId, accountDetails) => {
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
    let baseURL = "https://surfworld-user-profile-pics.s3.amazonaws.com/" + userId;

    var config = {
      method: 'get',
      url: baseURL,
    };

    const resp = await axios(config);
    console.log("done", resp)
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
    console.log("done", resp)
  }
}

export default SurfingService;
