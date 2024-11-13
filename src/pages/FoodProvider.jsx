import { useParams } from "react-router-dom";
import PageNav from "../components/PageNav";
import { resourceUrl } from "../config";
import React, { useState, useEffect } from "react";

export default function FoodProvider({ sessionGroupId, sessionGroupOrderId }) {
    const { foodProviderID } = useParams();
    const [foodProvider, setFoodProvider] = useState();

    const fetchData = async () => {
        try {
          const response = await fetch(`${resourceUrl}/foodproviders/${foodProviderID}`);
          const data = await response.json();
          setFoodProvider(data);
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
                                <hr/>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
