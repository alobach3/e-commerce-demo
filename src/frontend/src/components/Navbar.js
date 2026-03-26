import { Link } from "react-router-dom"

function Navbar(){

  return(

    <div className="navbar">

      <Link to="/" className="logo">
        Anime Merch Store
      </Link>

      <div className="navLinks">

        <Link to="/">Store</Link>

      </div>

    </div>

  )

}

export default Navbar