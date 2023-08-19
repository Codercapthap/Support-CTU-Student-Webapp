import React, { useEffect, useLayoutEffect, memo, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import Header from "../Header";
import "./_style_login_register.scss";

import UserService from "../../Services/User.service";

import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";

import { getAlls } from "../../store/reducer/departmentSlice";
import { registerApi } from "../../store/reducer/authSlide";
import { async } from "@firebase/util";

const feildConfig = {
  username: {
    default_value: "example123",
    require: true,
    min: 5,
    max: 255,
    regex: "",
  },
  email: {
    default_value: "example123@gmail.com",
    require: true,
    min: 3,
    max: 50,
    regex: /^\S+@\S+$/i,
  },
  password: {
    default_value: "example123password",
    require: true,
    min: 10,
    max: 255,
    regex: "",
  },
  birthday: {
    default_value: new Date(),
    require: true,
  },
  gender: {
    default_value: 1,
    require: true,
  },
  role: {
    default_value: "moderator",
    require: true,
  },
  address: {
    default_value: "Ninh Kieu, Can Tho",
    require: true,
    min: 10,
    max: 255,
    regex: "",
  },
  phone: {
    default_value: "0999888777",
    require: true,
    min: 10,
    max: 10,
    regex: "",
  },
  departments: {
    default_value: [1], // CIT
    require: true,
  },
};

function Register() {
  const navigate = useNavigate();
  console.log("render Register");
  const {
    register,
    handleSubmit, // còn thuộc tính watch nũa
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      username: feildConfig.username.default_value,
      email: feildConfig.email.default_value,
      password: feildConfig.password.default_value,
      gender: feildConfig.gender.default_value,
      phone: feildConfig.phone.default_value,
      address: feildConfig.address.default_value,
      departments: feildConfig.departments.default_value,
    },
  });

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.current);
  const departments = useSelector((state) => state.department.all);
  const [data, setData] = useState({});

  if (user.id >= 0) {
    navigate("/auth/profile");
  }

  useEffect(() => {
    setFocus("username");
  }, []);

  useLayoutEffect(() => {
    const getInitData = async () => {
      dispatch(getAlls());
    };
    getInitData();
  }, []);

  const renderDefaultDate = (localKey = "en-CA") => {
    const date = new Date();
    const futureDate = date.getDate() + 3;
    date.setDate(futureDate);
    return date.toLocaleDateString(`${localKey}`);
  };

  const handleRegister = (data) => {
    const obj = {
      username: data.username,
      email: data.email,
      password: data.password,
      birthday: data.birthday,
      // role: 'user', // create user moderator or admin
      avatarUrl:
        "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
      gender: Number.parseInt(data.gender),
      address: data.address,
      phone: data.phone,
      departmentId: [Number.parseInt(data.departments)],
    };

    console.log(errors.username === undefined);

    if (errors.username !== undefined) {
      console.log("Nhap sai ten thanh vien");
    } else if (errors.email !== undefined) {
      console.log("Nhap sai email");
    } else if (errors.password !== undefined) {
      console.log("Nhap sai password");
    } else if (errors.gender !== undefined) {
      console.log("chon gioi tinh");
    } else if (errors.phone !== undefined) {
      console.log("Nhap sai sdt");
    } else if (errors.birthday !== undefined) {
      console.log("Nhap sai birthday");
    } else if (errors.address !== undefined) {
      console.log("nhap sai dia chi");
    } else if (errors.departments !== undefined) {
      console.log("chon khoa");
    } else {
      console.log("success register: ", obj);
      dispatch(registerApi(JSON.stringify(obj)));
      navigate("/auth/login");
    }
  };

  const handleCreateUser = async (data) => {
    const obj = {
      username: data.username,
      email: data.email,
      password: data.password,
      birthday: data.birthday,
      role: data.role,
      avatarUrl:
        "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
      gender: Number.parseInt(data.gender),
      address: data.address,
      phone: data.phone,
      departmentId: [Number.parseInt(data.departments)],
    };

    console.log(errors.username === undefined);

    if (errors.username !== undefined) {
      console.log("Nhap sai ten thanh vien");
    } else if (errors.email !== undefined) {
      console.log("Nhap sai email");
    } else if (errors.password !== undefined) {
      console.log("Nhap sai password");
    } else if (errors.gender !== undefined) {
      console.log("chon gioi tinh");
    } else if (errors.phone !== undefined) {
      console.log("Nhap sai sdt");
    } else if (errors.birthday !== undefined) {
      console.log("Nhap sai birthday");
    } else if (errors.address !== undefined) {
      console.log("nhap sai dia chi");
    } else if (errors.departments !== undefined) {
      console.log("chon khoa");
    } else {
      console.log("success create: ", obj);
      await UserService.createUser(obj, user.token);
      console.log("create moderator");
    }
  };

  return (
    <>
      {user.role !== "admin" && <Header />}
      <div className="auth-wrapper">
        <form
          className="auth-container"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="form-group">
            <label className="group-name">
              {t("header.auth.username.name")}
            </label>
            <div className="input-check-box">
              <i className="fas fa-user"></i>
              <input
                className="input"
                {...register("username", {
                  required: feildConfig.username.require,
                  minLength: feildConfig.username.min,
                  maxLength: feildConfig.username.max,
                })}
                placeholder={t("header.auth.username.placeholder")}
              />
              {errors.username && (
                <i style={{ color: "red" }} className="fas fa-check"></i>
              )}
              {!errors.username && (
                <i style={{ color: "green" }} className="fas fa-check"></i>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="group-name" htmlFor="email">
              {t("header.auth.email.name")}
            </label>
            <br />
            <div className="input-check-box">
              <i className="fas fa-envelope"></i>
              <input
                className="input"
                {...register("email", {
                  required: feildConfig.email.require,
                  pattern: feildConfig.email.regex,
                  minLength: feildConfig.email.min,
                  maxLength: feildConfig.email.max,
                })}
                type="email"
                placeholder={t("header.auth.email.placeholder")}
              />
              {errors.email && (
                <i style={{ color: "red" }} className="fas fa-check"></i>
              )}
              {!errors.email && (
                <i style={{ color: "green" }} className="fas fa-check"></i>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="group-name" htmlFor="email">
              {t("header.auth.password.name")}
            </label>
            <br />
            <div className="input-check-box">
              <i className="fas fa-key"></i>
              <input
                className="input"
                type="password"
                {...register("password", {
                  required: feildConfig.password.require,
                  pattern: feildConfig.password.regex,
                  minLength: feildConfig.password.min,
                  maxLength: feildConfig.password.max,
                })}
                placeholder={t("header.auth.password.placeholder")}
              />
              {errors.password && (
                <i style={{ color: "red" }} className="fas fa-check"></i>
              )}
              {!errors.password && (
                <i style={{ color: "green" }} className="fas fa-check"></i>
              )}
            </div>
          </div>
          {user.role === "admin" && (
            <div className="form-group">
              <label className="group-name">Role: </label>
              <br />
              <div className="input-check-box">
                <i className="fas fa-key"></i>
                <div className="input-radio-box">
                  <div className="input-radio-item">
                    <input
                      type="radio"
                      {...register("role", {
                        required: feildConfig.role.require,
                      })}
                      value={"user"}
                      selected
                    />
                    <label htmlFor="">user</label>
                  </div>
                  <div className="input-radio-item">
                    <input
                      type="radio"
                      {...register("role", {
                        required: feildConfig.role.require,
                      })}
                      value={"moderator"}
                    />
                    <label htmlFor="">moderator</label>
                  </div>
                </div>
                {errors.gender && (
                  <i style={{ color: "red" }} className="fas fa-check"></i>
                )}
                {!errors.gender && (
                  <i style={{ color: "green" }} className="fas fa-check"></i>
                )}
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="group-name" htmlFor="address">
              {t("header.auth.address.name")}
            </label>
            <br />
            <div className="input-check-box">
              <i className="fas fa-key"></i>
              <input
                className="input"
                type="text"
                {...register("address", {
                  required: feildConfig.address.require,
                  pattern: feildConfig.address.regex,
                  minLength: feildConfig.address.min,
                  maxLength: feildConfig.address.max,
                })}
                placeholder={t("header.auth.address.placeholder")}
              />
              {errors.address && (
                <i style={{ color: "red" }} className="fas fa-check"></i>
              )}
              {!errors.address && (
                <i style={{ color: "green" }} className="fas fa-check"></i>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="group-name" htmlFor="phone">
              {t("header.auth.phone.name")}
            </label>
            <br />
            <div className="input-check-box">
              <i className="fas fa-key"></i>
              <input
                className="input"
                // {...register('phone', { pattern: /\d+/ })}
                {...register("phone", {
                  required: feildConfig.phone.require,
                  pattern: feildConfig.phone.regex,
                  minLength: feildConfig.phone.min,
                  maxLength: feildConfig.phone.max,
                })}
                type="text"
                placeholder={t("header.auth.phone.placeholder")}
              />
              {errors.phone && (
                <i style={{ color: "red" }} className="fas fa-check"></i>
              )}
              {!errors.phone && (
                <i style={{ color: "green" }} className="fas fa-check"></i>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="group-name" htmlFor="birthday">
              {t("header.auth.birthday.name")}
            </label>
            <br />
            <div className="input-check-box">
              <i className="fas fa-key"></i>
              <input
                className="input"
                {...register("birthday", {
                  required: feildConfig.birthday.require,
                })}
                type="date"
                defaultValue={renderDefaultDate()}
              />
              {errors.birthday && (
                <i style={{ color: "red" }} className="fas fa-check"></i>
              )}
              {!errors.birthday && (
                <i style={{ color: "green" }} className="fas fa-check"></i>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="group-name">{t("header.auth.gender.name")}</label>
            <br />
            <div className="input-check-box">
              <i className="fas fa-key"></i>
              <div className="input-radio-box">
                <div className="input-radio-item">
                  <input
                    type="radio"
                    {...register("gender", {
                      required: feildConfig.gender.require,
                    })}
                    value={1}
                    selected
                  />
                  <label htmlFor="male"> {t("header.auth.gender.male")}</label>
                </div>
                <div className="input-radio-item">
                  <input
                    type="radio"
                    {...register("gender", {
                      required: feildConfig.gender.require,
                    })}
                    value={0}
                  />
                  <label htmlFor="female">
                    {" "}
                    {t("header.auth.gender.female")}
                  </label>
                </div>
              </div>
              {errors.gender && (
                <i style={{ color: "red" }} className="fas fa-check"></i>
              )}
              {!errors.gender && (
                <i style={{ color: "green" }} className="fas fa-check"></i>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="group-name">
              {t("header.auth.departments.name")}
            </label>
            <br />
            <div className="input-check-box">
              <i className="fas fa-key"></i>
              <select
                className="text-overflow"
                {...register("departments", {
                  required: feildConfig.departments.require,
                  pattern: feildConfig.departments.regex,
                  minLength: feildConfig.departments.min,
                  maxLength: feildConfig.departments.max,
                })}
              >
                {departments?.map((def) => (
                  <option key={def.department_code} value={def.id}>
                    {def.department_name.toUpperCase()}
                  </option>
                ))}
              </select>
              {errors.departments && (
                <i style={{ color: "red" }} className="fas fa-check"></i>
              )}
              {!errors.departments && (
                <i style={{ color: "green" }} className="fas fa-check"></i>
              )}
            </div>
          </div>
          <div className="form-group">
            {user.role === "admin" && (
              <button
                type="submit"
                className="form-submit-item"
                onClick={() => handleCreateUser()}
              >
                Create User
              </button>
            )}

            {user.role !== "admin" && (
              <>
                <button
                  type="submit"
                  className="form-submit-item"
                  onClick={() => handleRegister()}
                >
                  {t("header.auth.submit.name")}
                </button>
                <div className="alert-box">
                  {t("header.auth.submit.register")}
                  <NavLink className="link" to="/auth/login">
                    {t("header.auth.login")}
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default memo(Register);

// git fetch data: https://www.robinwieruch.de/react-hooks-fetch-data/
// https://archived.quocs.com/tutorials/mot-van-de-khi-fetch-api-trong-react/
// https://www.robinwieruch.de/react-hooks-fetch-data/
// https://www.react-hook-form.com/form-builder
