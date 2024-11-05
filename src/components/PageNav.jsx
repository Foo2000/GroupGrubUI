import {Link, useNavigate} from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import {useAuth} from "../FakeAuthContext";

function PageNav(){
    const {isAuthenticated, logout}  =useAuth();
    const navigate = useNavigate();
    function handleLogout(){
        logout();
        navigate("/login");
    }
    return(
        <div>
            <nav className={styles.nav}>
                <Logo />

                <ul>

                    <li>
                        <Link to="/FoodProvider">FoodProvider</Link>
                    </li>
                    <li>
                        <Link to="/Group">Group</Link>
                    </li>
                    <li>
                        {isAuthenticated ? (
                            <button onClick={handleLogout}>Logout</button>
                        ):(
                            <Link to="/login">Login</Link>
                        )}

                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default PageNav;