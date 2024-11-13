import PageNav from "../components/PageNav";
import { useParams } from "react-router-dom";
import { resourceUrl } from "../config";
import React, { useState, useEffect } from "react";

export default function Group({ setGroupId }) {
  const { groupID } = useParams();
  const [group, setGroup] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(`${resourceUrl}/groups/${groupID}`);
      const data = await response.json();
      setGroup(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <PageNav />
      <h1>Group Details</h1>
      {group && (
        <div>
          <p>
            <strong>Group ID:</strong> {group.groupID}
          </p>
          <p>
            <strong>Name:</strong> {group.name}
          </p>
          <p>
            <strong>Administrator ID:</strong> {group.administratorID}
          </p>

          <h3>Participants</h3>
          <ul>
            {group.participantIDs.map((participantID) => (
              <li key={participantID}>
                <strong>Participant ID:</strong> {participantID}
              </li>
            ))}
          </ul>

          <h3>Group Orders</h3>
          <ul>
            {group.groupOrderIDs.map((groupOrderID) => (
              <li key={groupOrderID}>
                <strong>Group Order ID:</strong> {groupOrderID}
              </li>
            ))}
          </ul>
          <hr />
        </div>
      )}
    </div>
  );
}
