import {Link, Outlet} from "react-router-dom";
import PageNav from "./components/PageNav";


export default function Group() {
    return (
        <div>
            <PageNav />
            <h1>Group</h1>
            <h1><Link to="participantOrder">participant order</Link></h1>
            <Outlet />
        </div>

    );
}
