import { Toaster } from "sonner";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div>{children}</div>

      <Toaster />
    </div>
  );
};

export default AuthLayout;
