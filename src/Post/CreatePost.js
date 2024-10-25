import { Field, Form, Formik } from "formik";
import baseAxios, { METHOD_HTTP } from "../config/baseAxios";

export function CreatePost() {
    const currentDate = new Date().toISOString().split('T')[0];
    const username = "ten_dang_nhap";


    const create = async (values) => {
        try {
            await baseAxios(METHOD_HTTP.POST, "/posts", values)
            alert("Thêm sản phẩm thành công")
        } catch (e) {
            alert(e)
        }
    }
    return (
        <>
            <h1>Đăng bài viết</h1>
            <Formik
                initialValues={{
                    title: "",
                    username: username,
                    createAt: currentDate,
                    content: "",
                    status: "",
                    type: ""
                }}
                onSubmit={create}
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
                    <button>Đăng bài</button>
                </Form>
            </Formik>
        </>
    )
}