import React, { useEffect, useState } from 'react';
import { readPostList, createPost } from './apis/posts';
import PostCard from './components/PostCard';
import PostModal from './components/PostModal';
import './App.css';
import './styles/post.css';
import { PostType } from './types/post';

const App = () => {
  const [postList, setPostList] = useState([] as any[]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [displayButton, setDisplayButton] = useState(true);

  // limit: 取得件数
  const readPosts = (limit: number = 5) => {
    readPostList(limit).then(({ results, hasNext }) => {
      setPostList(results);
      setDisplayButton(hasNext);

      console.log(`hasNext: ${hasNext}, postLength: ${results.length}`);
    }).catch((e) => console.log(e));
  };

  const submitNewPost = () => {
    createPost(postTitle, postContent).then(({ results }) => {
      setPostList([results, ...postList]);
    }).catch((e) => console.log(e));
  };

  const handleDisplayModal = () => setOpenModal(!openModal);
  const changePostTitle = (e: React.ChangeEvent<HTMLInputElement>) => setPostTitle(e.target.value);
  const changePostContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPostContent(e.target.value);
  const addTenPosts = () => readPosts(postList.length + 10);

  useEffect(() => {
    readPosts();
  }, []);

  return (
    <>
      { openModal && <PostModal post={postList[0]} closeModal={handleDisplayModal} /> }
      <div className="App">
        <h1>Posts</h1>
        <div className="form">
          <label className='form__label'>title: <input type="text" name="title" className='form__input' onChange={changePostTitle} /></label>
          <label className='form__label'>content: <textarea name="content" className='form__input' onChange={changePostContent} /></label>
          <button className='button' type="submit" onClick={submitNewPost}>Create</button>
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
