import '../styles/post.css'

// [FIXME] カード自体をクリックすると詳細のモーダルを表示する
const PostCards = ({ posts }: { posts: any[] }) => {
  const clickFunc = () => {
    console.log('clicked!');
  }

  return (
    <div className="cards" onClick={() => clickFunc()}>
      {
        posts.map((post: any, index: number) =>
          <section className="card" key={index}>
            <div className="card-content">
              <h1 className="card-title">タイトル：{post.title}</h1>
              <p className="card-text">内容：{post.content}</p>
              <p className="card-date">作成日時：{post.created_at}</p>
            </div>
          </section>
        )
      }
    </div>
  )
}

export default PostCards
