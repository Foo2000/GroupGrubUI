import { useState, useEffect } from "react";
import { resourceUrl } from "../config";
import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";

export default function Groups() {
    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${resourceUrl}/groups/getAllGroups`);
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error("Error fetching groups data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <PageNav />
            <h1>Groups</h1>
            {groups.length > 0 && (
                groups.map((group) => (
                    <div key={group.groupID} style={{ marginBottom: '20px' }}>
                        <p><strong>Group ID:</strong> {group.groupID}</p>
                        <p><strong>Name:</strong> {group.name}</p>
                        <Link to={`/group/${group.groupID}`}>Check Details</Link>
                        <hr/>
                    </div>
                ))
            )}
        </div>
    );
}
