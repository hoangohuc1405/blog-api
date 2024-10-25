import { useEffect, useState } from "react"
import baseAxios, { METHOD_HTTP } from "../config/baseAxios";
import "../css/Post.css"
import { useNavigate } from "react-router-dom";

export function ListPost() {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const List = async () => {
            const res = await baseAxios(METHOD_HTTP.GET, "/posts")
            setPost(res)
        }
        List();
    }, [])
    const handleDelete = (id) => {
        try {
        baseAxios(METHOD_HTTP.DELETE, "/posts/" + id)
        setPost(prev => prev.filter(item => item.id !== id) )
    }catch(e) {
        console.log(e)
    }
}

    const handleEdit = (id) => {
        navigate("/post/" + id)
    }

    return (
        <>
            <div className="post-list">
                {post.map((item) => (
                    <div key={item.id} className="post-item">
                        <h4 className="post-title">{item.title}</h4>
                        <p className="post-content">{item.username}</p>
                        <p className="post-content">{item.createAt}</p>
                        <span className="post-status">{item.status}</span>
                        <span className="post-type">{item.type}</span>
                        <p className="post-content">{item.content}</p>
                        <select
                            className="post-dropdown"
                            onChange={(e) => {
                                if (e.target.value === "delete") {
                                    handleDelete(item.id);
                                } else if (e.target.value === "edit") {
                                    handleEdit(item.id)
                                }
                                e.target.value = ""; 
                            }}
                        >
                            <option value="">Chọn hành động</option>
                            <option value="edit">Chỉnh sửa</option>
                            <option value="delete">Xóa</option>
                        </select> | |
                        <button className="btn-react">Like</button>
                    </div>
                ))}
            </div>
        </>
    )

}