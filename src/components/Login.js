import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo } from ".";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const [member, setMember] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setMember({ ...member, name: e.target.value });
    }
    if (e.target.name === "email") {
      setMember({ ...member, email: e.target.value });
    }
    if (e.target.name === "password") {
      setMember({ ...member, password: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = member;
    if (!email || !password || (!isMember && !name)) {
      toast.error("please fill out all the fields");
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setMember({ ...member, isMember: !member.isMember });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{member.isMember ? "login" : "register"}</h3>
        {!member.isMember && (
          <div className="form-row">
            <label className="form-label" htmlFor="name">
              name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={member.name}
              className="form-input"
              onChange={handleChange}
            />
          </div>
        )}
        <div className="form-row">
          <label className="form-label" htmlFor="email">
            email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={member.email}
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={member.password}
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-block">
          submit
        </button>
        {member.isMember ? (
          <p>
            not a member yet?{" "}
            <button className=" member-btn" onClick={toggleMember}>
              register
            </button>
          </p>
        ) : (
          <p>
            already a member?{" "}
            <button className=" member-btn" onClick={toggleMember}>
              login
            </button>
          </p>
        )}
      </form>
    </Wrapper>
  );
};

export default Register;
