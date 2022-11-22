import { useEffect, useState } from 'react';
import { readAllPosts } from './apis/posts';
import PostCards from './components/PostCards';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([] as any[]);

  useEffect(() => {
    readAllPosts().then((data) => {
      setPosts(data);
      console.log(data);
    }).catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <h1>Posts</h1>
      <PostCards posts={posts} />
      <button onClick={() => readAllPosts().then((data) => setPosts([...posts, ...data]))}>click me</button>
    </div>
  );
}

export default App;
