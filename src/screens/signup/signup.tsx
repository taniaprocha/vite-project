import { Box, Button, Stack, TextField, Typography, Link } from "@mui/material";
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
  const { register, formState, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
      console.error("Error while creating user", error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          type="email"
          fullWidth
          error={Boolean(formState.errors.email)}
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
        />
        {formState.errors.email && (
          <Typography variant="caption">
            {formState.errors.email.message}
          </Typography>
        )}
      </Box>
      <Box>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          error={Boolean(formState.errors.password)}
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
        />
        {formState.errors.password && (
          <Typography variant="caption">
            {formState.errors.password.message}
          </Typography>
        )}
      </Box>
      <Button variant="contained" type="submit">
        Create account
      </Button>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Link variant="body1" color="inherit" href="/signin">
          Click here to back to sign in
        </Link>
      </Stack>
    </form>
  );
};
