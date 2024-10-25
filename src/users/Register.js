import { Field, Formik, Form } from "formik";
import baseAxios, { METHOD_HTTP } from "../config/baseAxios";
import { useNavigate } from "react-router-dom";

export function Register() {
    const navigate = useNavigate();
    
    const register = async (values) => {
        try {
            console.log("Data register", values);
            let data = await baseAxios(METHOD_HTTP.POST, "/register", values);
            console.log("Data", data);
            navigate("/login")
            alert(data.message)
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <>
        <h1>Register</h1>
        <Formik
        initialValues={{
            username: "",
            password:"",
            dob: "",
            email: "", 
            image: ""
        }}
        onSubmit={register}
        >
            <Form>
                <Field type="text" placeholder="Tên tài khoản" name="username"/>
                <Field type="password" placeholder="Mật khẩu" name="password"/>
                <Field type="date" placeholder="Ngày sinh" name="dob"/>
                <Field type="text " placeholder="Ảnnh đại diện" name="image"/>
                <Field type="email " placeholder="Email" name="email"/>
                <button>Đăng ký</button>
            </Form>
        </Formik>
        </>
    )
}