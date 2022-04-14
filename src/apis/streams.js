import axios from 'axios';

export default axios.create({
  baseURL: 'http://cloud-project-frontend.s3-website-us-east-1.amazonaws.com'
});
