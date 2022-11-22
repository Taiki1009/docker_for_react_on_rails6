import { useEffect, useState } from 'react';
import { readAllPosts } from './apis/posts';
import PostCard from './components/PostCard';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    readAllPosts().then((data) => {
      setPosts(data);
      console.log(data);
    }).catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <h1>Posts</h1>
      <div className="cards">
        { posts.map((post: any, index: number) => <PostCard post={post} />) }
      </div>
      <button onClick={() => readAllPosts().then((data)=> console.log(data))}>click me</button>
    </div>
  );
}

export default App;
