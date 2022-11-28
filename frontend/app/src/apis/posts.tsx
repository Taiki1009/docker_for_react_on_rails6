import axios from 'axios';

// GET
export const readPost = (id: number) => {
  return axios.get(`${process.env.REACT_APP_DEFAULT_API_PATH}/posts/${id}`)
  .then(res => {
    return res.data;
  }).catch((e) => {
    console.log('-- readPost --');
    console.log(e);
  })
}
