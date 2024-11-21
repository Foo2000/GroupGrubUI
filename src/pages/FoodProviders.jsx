import React, { useState, useEffect } from "react";
import { resourceUrl } from "../config";
import PageNav from "../components/PageNav";
import {Link, useNavigate} from "react-router-dom";
import styles from "./FoodProviders.module.css";
import Footer from "../components/common/Footer";
import Layout from "./Layout.module.css";
import { useAuth } from "../FakeAuthContext";
import DefaultButton from "../components/common/DefaultButton";

export default function FoodProviders() {
    const [foodProviders, setFoodProviders] = useState([]);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

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
        <div className={Layout.pageWrapper}>
            <div className={Layout.mainContent}>
                <PageNav/>
                <h1 className={styles.title}>Food Providers</h1>
                <div className={styles.container}>
                    {foodProviders.length > 0 && (
                        foodProviders.map((foodProvider) => (
                            <div className={styles.cardlist} >

                                <div key={foodProvider.foodProviderID} className={styles.foodProviderCard}>

                                    <p className={styles.foodProviderName}>{foodProvider.name}</p>
                                    <p className={styles.provider_info}>Provider ID: {foodProvider.foodProviderID}</p>
                                    <p className={styles.provider_info}>location: {foodProvider.location}</p>
                                    <p className={styles.provider_info}>Operation time: {foodProvider.hoursOfOperation
                                    }</p>
                                    {isAuthenticated && 
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <DefaultButton text="View" style={{margin: 0}}
                                                       onClick={() => navigate(`/foodprovider/${foodProvider.foodProviderID}`)}/>

                                    </div>
                                    }

                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        <Footer />
            </div>

            );
            }
