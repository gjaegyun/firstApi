import axios from 'axios'
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Api from '../Api';

function DetailPage() {
    const { id } = useParams();
    const [inputTitle, setInputTitle] = useState('');
    const [inputPost, setInputPost] = useState('');
    const [inputContent, setContent] = useState('');
    const [inputName, setName] = useState('');
    const [fixResponse, setFix] = useState(null);
    const [response, setResponse] = useState(null);
    const [likeResponse, setLike] = useState(null);
    const [datas, setDatas] = useState([]);
    const [commentDatas, setCommentData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        realApi();
        getComment();
    }, [id]);


    const realApi = () =>  {
        axios.get(`https://port-0-hello-board-f02w2almh8gdgs.sel5.cloudtype.app/api/info?id=${id}`)
            .then((data)=>{
                const result = data.data;
                setDatas(result)
            })
    }
    
    const deletePost = () => {
        axios.delete(`https://port-0-hello-board-f02w2almh8gdgs.sel5.cloudtype.app/api/delete?id=${id}`)
        .then(response => {
            console.log('잘 된 데이터 : ', response.data);
            navigate(`/`)
        })
        .catch(error => {
            console.log('에러', error);
        })
        .then(() => {

        });
    }

    const fixPost = () => { // api/update
        axios.put(`https://port-0-hello-board-f02w2almh8gdgs.sel5.cloudtype.app/api/update`, {
            id : id,
            title : inputTitle,
            content : inputPost
        })
        .then(response => {
            setFix(response.data);
            navigate(`/`)
        })
        .catch(error => {
            console.log('에러', error);
        })
    }

    const getComment = () => {
        axios.get(`https://port-0-hello-board-f02w2almh8gdgs.sel5.cloudtype.app/api/get/comment?boardId=${id}`)
        .then((response) => {
            const commentData = response.data;
            setCommentData(commentData);
        })
        .catch(error => {
            console.log('에러', error);
        })
    }

    const commentPost = () => {

        axios.post(`https://port-0-hello-board-f02w2almh8gdgs.sel5.cloudtype.app/api/post/comment?boardId=${id}`, 
        { 
            authorName : inputName, 
            content : inputContent
        })
        .then((response) => {
            setResponse(response.date);
        })
        .catch((error) => {
            console.log('오류 :', error);
        });
    }

    const likePost = () => {
        axios.post(`https://port-0-hello-board-f02w2almh8gdgs.sel5.cloudtype.app/api/like`, {
            boardId : id
        })
        .then((response) => {
            setLike(prevLikes => prevLikes + 1);
            console.log(likeResponse);
        })
        .catch((error) => {
            console.log('오류 : ', error);
        })
    }

    return(
        <>
            <div key={id}>
                <h2>detail Page</h2>
                <div>ID : {id}</div>
                <div>Title : {datas.title}</div>
                <div>Likes : {likeResponse}</div>
                <div>Content : {datas.content}</div>

                <p></p>

                <button onClick={likePost}>좋아요</button>

                <p></p>

                <button onClick={deletePost}>Delete</button>

                <p></p>
                
                <div>
                    <h2>수정하기</h2>

                    <input
                        type="text"
                        placeholder='fixTitle'
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                    />

                    <p></p>

                    <input 
                        type="text"
                        placeholder='fixContent'
                        value={inputPost}
                        onChange={(e) => setInputPost(e.target.value)}
                    />

                    <p></p>

                    <button onClick={fixPost}>Complete Soojung</button>
                </div>

                <div>
                    <h2>댓글달기</h2>

                    <input
                        type="text"
                        placeholder="authorName"
                        value={inputName}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <p></p>

                    <input
                        type="text"
                        placeholder="Content"
                        value={inputContent}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <p></p>

                    <button onClick={() => { commentPost(); window.location.reload(true); }}>댓글달기</button>

                </div>
    
                <h2>댓글</h2>
                    {commentDatas.map((comment, i) => (
                        <>
                            <div key = {i}>
                                <div>Author Name : {comment.author_name}</div>
                                <div>content : {comment.content}</div>
                                <div>date : {new Date(comment.date).toLocaleString()}</div> 
                                {/* comment.date를 Date객체로 변환 후에 toLocaleString함수를 이용한다. */}
                                <p></p>
                            </div>
                        </>
                    ))} 
            </div>
        </>
    )
}

export default DetailPage;