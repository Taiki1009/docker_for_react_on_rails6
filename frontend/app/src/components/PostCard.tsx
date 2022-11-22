import '../styles/post.css'

const PostCard = ({ post }: { post: any }) => {
  return (
    <section className="card">
      <div className="card-content">
        <h1 className="card-title">タイトル：{post.title}</h1>
        <p className="card-text">内容：{post.content}</p>
        <p className="card-date">作成日時：{post.created_at}</p>
      </div>
    </section>
  )
}

export default PostCard
