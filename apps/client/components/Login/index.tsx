"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../Button";
import "./index.scss";
import { useDispatch } from "react-redux";
import { handleLogin } from "@/redux/userSlice";
import Cookies from "js-cookie";
import axiosClient from "@/config/axiosConfig";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "design-system";

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState<string>("");

  const loginMutate = useMutation(
    (data: any) => {
      return axiosClient.post("/auth/local", data);
    },
    {
      onSuccess: (res) => {
        dispatch(handleLogin(res.data));
        Cookies.set("token", res.data.jwt, {
          expires: 7,
          sameSite: "strict",
          secure: true,
        });
        router.push("/");
      },
      onError: (error: any) => {
        setError(error.response.data.error.message);
      },
    }
  );

  const { handleSubmit, handleBlur, handleChange, touched, errors, values } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: Yup.object({
        username: Yup.string()
          .required("Required")
          .min(6, "Must be 6 characters or more"),
        password: Yup.string()
          .required("Required")
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            "Password must be more than 8 characters, contain at least 1 number"
          ),
      }),
      onSubmit: async (values) => {
        const data = {
          password: values.password,
          identifier: values.username,
        };
        loginMutate.mutate(data);
      },
    });

  return (
    <div className="login-modal">
      <div className="login-head">Đăng nhập</div>
      <form action="" className="login-form">
        <div className="login-item">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            placeholder="nhập username..."
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username && (
            <p className="errorMsg"> {errors.username} </p>
          )}
        </div>
        <div className="login-item">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            placeholder="nhập password..."
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <p className="errorMsg"> {errors.password} </p>
          )}
        </div>
        {error && <p className="errorMsg">{error}</p>}
      </form>
      <div className="login-button">
        <Button type="primary" size="md" OnClick={handleSubmit}>
          Login
        </Button>
      </div>
      <div className="login-link">
        Bạn chưa có tài khoản ? <Link href="/register">đăng ký tài khoản</Link>
      </div>
    </div>
  );
};

export default Login;
