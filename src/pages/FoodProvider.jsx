import { useParams } from "react-router-dom";
import PageNav from "../components/PageNav";
import { resourceUrl } from "../config";
import React, { useState, useEffect } from "react";
import { useAuth } from "../FakeAuthContext";

export default function FoodProvider({ sessionGroupId, sessionGroupOrderId }) {
    const { foodProviderID } = useParams();
    const [foodProvider, setFoodProvider] = useState();
    const [selectedItems, setSelectedItems] = useState({});
    const [comments, setComments] = useState("");
    const { user } = useAuth();
    const participantID = user.participantID;

    const fetchData = async () => {
        try {
          const response = await fetch(`${resourceUrl}/foodproviders/${foodProviderID}`);
          const data = await response.json();
          setFoodProvider(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };

    const handleQuantityChange = (menuItemID, quantity) => {
        setSelectedItems((prevItems) => ({
            ...prevItems,
            [menuItemID]: quantity,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${resourceUrl}/participants/${participantID}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    menuItemIDs: selectedItems,
                    comments: comments || "No comments",
                }),
            });
            const orderData = await response.json();
            const participantOrderID = orderData.participantOrderID;

            const groupOrderResponse = await fetch(`${resourceUrl}/groups/${sessionGroupId}/orders/${sessionGroupOrderId}`);
            const groupOrderData = await groupOrderResponse.json();

            await fetch(`${resourceUrl}/groups/${sessionGroupId}/orders/${sessionGroupOrderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...groupOrderData,
                    participantOrderIDs: [...groupOrderData.participantOrderIDs, participantOrderID],
                }),
            });

            alert("Order submitted successfully!");
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("There was an error submitting your order.");
        }
    };

    useEffect(() => {
        fetchData();
    });

    return (
        <div>
            <PageNav />
            <h1>Food Provider Details</h1>
            <p><strong>Session Group Id:</strong> {sessionGroupId}</p>
            <p><strong>Session Group Order Id:</strong> {sessionGroupOrderId}</p>
            {foodProvider && (
                <div>
                    <p><strong>ID:</strong> {foodProvider.foodProviderID}</p>
                    <p><strong>Name:</strong> {foodProvider.name}</p>
                    <p><strong>Location:</strong> {foodProvider.location}</p>
                    <p><strong>Phone Number:</strong> {foodProvider.phoneNumber}</p>
                    <p><strong>Hours of Operation:</strong> {foodProvider.hoursOfOperation}</p>
                    
                    <h2>Menu</h2>
                    <hr/>
                    {foodProvider.menu.length > 0 && (
                        foodProvider.menu.map((menuItem) => (
                            <div key={menuItem.menuItemID} style={{ marginBottom: '20px' }}>
                                <p><strong>Menu Item ID:</strong> {menuItem.menuItemID}</p>
                                <p><strong>Name:</strong> {menuItem.name}</p>
                                <img src={menuItem.image} alt={menuItem.name} style={{ width: '200px', height: 'auto' }} />
                                <p><strong>Description:</strong> {menuItem.description}</p>
                                <p><strong>Cost:</strong> ${menuItem.cost}</p>
                                <label>
                                    <strong>Quantity:</strong>
                                    <input
                                        type="number"
                                        min="0"
                                        value={selectedItems[menuItem.menuItemID] || ""}
                                        onChange={(e) =>
                                            handleQuantityChange(menuItem.menuItemID, parseInt(e.target.value, 10) || 0)
                                        }
                                    />
                                </label>
                                <hr/>
                            </div>
                        ))
                    )}
                    <div>
                        <label>
                            <strong>Comments:</strong>
                            <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
                        </label>
                    </div>
                    <button onClick={handleSubmit}>Submit Order</button>
                </div>
            )}
        </div>
    );
}
