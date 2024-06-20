const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("X-ACCESS-TOKEN", accessToken);
  localStorage.setItem("X-REFRESH-TOKEN", refreshToken);
};

const isTokenExist = () => localStorage.getItem("X-ACCESS-TOKEN");

export { setTokens, isTokenExist };
