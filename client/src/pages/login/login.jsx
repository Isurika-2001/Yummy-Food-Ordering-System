import "./login.scss";
export const Login = () => {
  return (
    <div className="AuthMain">
      <h1>Sign In</h1>
      <form>
        <input type="email" placeholder="email" name="email"></input>
        <input type="password" placeholder="password" name="password"></input>
        <button type="submit" name="signup">
          Sign In
        </button>
      </form>
      <div>
        <span>New user? </span>
        <a href="/register">Sign Up</a>
      </div>
    </div>
  );
};
