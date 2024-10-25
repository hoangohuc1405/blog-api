import { Field, Form, Formik } from "formik";
import baseAxios, { METHOD_HTTP } from "../config/baseAxios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/useContext";

export function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const getUser = async () => {
        let data = await baseAxios(METHOD_HTTP.GET, `/users/get-profile`)
        setUser(data)
    }

    const login = async (values) => {
        try {
            let data = await baseAxios(METHOD_HTTP.POST, "/login", values);
            localStorage.setItem("token", data.token)
            await getUser();
            navigate("/post")
        } catch (error) {
            alert(error);
        }
    }
    return (
        <>
            <h1>Đăng nhập</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={login}
            >
                <Form>
                    <Field type="text" name="username" placeholder="Tên đăng nhập" />
                    <Field type="password" name="password" placeholder="Mật khẩu" />
                    <Link to="/register">Đăng ký tài khoản</Link>
                    <button>Đăng nhập</button>
                </Form>
            </Formik>
        </>
    )
}