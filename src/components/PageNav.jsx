import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../FakeAuthContext";

function PageNav() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <Nav>
            <Logo to="/">GroupGrub</Logo>

            <MenuList>
                <MenuItem><StyledLink to="/foodproviders">Food Providers</StyledLink></MenuItem>
                {isAuthenticated && user && user.participantID && (
                    <>
                        <MenuItem><StyledLink to="/groups">Groups</StyledLink></MenuItem>
                        <MenuItem><StyledLink to={`/participant/${user.participantID}`}>My Profile</StyledLink></MenuItem>
                        <MenuItem><LogoutButton onClick={handleLogout}>Logout</LogoutButton></MenuItem>
                    </>
                )}
            </MenuList>
        </Nav>
    );
}

const Logo = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
	font-family: "Mochiy Pop P One", sans-serif;
  	font-weight: 400;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FF7F50;
    padding: 1rem;
`;

const MenuList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const MenuItem = styled.li`
	font-family: "Alexandria", sans-serif;
	font-size: 1.15rem;
    margin: 0 0.5rem;
	width:9rem;
	text-align:center;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 1.15rem;

    &:hover {
        font-weight:600;
    }
`;

const LogoutButton = styled.button`
	font-family: "Alexandria", sans-serif;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.15rem;
	width:9rem;
	text-align:center;
    &:hover {
        font-weight:600;
    }
`;

export default PageNav;
