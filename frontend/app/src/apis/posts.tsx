import axios from 'axios';

// GET ALL
export const readPostList = (limit: number = 4, offset: number = 0) => {
  return axios.get(`${process.env.REACT_APP_DEFAULT_API_PATH}/posts?limit=${limit}&offset=${offset}`,)
  .then(res => {
    return res.data;
  })
  .catch((e) => {
    console.log('-- readPostList --');
    console.error(e);
  })
}

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

// CREATE
export const createPost = (title: string, content: string) => {
  return axios.post(`${process.env.REACT_APP_DEFAULT_API_PATH}/posts`,
    {
      post: {
        title: title,
        content: content
      }
    }
  ).then(res => {
    return res.data;
  }).catch((e) => {
    console.log('-- createPost --');
    console.log(e);
  })
}

// UPDATE
export const updatePost = (id: number, title: string, content: string) => {
  return axios.put(`${process.env.REACT_APP_DEFAULT_API_PATH}/posts/${id}`,
    {
      parameter: {
        title: title,
        content: content
      }
    }
  )
  .then(res => {
    return res.data;
  }).catch((e) => {
    console.log('-- updatePost --');
    console.log(e);
  })
}

// DELETE
export const deletePost = (id: number) => {
  return axios.delete(`${process.env.REACT_APP_DEFAULT_API_PATH}/posts/${id}`)
  .then(res => {
    return res.data;
  }).catch((e) => {
    console.log('-- deletePost --');
    console.log(e);
  })
}
