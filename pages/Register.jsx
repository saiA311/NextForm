import Axios from "../components/Axios";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import Styles from "../styles/Register.module.css";
import Header from "../components/Header";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const [value, setValue] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [isSame, setIsSame] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const ChangeHandel = (e) => {
    setValue({ ...value, [e.target.id]: e.target.value });
  };

  const EmailValidator = (e) => {
    const values = e.target.value;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(String(values).toLocaleLowerCase())) {
      return setEmailValid(true);
    }

    return setEmailValid(false);
  };

  const Enabler = () => {
    if (isSame === false) {
      return true;
    } else if (emailValid === false) {
      return true;
    }

    return false;
  };

  const HandelClear = () => {
    setValue({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };
  const route = useRouter();
  const SubmitHandeler = async (e) => {
    e.preventDefault();
    if (/^[a-zA-Z0-9_]{6,}$/.test(String(value.password)) === false) {
      return alert(
        "password must contain an uppercase, lowercase, number and should be 6 digits"
      );
    } else if (emailValid === false) {
      return alert("Please enter a valid email id");
    }
    try {
      const responsedata = await axios.post("/api/register", {
        name: value.name,
        username: value.username,
        email: value.email,
        password: value.password,
      });
      alert(responsedata.data);
      route.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={Styles.register}>
      <Header path="/" direction="For Login" style={Styles.app_header} />
      <div className={Styles.form_container}>
        <form onSubmit={SubmitHandeler}>
          <TextField
            fullWidth
            id="name"
            label="Full Name"
            type="text"
            variant="outlined"
            onChange={ChangeHandel}
            value={value.name}
            required
          />
          <TextField
            fullWidth
            id="username"
            label="Username"
            type="text"
            variant="outlined"
            onChange={ChangeHandel}
            value={value.username}
            required
          />
          <TextField
            fullWidth
            error={!emailValid}
            id="email"
            label="email"
            type="email"
            variant="outlined"
            onChange={(e) => {
              ChangeHandel(e);
              EmailValidator(e);
            }}
            value={value.email}
            required
            onBlur={() => {
              emailValid === false &&
                alert("You have entered an invalid email address!");
            }}
          />
          <TextField
            fullWidth
            id="password"
            label="password"
            type="password"
            variant="outlined"
            title="The password must contain an uppercase, lowercase, number and should be 6 digits"
            onChange={ChangeHandel}
            value={value.password}
            onBlur={(e) => {
              if (/^[a-zA-Z0-9_]{6,}$/.test(String(e.target.value)) === false) {
                alert(
                  "The password must contain an uppercase, lowercase, number and should be 6 digits"
                );
              }
            }}
            required
          />
          <TextField
            fullWidth
            error={!isSame}
            id="confirmpassword"
            label="Confirm password"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setIsSame(e.target.value === value.password ? true : false);
            }}
            required
          />
          <div className="btns">
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              disabled={Enabler()}
              onClick={SubmitHandeler}
            >
              Submit
            </Button>
            <Button variant="outlined" onClick={HandelClear} color="secondary">
              Clear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
