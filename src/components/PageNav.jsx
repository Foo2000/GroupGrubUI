import {Link, useNavigate} from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import {useAuth} from "../FakeAuthContext";

function PageNav(){
    const {isAuthenticated, logout, user}  =useAuth();
    const navigate = useNavigate();
    function handleLogout(){
        logout();
        navigate("/");
    }
    return(
        <div>
            <nav className={styles.nav}>
                <Logo />

                <ul>
                    <li><Link to="/foodproviders">FoodProviders</Link></li>
                    {isAuthenticated && user && user.participantID && (
                        <>
                        <li><Link to="/groups">Groups</Link></li>
                        <li><Link to={`/participant/${user.participantID}`}>My Profile</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                        </>
                    )}
                </ul>
            </nav>

        </div>
    )
}

export default PageNav;