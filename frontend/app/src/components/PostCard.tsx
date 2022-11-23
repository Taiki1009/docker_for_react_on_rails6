import { PostType } from '../types/post';
import { FormatDatetime } from '../utils/FormatDate';

type PostCardsType = {
  post: PostType,
  clickFunc: any
}

const PostCard = ({ post, clickFunc }: PostCardsType) => {
  return (
    <div onClick={() => clickFunc()}>
      <section className="card" key={post.id}>
        <div className="card-content">
          <h1 className="card-title">タイトル：{post.title}</h1>
          <p className="card-text">内容：{post.content}</p>
          <p className="card-date">作成日時：{FormatDatetime(post.created_at)}</p>
        </div>
      </section>
    </div>
  );
}

export default PostCard
