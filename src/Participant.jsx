import { useParams } from "react-router-dom";
import { useAuth } from "./FakeAuthContext";
import PageNav from "./components/PageNav";

export default function Participant() {
    const { participantID } = useParams();
    const { user } = useAuth();

    return (
        <div>
            <PageNav />
            <h1>Participant Details</h1>
            <p>ID: {participantID}</p>
            <p>Name: {user?.name}</p>
        </div>
    );
}
