export const authButtons = [
  {
    title: "Login",
    id: "login",
  },
  {
    title: "Sign Up",
    id: "signup",
  },
];

export const inititalAuthData = {
  name: "",
  email: "",
  password: "",
};

export const getformFields = (mode) => {
  return [
    ...(!mode
      ? [
          {
            label: "Full Name",
            name: "name",
            type: "text",
            placeholder: "Your name",
          },
        ]
      : []),
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "your@email.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "••••••••",
    },
  ];
};

export const toastMsg = (loginMode) => {
  return loginMode
    ? "Logged in successfully!"
    : "Account created successfully!";
};

export const modeInfo = {
  login: {
    button: "Login",
    toggleText: "Don't have an account?",
    toggleAction: "Sign up",
  },
  signup: {
    button: "Create Account",
    toggleText: "Already have an account?",
    toggleAction: "Login",
  },
};
