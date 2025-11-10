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
