import { useForm } from "react-hook-form";
import { useContextAuth } from "../../context/auth-context";
import { Box, Button, TextField, Typography } from "@mui/material";
import { updateEmail, updateProfile, getAuth } from "firebase/auth";
import "../signup/signup.scss";
import { useNavigate } from "react-router-dom";

type FormValues = {
  username: string;
  email: string;
};

export const ProfileScreen = () => {
  const { user } = useContextAuth();
  const navigate = useNavigate();
  const { register, formState, handleSubmit, trigger } = useForm<FormValues>({
    defaultValues: {
      username: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    const auth = getAuth();
    if (user?.displayName !== formData.username && auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: formData.username,
        });
        if (user?.email === formData.email && auth.currentUser) {
          navigate("/discovery");
        } else {
          try {
            await updateEmail(auth.currentUser, formData.email);
            navigate("/discovery");
          } catch (error) {
            console.error("Error while updating email", error);
          }
        }
      } catch (error) {
        console.error("Error while updating username", error);
      }
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          variant="outlined"
          type="username"
          fullWidth
          error={Boolean(formState.errors.username)}
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            },
            minLength: {
              value: 3,
              message: "username must be at least 3 characters",
            },
          })}
          label="username"
          placeholder="username"
          required
          onKeyUp={() => trigger("username")}
        />
        {formState.errors.username && (
          <Typography variant="caption">
            {formState.errors.username.message}
          </Typography>
        )}
      </Box>
      <Box>
        <TextField
          variant="outlined"
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
          onKeyUp={() => trigger("email")}
        />
        {formState.errors.email && (
          <Typography variant="caption">
            {formState.errors.email.message}
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        type="submit"
        disabled={formState.errors && Object.keys(formState.errors).length > 0}
      >
        Save
      </Button>
    </form>
  );
};
