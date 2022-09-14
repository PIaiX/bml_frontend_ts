import React from "react";
import { useForm } from "react-hook-form";
import ValidateWrapper from "./utils/ValidateWrapper";
import { User } from "../types"

interface Props {
  authorizedUser: User;
  onSubmit: () => (data: any) => void;
}

const EditProfileForm: React.FC<Props> = ({ authorizedUser, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      firstName: authorizedUser?.firstName || "",
      lastName: authorizedUser?.lastName || "",
      middleName: authorizedUser?.middleName || "",
      birthDate: authorizedUser?.birthDate || "",
      email: authorizedUser?.email || "",
      phone: authorizedUser?.phone || "",
      town: authorizedUser?.town || "",
    },
  });

  return (
    <form className="acc-box" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="row  align-items-center g-3">
        <div className="col-sm-4">
          <h6>
            Фамилия<span className="red">*</span>
          </h6>
        </div>
        <div className="col-sm-8">
          <ValidateWrapper error={errors?.lastName}>
            <input
              type="text"
              placeholder="Фамилия"
              {...register("lastName", {
                required: "поле обязательно к заполнению",
                minLength: {
                  value: 1,
                  message: "необходимо ввести минимум 1 символ",
                },
                maxLength: {
                  value: 50,
                  message: "максимальное количество символов - 50",
                },
              })}
            />
          </ValidateWrapper>
        </div>
        <div className="col-sm-4">
          <h6>
            Имя<span className="red">*</span>
          </h6>
        </div>
        <div className="col-sm-8">
          <ValidateWrapper error={errors?.firstName}>
            <input
              type="text"
              placeholder="Имя"
              {...register("firstName" as any, {
                required: "поле обязательно к заполнению",
                minLength: {
                  value: 1,
                  message: "необходимо ввести минимум 1 символ",
                },
                maxLength: {
                  value: 50,
                  message: "максимальное количество символов - 50",
                },
              })}
            />
          </ValidateWrapper>
        </div>
        <div className="col-sm-4">
          <h6>Отчество</h6>
        </div>
        <div className="col-sm-8">
          <ValidateWrapper error={errors?.middleName}>
            <input
              type="text"
              placeholder="Отчество"
              {...register("middleName")}
            />
          </ValidateWrapper>
        </div>
        <div className="col-sm-4">
          <h6>Дата рождения</h6>
        </div>
        <div className="col-sm-8">
          <ValidateWrapper error={errors?.birthDate}>
            <input
              type="date"
              min="1950-01-01"
              {...register("birthDate", {
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "укажите правильный формат даты",
                },
              })}
            />
          </ValidateWrapper>
        </div>
        <div className="col-sm-4">
          <h6>
            Адрес электронной почты<span className="red">*</span>
          </h6>
          <div className="f_08 color-1">Не показывается в профиле</div>
        </div>
        <div className="col-sm-8">
          <ValidateWrapper error={errors?.email}>
            <input
              type="email"
              placeholder="Введите почту"
              {...register("email", {
                required: "поле обязательно к заполнению",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "укажите правильный формат электронной почты",
                },
              })}
            />
          </ValidateWrapper>
        </div>
        <div className="col-sm-4">
          <h6>
            Номер телефона<span className="red">*</span>
          </h6>
          <div className="f_08 color-1">Не показывается в профиле</div>
        </div>
        <div className="col-sm-8">
          <ValidateWrapper error={errors?.phone}>
            <input
              type="tel"
              placeholder="+79000000000"
              {...register("phone", {
                required: "поле обязательно к заполнению",
                pattern: {
                  value:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                  message: "укажите правильный формат номера",
                },
              })}
            />
          </ValidateWrapper>
        </div>
        <div className="col-sm-4">
          <h6>
            Город<span className="red">*</span>
          </h6>
        </div>
        <div className="col-sm-8">
          <ValidateWrapper error={errors?.town}>
            <input
              type="text"
              placeholder="Город"
              {...register("town", {
                required: "поле обязательно к заполнению",
                minLength: {
                  value: 1,
                  message: "необходимо ввести минимум 1 символ",
                },
                maxLength: {
                  value: 50,
                  message: "максимальное количество символов - 50",
                },
              })}
            />
          </ValidateWrapper>
        </div>
      </div>
      <button type="submit" className="btn_main btn_1 mt-4">
        Cохранить
      </button>
    </form>
  );
};

export default EditProfileForm;
