import { useState, useEffect } from "react";
import SignInPage from "./authentication/SignInPage";
import SignUpPage from "./authentication/SignUpPage";

const AuthPage = ({ initialMethod }) => {
  const [method, setMethod] = useState(initialMethod);

  useEffect(() => {
    setMethod(initialMethod);
  }, [initialMethod]);

  const route = method === "login" ? "/api/token/" : "/api/user/register/";

  return (
    <div>
      {route === "/api/token/" ? <SignInPage route={route} method={method} /> : <SignUpPage route={route} method={method} />}
    </div>
  );
};

export default AuthPage;
