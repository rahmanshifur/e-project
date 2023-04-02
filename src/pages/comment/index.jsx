import { useStoreState } from 'easy-peasy';
import { dateTime } from "../../utils/helper";
import { Fragment } from "react";
import Create from "./create";
import noImg from '../../assets/img/no-image.jpg'



function Comment({ productId, commentId, setCommentId }) {

    const commentData = useStoreState(state => state.comment.data)
    const userData = useStoreState(state => state.user.data)


    return (
        <div>
            <Create productId={productId} commentId={commentId} />
            <div id='comment'>
                {commentData.length !== 0 && commentData.map((item) => item.productId === productId && !item.commentId &&
                    <div key={item.id} className='comment-content'>
                        <div className='mine-comment '>

                            <div className='comment-user'>
                                {userData.map(user => user.id === item.userId &&
                                    <Fragment key={user.id}>
                                        <img className='rounded-circle' src={noImg} alt='userImg' />
                                        <div className="comment-username">
                                            <div className='comment-user-content px-3'>
                                                {user.username}
                                                <p className='comment-date text-muted'>{dateTime(item.date)}</p>
                                                <p className='comment-body'>{item.body}</p>
                                            </div>
                                            <button className='comment-btn' onClick={() => setCommentId(item.id)}>Reply</button>
                                        </div>
                                    </Fragment>
                                )}
                            </div>
                        </div>

                        {commentData.map(reply => reply.commentId === item.id &&
                            <div className='reply-comment mx-5'>
                                {userData.map(user => user.id === reply.userId &&
                                    <Fragment key={user.id}>
                                        <img className='rounded-circle' src={noImg} alt='userImg' />
                                        <div className="reply-username">
                                            <div className="reply-user-reply px-3">
                                                {user.username}
                                                <p className='reply-date'>{dateTime(reply.date)}</p>
                                                <p className='reply-body'>{reply.body}</p>
                                            </div>
                                            <button className='reply-btn' onClick={() => setCommentId(reply.id)}>Reply</button>
                                        </div>
                                    </Fragment>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment