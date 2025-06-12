import { NavLink } from 'react-router-dom';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
    // The button will log out and set user to null
  }

  return (
    <nav className="NavBar">
      <NavLink to="/">Home</NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/stocks">My Stocks</NavLink>
          &nbsp; | &nbsp;
          <button
            onClick={handleLogOut}
            style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
          >
            Log Out
          </button>
          &nbsp;
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}