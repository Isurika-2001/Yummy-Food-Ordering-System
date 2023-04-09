import "./profile.scss";
export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };  

  return (
    <div className="profileMain">
      <div className="header">
        <h1>Profile</h1>
        <button onClick={logout}>Log Out</button>
      </div>
      <form>
        <div className="image">
          <img src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-1024.png" alt="profile"></img>
        </div>
        <div>
          <span>Name : </span>
          <input type="text" value={user.name}></input>
        </div>
        <div>
          <span>Email : </span>
          <input type="text" value={user.email}></input>
        </div>
        <div>
          <span>Address : </span>
          <input type="text" value={user.address}></input>
        </div>
        <div>
          <span>Contact Number : </span>
          <input type="text" value={user.address}></input>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
