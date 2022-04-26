import './header.css';
import { Link } from 'react-router-dom';


function Header() {

  return (

    <header>
      <div className="wrapper flex-column">
        {/* <img src="/sky_bg.jpg"></img>/> */}
      <img className="logo-img" src='/logo.png' alt='rocket logo'></img>
    
      <h1 className="logo" onClick={() => {window.location.reload()}}>Space Flight News</h1>
      </div>
    </header>


  )
}

export default Header;