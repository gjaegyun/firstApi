import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URL = 'https://port-0-hello-board-f02w2almh8gdgs.sel5.cloudtype.app/api/post';

function Post () {

    const [inputTitle, setInputTitle] = useState('');
    const [inputContent, setInputContent] = useState('');
    const [response, setResponse] = useState(null);    

    const navigate = useNavigate();

    const sendPost = () => {
        
        axios.post(URL, { title: inputTitle, content: inputContent
        })
        .then((response) => {
            setResponse(response.data);
            navigate(`/`)
        })
        .catch((error) => {
            console.log('오류 :', error);
        });
    }
    return(
        <>
            <div>안녕</div>
            <div>여따 작성해라</div>

            <input
                type="text"
                placeholder='Title'
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder='Content'
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
            />

            <button onClick={sendPost}>전송</button>

        </>
    )
}

export default Post;