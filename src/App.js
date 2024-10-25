import { Navigate, Route, Routes } from "react-router-dom";
import { ListPost } from "./Post/ListPost";
import { Main } from "./partials/Main";
import { CreatePost } from "./Post/CreatePost";
import { Profile } from "./profiles/Profile";
import { Login } from "./users/Login";
import { Register } from "./users/Register";
import { useContext } from "react";
import { UserContext } from "./Context/useContext";
import { EditPost } from "./Post/EditPost";


function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Routes>
        {user ?
          <>
            <Route path="" element={<Main />}>
              <Route path="post" element={<ListPost />} />
              <Route path="create" element={<CreatePost />} />
              <Route path="profile" element={<Profile />} />
              <Route path="post/:id" element={<EditPost />} />
              <Route path="*" element={<Navigate to="post" replace />} />
            </Route>
          </>
          :
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        }
      </Routes>
    </>
  );
}

export default App;
