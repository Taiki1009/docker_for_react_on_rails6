import { PostType } from "../types/post"
import { FormatDatetime } from '../utils/FormatDate'
import Overlay from "./Overlay"

type PostModalTypes = {
  post: PostType,
  closeModal: any
}

const PostModal = ({ post, closeModal }: PostModalTypes) => {
  return (
    <Overlay closeModal={closeModal}>
      <div className="post-modal">
        <h1 className="post-modal-title">{post.title}</h1>
        <p className="post-modal-date">{FormatDatetime(post.created_at)}</p>
        <p className="post-modal-content">{post.content}</p>
      </div>
    </Overlay>
  );
}

export default PostModal
