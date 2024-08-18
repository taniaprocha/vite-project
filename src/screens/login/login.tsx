import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "./login.scss";

type FormValues = {
  username: string;
  password: string;
};

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { errors } = formState;

  console.log(errors);

  const onSubmit = (formData: FormValues) => {
    console.log(formData);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        type="email"
        fullWidth
        {...register("username", {
          required: {
            value: true,
            message: "username is required",
          },
          validate: {
            isValidEmail: (value) =>
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "username is not valid",
          },
        })}
        label="username"
        placeholder="username"
        required
      />
      <TextField
        variant="outlined"
        type="password"
        fullWidth
        {...register("password", {
          required: {
            value: true,
            message: "password is required",
          },
        })}
        label="password"
        placeholder="password"
        required
      />
      <Button variant="contained" onClick={() => navigate("discovery")}>
        Sign in
      </Button>
    </form>
  );
};
