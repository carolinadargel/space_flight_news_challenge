import './header.css';
import { Link } from 'react-router-dom';


function Header() {

  return (

    <header>
      <h1 className="logo" onClick={() => {window.location.reload()}}>Space Flight News</h1>
    </header>


  )
}

export default Header;