import { Field, Form, Formik } from "formik";
import baseAxios, { METHOD_HTTP } from "../config/baseAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditPost() {
    const { id } = useParams();
    const [oldData, setOlData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await baseAxios(METHOD_HTTP.GET, `/posts/${id}`);
                setOlData(res);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, [id])

    const handleEdit = (id, data) => {
        try {
            baseAxios(METHOD_HTTP.PUT, "/posts/" + id, data)
            navigate("/post")
        } catch(e) {
            console.error("Error editing post:", e);
        }
    }
    return (
        <>
            <h1>Edit Post</h1>
            <Formik
                initialValues={{
                    title: oldData.title,
                    content: oldData.content,
                    status: oldData.status,
                    type: oldData.type
                }}
                onSubmit={(values) => {
                    handleEdit(id, values);
                }}
            >
                <Form>
                    <Field type="text" name="title" placeholder="Tiêu đề" />
                    <Field type="textarea" name="content" placeholder="Nội dung" />
                    <Field as="select" name="status">
                        <option value="">Chọn trạng thái</option>
                        <option value="public">Công khai</option>
                        <option value="private">Riêng tư</option>
                    </Field>
                    <Field type="text" name="type" placeholder="Thể loại" />
                    <button>Chỉnh sửa</button>
                </Form>
            </Formik>
        </>
    )
}