import axios from 'axios';

// [FIXME] パラメータにlimitを受け取って取得件数を指定する
export const readAllPosts = () => {
  return axios.get(`${process.env.REACT_APP_DEFAULT_API_PATH}/posts`)
  .then(res => {
    return res.data
  })
  .catch((e) => {
    console.log('-- readAllPosts --')
    console.error(e)
  })
}
