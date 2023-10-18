import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import Auth from "./components/Auth";
import { UserProfile } from "./components/User/UserProfile";
import AdminPage from "./components/Admin/AdminPage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

type AuthContextProps = {
  user: User | null;
};

const AuthContext: React.FC<AuthContextProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIfUserIsAdmin = async (uid: string) => {
    const adminRef = doc(db, "admins", uid);
    const adminSnap = await getDoc(adminRef);
    return adminSnap.exists();
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const isUserAdmin = await checkIfUserIsAdmin(user.uid);
        setIsAdmin(isUserAdmin);
        if (isUserAdmin) {
          navigate(`/admin`);
        } else {
          navigate(`/user/${user.uid}`);
        }
      })();
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path={`/`} element={<Auth />} />
      <Route path={`/user/:userId`} element={<UserProfile />} />
      <Route path={`/admin`} element={<AdminPage />} />
    </Routes>
  );
};

export default AuthContext;
