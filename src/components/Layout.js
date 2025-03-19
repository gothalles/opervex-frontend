import NavbarMenu from "./NavbarMenu";

const Login = ({ children }) => {
  return (
    <>
      <NavbarMenu />
      <div className="d-flex">
        <div className="flex-grow-1 p-3">{children}</div>
      </div>
    </>
  );
};

export default Login;
