import { Outlet } from "react-router";
import { Link } from "react-router-dom";

function Layout() {
    return ( 
        <div className="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
                <Link className="navbar-brand" to="/">Electricity App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addBill">Add New Bill</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </div>
     );
}

export default Layout;