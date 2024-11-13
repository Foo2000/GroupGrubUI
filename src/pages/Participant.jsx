import { useParams } from "react-router-dom";
import { useAuth } from "../FakeAuthContext";
import PageNav from "../components/PageNav";
import { resourceUrl } from "../config";
import React, { useState, useEffect } from "react";

export default function Participant() {
    const { participantID } = useParams();
    const { user } = useAuth();
    const [participantOrders, setParticipantOrders] = useState([]);

    const fetchData = async () => {
        try {
          const participantResponse = await fetch(`${resourceUrl}/participants/${participantID}`);
          const participantData = await participantResponse.json();
          setParticipantOrders(participantData.participantOrders);
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
            <h1>Participant Details</h1>
            <p>ID: {participantID}</p>
            <p>Name: {user?.name}</p>

            <h2>Participant Orders</h2>
            <hr/>
            {participantOrders.length > 0 ? (
                participantOrders.map((order) => (
                    <div key={order.participantOrderID} style={{ marginBottom: '20px' }}>
                        <p><strong>Order ID:</strong> {order.participantOrderID}</p>
                        <p><strong>Comments:</strong> {order.comments}</p>
                        <h3>Menu Items:</h3>
                        <ul>
                            {Object.entries(order.menuItemIDs).map(([menuItemID, quantity]) => (
                                <li key={menuItemID}>
                                    <strong>Menu Item ID:</strong> {menuItemID}, <strong>Quantity:</strong> {quantity}
                                </li>
                            ))}
                        </ul>
                        <hr/>
                    </div>
                ))
            ) : (
                <p>No orders found for this participant.</p>
            )}
        </div>
    );
}
