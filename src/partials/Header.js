import { Link } from "react-router-dom";

export function Header() {
    return (
        <>
            <Link to={"/post"}>Trang chủ</Link> | |
            <Link to={"/create"}>Đăng bài</Link>
        </>
    )
}