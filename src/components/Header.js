import gitHubIcon from "../images/github.svg";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/" >Crypto explorer</a>
        <div className="d-flex">
        <a href="https://github.com/armyenokyan/exam" target="_blank" rel="noreferrer">
<img src={gitHubIcon} alt="GitHub" width="32" height="32"/>
</a>
    </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
