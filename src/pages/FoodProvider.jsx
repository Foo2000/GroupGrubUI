import {useNavigate, useParams} from "react-router-dom";
import PageNav from "../components/PageNav";
import { resourceUrl } from "../config";
import React, { useState, useEffect } from "react";
import { useAuth } from "../FakeAuthContext";
import Footer from "../components/common/Footer";
import styles from "../pages/FoodProvider.module.css";
import {MenuItemCard} from "./MenuItemCard";
import DefaultButton from "../components/common/DefaultButton";
export default function FoodProvider({ sessionGroupId, sessionGroupOrderId }) {
    const { foodProviderID } = useParams();
    const [foodProvider, setFoodProvider] = useState();
    const [selectedItems, setSelectedItems] = useState({});
    const [comments, setComments] = useState("");
    const { user } = useAuth();
    const participantID = user.participantID;
    const navigate = useNavigate();

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
        if (!participantID || !sessionGroupId || !sessionGroupOrderId) {
            alert("Failed to order! Please log in and join an group order");
            return;
        }
    
        if (Object.keys(selectedItems).length === 0) {
            alert("Please select at least one menu item before submitting your order.");
            return;
        }
    
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
            navigate(-1);
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
            {foodProvider && (
                <div>
                    <div className={styles.restaurant_info}>
                        <h1>Food Provider Details</h1>
                        <p><strong>Session Group Id:</strong> {sessionGroupId}</p>
                        <p><strong>Session Group Order Id:</strong> {sessionGroupOrderId}</p>
                        <p><strong>ID:</strong> {foodProvider.foodProviderID}</p>
                        <p><strong>Name:</strong> {foodProvider.name}</p>
                        <p><strong>Location:</strong> {foodProvider.location}</p>
                        <p><strong>Phone Number:</strong> {foodProvider.phoneNumber}</p>
                        <p><strong>Hours of Operation:</strong> {foodProvider.hoursOfOperation}</p></div>


                    <p style={{fontSize: '20px', fontWeight: "bold"}}>Menu Item: </p>
                    <div className={styles.menuContainer}>
                        {foodProvider.menu.length > 0 && (
                            foodProvider.menu.map((menuItem) => (
                                <div className={styles.menu_list}>
                                    <MenuItemCard
                                        name={menuItem.name}
                                        img={menuItem.image}
                                        description={menuItem.description}
                                        cost={menuItem.cost}
                                        quantity={selectedItems[menuItem.menuItemID] || 0}
                                        handleQuantityChange={handleQuantityChange}
                                        menuItemID={menuItem.menuItemID}
                                    />

                                </div>

                            ))
                        )}
                    </div>
                    <div className={styles.submitContainer}>
                        <label>
                            <p style = {{fontSize: '16px', fontWeight: 'bold'}}>Comments:</p>
                            <textarea value={comments} onChange={(e) => setComments(e.target.value)}/>
                        </label>

                    </div>
                    <div className={styles.submitContainer}>
                        <DefaultButton
                            text="Submit Order"
                            type="remove"
                            onClick={handleSubmit}
                            style={{padding: "10px 20px"}}
                        />
                    </div>

                </div>
            )}
            <Footer/>
        </div>
    );
}
