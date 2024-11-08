import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../FakeAuthContext";
import { GoogleLogin } from '@react-oauth/google';

export default function Homepage() {
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user && user.participantID) {
            navigate(`/participant/${user.participantID}`, { replace: true });
        }
    }, [isAuthenticated, navigate, user]);
    
    return (
        <main className={styles.homepage}>
            <PageNav />

            <section>
                <h1>
                    Group Order Starts Here!
                    <br />
                    GroupHub order together.
                </h1>
                <h2>
                    Explore available food providers and order food together!
                </h2>
                
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const token = credentialResponse.credential;
                        await login(token);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </section>
        </main>
    );
}
