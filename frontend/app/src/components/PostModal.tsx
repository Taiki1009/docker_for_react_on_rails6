import axios from 'axios'
import { useState } from 'react'
import { PostType } from "../types/post"
import { FormatDatetime } from '../utils/FormatDate'
import Overlay from "./Overlay"

type PostModalTypes = {
  post: PostType,
  closeModal: any,
  deletePost: any
}

const PostModal = ({ post, closeModal, deletePost }: PostModalTypes) => {
  const [postTitle, setPostTitle] = useState(post.title);
  const [postContent, setPostContent] = useState(post.content);

  const [openEdit, setOpenEdit] = useState(false);

  const changePostTitle = (e: React.ChangeEvent<HTMLInputElement>) => setPostTitle(e.target.value);
  const changePostContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPostContent(e.target.value);

  const updatePost = () => {
    return axios.patch(`${process.env.REACT_APP_DEFAULT_API_PATH}/posts/${post.id}`,
      { post: { title: postTitle, content: postContent } }
    ).then(res => {
      setOpenEdit(false);
      setPostTitle(res.data.results.title);
      setPostContent(res.data.results.content);
      console.log(res.data.results);
    }).catch((e) => {
      console.log('-- updatePost --');
      console.log(e);
    })
  }

  if (openEdit) {
    return (
      <Overlay closeModal={closeModal}>
        <div className="post-modal">
          <div className="form">
            <label className='form__label'>title: <input type="text" name="title" className='form__input' value={postTitle} onChange={changePostTitle} /></label>
            <label className='form__label'>content: <textarea name="content" className='form__input' value={postContent} onChange={changePostContent} /></label>
          </div>
          <p className="post-modal-date">{FormatDatetime(post.created_at)}</p>

          <button onClick={updatePost}>update</button>
        </div>
      </Overlay>
    );
  } else {
    return (
      <Overlay closeModal={closeModal}>
        <div className="post-modal">
          <h1 className="post-modal-title">{postTitle}</h1>
          <p className="post-modal-date">{FormatDatetime(post.created_at)}</p>
          <p className="post-modal-content">{postContent}</p>

          <button onClick={() => setOpenEdit(!openEdit)}>edit</button>
          <button onClick={() => deletePost(post.id)}>delete</button>
        </div>
      </Overlay>
    );
  }
}

export default PostModal
