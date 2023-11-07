import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URL = "https://port-0-hello-board-f02w2almh8gdgs.sel5.cloudtype.app";

function Api() {
    const [datas, setDatas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getApi();
    }, []);

    const getApi = () => {
        axios.get(URL + "/api/get")
            .then((data) => {
                const getResult = data.data;
                const finalResult = getResult.sort((a, b) => b.id - a.id);
                setDatas(finalResult);
            })
    }

    const handleButtonClick = (id) => {
        navigate(`/detail/${id}`);
    }

    const handlePostBtnClick = () => {
        navigate(`/api/post`);
    }

    return (
        <div>
            <button onClick={() => handlePostBtnClick()}>Post 게시글</button>
            {datas.map((data) =>
                <div key={data.id} style={{ textAlign: 'center' }}>
                    <div>
                        <button onClick={() => handleButtonClick(data.id)}>
                            <div>제목 : {data.title}</div>
                            <div>좋아요 : {data.likes}</div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Api;