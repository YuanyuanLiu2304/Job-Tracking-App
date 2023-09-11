export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removerUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserToLocalStorage = () => {
  const result = localStorage.getItem("user");
  return result ? JSON.parse(result) : null;
};
