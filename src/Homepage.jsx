import { Link } from "react-router-dom";
import PageNav from "./components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
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
                <Link to="/login" className="cta">
                    Start order now
                </Link>
            </section>
        </main>
    );
}
