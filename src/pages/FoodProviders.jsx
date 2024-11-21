import { useState, useEffect } from "react";
import { resourceUrl } from "../config";
import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";
import { useAuth } from "../FakeAuthContext";

export default function FoodProviders() {
    const [foodProviders, setFoodProviders] = useState([]);
    const { isAuthenticated } = useAuth();

    const fetchData = async () => {
        try {
            const response = await fetch(`${resourceUrl}/foodproviders`);
            const data = await response.json();
            setFoodProviders(data);
        } catch (error) {
            console.error("Error fetching food providers data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <PageNav />
            <h1>Food Providers</h1>
            {foodProviders.length > 0 && (
                foodProviders.map((foodProvider) => (
                    <div key={foodProvider.foodProviderID} style={{ marginBottom: '20px' }}>
                        <p><strong>Provider ID:</strong> {foodProvider.foodProviderID}</p>
                        <p><strong>Name:</strong> {foodProvider.name}</p>
                        {isAuthenticated && <Link to={`/foodprovider/${foodProvider.foodProviderID}`}>Check Details</Link>}
                        <hr/>
                    </div>
                ))
            )}
        </div>
    );
}
