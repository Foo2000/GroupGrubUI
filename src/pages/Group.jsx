import PageNav from "../components/PageNav";
import { useParams } from "react-router-dom";
import { resourceUrl } from "../config";
import React, { useState, useEffect } from "react";
import { useAuth } from "../FakeAuthContext";

export default function Group({ setSessionGroupId, setSessionGroupOrderId }) {
  const { groupID } = useParams();
  const [group, setGroup] = useState();
  const [groupOrders, setGroupOrders] = useState({});
  const { user } = useAuth();

  const fetchGroupData = async () => {
    try {
      const response = await fetch(`${resourceUrl}/groups/${groupID}`);
      const data = await response.json();
      setGroup(data);
      data.groupOrderIDs.forEach((groupOrderID) => fetchGroupOrderDetails(groupOrderID));
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  };

  const fetchGroupOrderDetails = async (groupOrderID) => {
    try {
      const response = await fetch(`${resourceUrl}/groups/${groupID}/orders/${groupOrderID}`);
      const orderData = await response.json();
      setGroupOrders((prevOrders) => ({
        ...prevOrders,
        [groupOrderID]: orderData
      }));
    } catch (error) {
      console.error("Error fetching group order details:", error);
    }
  };

  useEffect(() => {
    fetchGroupData();
  });

  const handleJoinGroupOrder = async (groupOrderID) => {
    try {
      const groupResponse = await fetch(`${resourceUrl}/groups/${groupID}`);
      const updatedGroup = await groupResponse.json();
      if (!updatedGroup.participantIDs.includes(user.participantID)) {
        updatedGroup.participantIDs.push(user.participantID);
      }
      await fetch(`${resourceUrl}/groups/${groupID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGroup),
      });
      
      setSessionGroupId(groupID);
      setSessionGroupOrderId(groupOrderID);

      fetchGroupData();
    } catch (error) {
      console.error("Error joining group order:", error);
    }
  };

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
                <button onClick={() => handleJoinGroupOrder(groupOrderID)}>
                  Join Group Order
                </button>
                {groupOrders[groupOrderID] && (
                  <div>
                    <p><strong>Status:</strong> {groupOrders[groupOrderID].status}</p>
                    <p><strong>Desired Pickup Timeframe:</strong> {groupOrders[groupOrderID].desiredPickupTimeframe}</p>
                    <p><strong>Food Provider ID:</strong> {groupOrders[groupOrderID].foodProviderID}</p>

                    <h4>Participant Orders</h4>
                    <ul>
                      {groupOrders[groupOrderID].participantOrderIDs.map((participantOrderID) => (
                        <li key={participantOrderID}>
                          <strong>Participant Order ID:</strong> {participantOrderID}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <hr />
        </div>
      )}
    </div>
  );
}
