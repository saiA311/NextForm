import styles from "../styles/Home.module.css";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import jwt from "jsonwebtoken";
import { useStateValue } from "../components/StateProvider";
import { useRouter } from "next/router";
import Header from "../components/Header";
import axios from "axios";
export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ jwts, username }, dispatch] = useStateValue();
  const router = useRouter();
  const SubmitHandeler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/api/login", {
        email: email,
        password: password,
      });
      const json = jwt.decode(data.data.token);
      dispatch({
        type: "ADD_TOKEN",
        item: {
          jsonwt: data.data.token,
          username: json.User.username,
        },
      });
      alert("welcome user " + json.User.username);
      router.push("/Profile");
    } catch (error) {
      alert("authentication error: invalid user or password");
    }
  };
  return (
    <div className={styles.container}>
      <Header
        path="/Register"
        direction="For Register"
        style={styles.app_header}
      />
      <div className={styles.login}>
        <div className={styles.login_form_container}>
          <form onSubmit={SubmitHandeler}>
            <TextField
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label="email"
              type="text"
              variant="outlined"
              required
            />
            <TextField
              id="password"
              label="password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <Button variant="outlined" onClick={SubmitHandeler} color="primary">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
