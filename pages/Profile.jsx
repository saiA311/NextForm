import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useStateValue } from "../components/StateProvider";
import style from "../styles/Profile.module.css";
import jwt from "jsonwebtoken";

function Redirect({ to }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [to]);
  return null;
}

const Profile = () => {
  const [{ jwts, username }] = useStateValue();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  useEffect(() => {
    if (jwts !== "") {
      const json = jwt.decode(jwts);
      setName(json.User.name);
      setEmail(json.User.email);
    }
  }, [jwts]);
  if (jwts === "") {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Header path="/" direction="Logout" style={style.app_header} />
      <h1>Welcome to web, {username}</h1>
      <br />
      <h2>Email: {email}</h2>
      <br />
      <h2>Name: {name}</h2>
    </div>
  );
};

export default Profile;
