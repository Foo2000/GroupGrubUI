import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "./components/PageNav";
import { useAuth } from "./FakeAuthContext";
import styles from "./Login.module.css";
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user && user.participantID) {
            navigate(`/participant/${user.participantID}`, { replace: true });
        }
    }, [isAuthenticated, navigate, user]);

    return (
        <main className={styles.login}>
            <PageNav />
            <div className={styles.loginButton}>
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const token = credentialResponse.credential;
                        await login(token);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </main>
    );
}
