export const Register = () => {
  return (
    <div className="AuthMain">
      <h1>Sign Up</h1>
      <form>
        <input type="email" placeholder="email" name="email"></input>
        <input type="password" placeholder="password" name="password"></input>
        <input
          type="password"
          placeholder="confirm password"
          name="c_password"
        ></input>
        <button type="submit" name="signup">
          Sign Up
        </button>
      </form>
      <div>
        <span>Already have an account? </span>
        <a href="/login">Sign In</a>
      </div>
    </div>
  );
};
