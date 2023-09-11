import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo } from "../components";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMember({ ...member, [name]: value });
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

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{member.isMember ? "login" : "register"}</h3>
        {!member.isMember && (
          <FormRow
            type="name"
            labelText="name"
            name="name"
            value={member.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          labelText="email"
          name="email"
          value={member.email}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          labelText="password"
          name="password"
          value={member.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            )
          }
        >
          demo
        </button>
        {member.isMember ? (
          <p>
            not a member yet?{" "}
            <button type="button" className="member-btn" onClick={toggleMember}>
              register
            </button>
          </p>
        ) : (
          <p>
            already a member?{" "}
            <button
              type="button"
              className=" member-btn"
              onClick={toggleMember}
            >
              login
            </button>
          </p>
        )}
      </form>
    </Wrapper>
  );
};

export default Register;
