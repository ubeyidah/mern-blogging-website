import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../components/input.component";
import AnimationWrapper from "../common/page-animation";
import { useState } from "react";
import {
  signinValidation,
  signupValidation,
} from "../validation/auth.validation.js";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";
import { authWithGoogle } from "../common/firebase.jsx";
import Spinner from "../components/Spinner.jsx";

const UserAuth = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message") || "";
  const navigate = useNavigate();
  const { user, configUser } = useAuthContext();
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(document.getElementById("auth-form"));
      const authData = {};
      for (let [key, value] of formData.entries()) {
        authData[key] = value;
      }

      if (type == "sign-in") {
        const { error } = signinValidation.validate({
          email: authData.email,
          password: authData.password,
        });
        if (error) return toast.error(error.details[0].message);
      } else if (type == "sign-up") {
        const { error } = signupValidation.validate({
          fullName: authData.fullName,
          email: authData.email,
          password: authData.password,
        });
        if (error) return toast.error(error.details[0].message);
      }
      const { data } = await axios.post(
        `/api/auth/${type.replace("-", "")}`,
        authData
      );
      configUser(data);
      toast.success(`${type.replace("-", " ")} successfull`);
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user } = await authWithGoogle();
      if (!user) return;
      const oauthData = {
        fullName: user.displayName,
        email: user.email,
        profile_img: user.photoURL,
      };

      const { data } = await axios.post("/api/auth/oauth", oauthData);
      configUser(data);
      toast.success(`${type.replace("-", " ")} successfull`);
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form
          className="w-full max-w-[400px] mx-auto"
          onSubmit={submitForm}
          id="auth-form"
        >
          <h1 className="text-3xl font-gelasio capitalize text-center mb-16">
            {type == "sign-in" ? "Welcome back" : "Join us today"}
          </h1>
          {message && (
            <p className="text-center text-red font-bold mb-3 p-3 bg-red/10 rounded-md">
              {message}
            </p>
          )}
          {type != "sign-in" && (
            <Input
              name="fullName"
              icon="user"
              placeholder={"Full Name"}
              type="text"
            />
          )}
          <Input name="email" icon="at" placeholder={"Email"} type="email" />
          <Input
            name="password"
            icon="key"
            placeholder={"Password"}
            type="password"
          />
          <button
            type="submit"
            className="btn-dark mb-14 center w-full rounded-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner className="w-9" /> : type.replace("-", " ")}
          </button>
          <div className="relative w-full flex items-center gap-2 my-10 opacity-30 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>Or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
            onClick={handleGoogleAuth}
            className="btn-dark w-full items-center flex gap-5 justify-center py-4"
            disabled={loading}
          >
            {loading ? (
              <Spinner className="w-9" />
            ) : (
              <>
                <img src="imgs/google.png" alt="google logo" className="w-6" />
                <p>Continue with Google</p>
              </>
            )}
          </button>
          {type == "sign-in" ? (
            <p className="text-right mt-3 text-dark-grey">
              don't have account yet?{" "}
              <Link to="/signup" className="text-twitter hover:underline">
                Sign Up
              </Link>
            </p>
          ) : (
            <p className="text-right mt-3 text-dark-grey">
              Already have an account?{" "}
              <Link to="/signin" className="text-twitter hover:underline">
                Sign In
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuth;
