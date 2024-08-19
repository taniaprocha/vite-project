import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import "./signup.scss";

type FormValues = {
  email: string;
  password: string;
};

export const SignUpScreen = () => {
  const navigate = useNavigate();
  const { register, formState, handleSubmit, trigger } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { errors } = formState;

  const onSubmit = async (formData: FormValues) => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      navigate("/signin");
    } catch (error) {
      console.log("Error while creating user", error);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          type="email"
          fullWidth
          error={Boolean(errors.email)}
          {...register("email", {
            required: {
              value: true,
              message: "email is required",
            },
            validate: {
              isValidEmail: (value) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "email is not valid",
            },
          })}
          label="email"
          placeholder="email"
          required
          onKeyUp={() => trigger("email")}
        />
        {errors.email && (
          <Typography variant="caption">{errors.email.message}</Typography>
        )}
      </Box>
      <Box>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          error={Boolean(errors.password)}
          {...register("password", {
            required: {
              value: true,
              message: "password is required",
            },
            minLength: {
              value: 6,
              message: "password should have at least 6 characters",
            },
          })}
          label="password"
          placeholder="password"
          required
          onKeyUp={() => trigger("password")}
        />
        {errors.password && (
          <Typography variant="caption">{errors.password.message}</Typography>
        )}
      </Box>

      <Button
        variant="contained"
        type="submit"
        disabled={errors && Object.keys(errors).length > 0}
      >
        Create account
      </Button>
    </form>
  );
};
