import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostModal from './components/PostModal';
import './App.css';
import './styles/post.css';
import { PostType } from './types/post';
import PostCard from './components/PostCard';

const App = () => {
  const [postList, setPostList] = useState([] as any[]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [displayButton, setDisplayButton] = useState(true);

  // GET ALL
  // limit:  取得件数
  const readPostList = (limit: number) => {
    return axios.get(`${process.env.REACT_APP_DEFAULT_API_PATH}/posts?limit=${limit}`)
    .then((res) => {
      setPostList(res.data.results);
      setDisplayButton(res.data.hasNext);
      console.log(`hasNext: ${res.data.hasNext}, postLength: ${res.data.results.length}`);
    })
    .catch((e) => {
      console.log('-- readPostList --');
      console.error(e);
    })
  };

  // POST
  const createPost = () => {
    return axios.post(`${process.env.REACT_APP_DEFAULT_API_PATH}/posts`,
      { post: { title: postTitle, content: postContent } }
    ).then((res) => {
      setPostList([res.data.results, ...postList]);
      setPostTitle('');
      setPostContent('');
    }).catch((e) => {
      console.log('-- createPost --');
      console.log(e);
    })
  }

  // DELETE
  const deletePost = (id: string) => {
    return axios.delete(`${process.env.REACT_APP_DEFAULT_API_PATH}/posts/${id}`)
    .then(res => {
      setPostList(postList.filter((post) => post.id !== id));
      handleDisplayModal();
      console.log(res.data.status);
    }).catch((e) => {
      console.log('-- deletePost --');
      console.log(e);
    })
  }

  const handleDisplayModal = () => setOpenModal(!openModal);
  const changePostTitle = (e: React.ChangeEvent<HTMLInputElement>) => setPostTitle(e.target.value);
  const changePostContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPostContent(e.target.value);
  const addTenPosts = () => readPostList(postList.length + 10);

  useEffect(() => {
    const initialPostLength = 5;
    readPostList(initialPostLength);
  }, []);

  return (
    <>
      { openModal && <PostModal post={postList[0]} closeModal={handleDisplayModal} deletePost={deletePost} /> }
      <div className="App">
        <h1>Posts</h1>
        <div className="form">
          <label className='form__label'>title: <input type="text" name="title" className='form__input' onChange={changePostTitle} /></label>
          <label className='form__label'>content: <textarea name="content" className='form__input' onChange={changePostContent} /></label>
          <button className='button' type="submit" onClick={() => createPost()}>Create</button>
        </div>
        <div className="cards">
          {
            postList.map((post: PostType) =>
              <div key={post.id}>
                <PostCard post={post} openModal={handleDisplayModal} />
              </div>
            )
          }
        </div>
        { displayButton && <button onClick={addTenPosts}>Add 10 Posts</button> }
      </div>
    </>
  );
}

export default App;
