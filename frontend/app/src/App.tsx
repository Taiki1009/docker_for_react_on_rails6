import { useEffect, useState } from 'react';
import { readAllPosts } from './apis/posts';
import PostCard from './components/PostCard';
import PostModal from './components/PostModal';
import './App.css';
import './styles/post.css';
import { PostType } from './types/post';

const App = () => {
  const [posts, setPosts] = useState([] as any[]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    readAllPosts().then((data) => {
      setPosts(data);
      console.log(data);
    }).catch((e) => console.log(e));
  }, []);

  return (
    <>
      { openModal && <PostModal post={posts[0]} closeModal={() => setOpenModal(false)} /> }
      <div className="App">
        <h1>Posts</h1>
        <div className="cards">
          {
            posts.map((post: PostType) =>
              <div key={post.id}>
                <PostCard post={post} clickFunc={() => setOpenModal(!openModal)} />
              </div>
            )
          }
        </div>
        <button onClick={() => readAllPosts().then((data) => setPosts([...posts, ...data]))}>Add 10 Posts</button>
      </div>
    </>
  );
}

export default App;
