import PropTypes from 'prop-types'

const Login = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <div>
      <form className="form card" onSubmit={handleLogin}>
        <div className="card_header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
          </svg>
          <h1 className="form_heading">Sign in</h1>
        </div>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            className="input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username"
            id="username"
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="field">
          <button className="button" type="submit" id='loginbutton'>Login</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default Login