import React, { useState } from "react";
import { Link } from "react-router-dom";
import { onInputHandler } from "../../helpers/formHandlers";
import { onSelectHandler } from "../../helpers/formHandlers";
import { onCheckboxHandler } from "../../helpers/formHandlers";

export default function Registration() {
  const [profileType, setProfileType] = useState(0);

  const [data, setData] = useState({});

  return (
    <main>
      <div className="container py-4 py-sm-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <form className="pt fw_4">
              <h1 className="f_50 mb-4 mb-sm-5">РЕГИСТРАЦИЯ</h1>
              <div className="row align-items-center">
                <div className="col-sm-4 mb-1 mb-sm-0">
                  <div>Тип профиля</div>
                </div>
                <div className="col-sm-8">
                  <select
                    name="profileType"
                    defaultValue={0}
                    onChange={(e) => {
                      setProfileType(e.target.value);
                      onSelectHandler(e, setData, true);
                    }}
                  >
                    <option value={0} disabled>
                      Выберите тип профиля
                    </option>
                    <option value={1}>Физ лицо</option>
                    <option value={2}>
                      ИП (Больше рекламных возможностей){" "}
                    </option>
                    <option value={3}>
                      ООО (Больше рекламных возможностей)
                    </option>
                  </select>
                </div>
              </div>
              {profileType === "2" && (
                <input
                  type="text"
                  name="IE"
                  placeholder="Введите название ИП"
                  className="mt-3"
                  onChange={(e) => onInputHandler(e, setData)}
                />
              )}
              {profileType === "3" && (
                <input
                  type="text"
                  name="company"
                  placeholder="Введите название компании"
                  className="mt-3"
                  onChange={(e) => onInputHandler(e, setData)}
                />
              )}
              {(profileType === "1" ||
                profileType === "2" ||
                profileType === "3") && (
                <>
                  <input
                    type="text"
                    className="mt-3"
                    name="first-name"
                    placeholder={
                      profileType === "1"
                        ? "Введите Имя"
                        : "Введите Имя ответственного лица"
                    }
                    onChange={(e) => onInputHandler(e, setData)}
                  />
                  <input
                    type="text"
                    className="mt-3"
                    name="last-name"
                    placeholder={
                      profileType === "1"
                        ? "Введите Фамилию"
                        : "Введите Фамилию ответственного лица"
                    }
                    onChange={(e) => onInputHandler(e, setData)}
                  />
                  <input
                    type="text"
                    className="mt-3"
                    name="middle-name"
                    placeholder={
                      profileType === "1"
                        ? "Введите Отчество"
                        : "Введите Отчество ответственного лица"
                    }
                    onChange={(e) => onInputHandler(e, setData)}
                  />
                  <input
                    type="email"
                    className="mt-3"
                    name="email"
                    placeholder="Введите почту"
                    onChange={(e) => onInputHandler(e, setData)}
                  />
                  <input
                    type="password"
                    className="mt-3"
                    name="password"
                    placeholder="Пароль"
                    onChange={(e) => onInputHandler(e, setData)}
                  />
                  <span className="red f_09">
                    Мин длина 6 символов, макс длина 20 символов
                  </span>
                  <input
                    type="password"
                    className="mt-3"
                    name="password-2"
                    placeholder="Повторите пароль"
                    onChange={(e) => onInputHandler(e, setData)}
                  />
                  <span className="red f_09">
                    Мин длина 6 символов, макс длина 20 символов
                  </span>
                </>
              )}
              <label className="color-1 mt-3 mt-sm-4">
                <input
                  name="offer"
                  type="checkbox"
                  defaultChecked={false}
                  onChange={(e) => onCheckboxHandler(e, setData)}
                />
                <span className="ms-3">
                  Я соглашаюсь с правилами сайта и даю согласие на обработку
                  персональных данных.
                </span>
              </label>
              <div className="row flex-sm-row-reverse align-items-center mt-3 mt-sm-4">
                <div className="col-sm-8">
                  <button
                    type="button"
                    className="btn_main btn_2 px-5 mx-auto mx-sm-0"
                  >
                    Регистрация
                  </button>
                </div>
                <div className="col-sm-4 mt-4 mt-sm-0">
                  <div>
                    Есть аккаунт?{" "}
                    <Link to="/enter" className="link color-1">
                      Войти
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
