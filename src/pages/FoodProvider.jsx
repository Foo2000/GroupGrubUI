import React, { useEffect, useState } from 'react';
import PageNav from "../components/PageNav";
import axios from "axios";
import {useParams} from "react-router-dom";
import styles from "./FoodProvider.module.css";
import {MenuItemCard} from "./MenuItemCard";

function FoodProvider() {
    const {uuid} = useParams();
    const [ProviderData, setProviderData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/foodproviders/${uuid}`);
                const data = await response.json();
                setProviderData(data);
                console.log('Data saved successfully:', data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();


    }, [uuid])
    if (loading) return <p>Loading...</p>;
    if (!ProviderData) return <p>No restaurant data found.</p>

    return (<div>

                <div className={styles.restaurant_info}>
                    <h1>{FoodProvider.name}</h1>
                    <p>{ProviderData.location}</p>
                    <p>{ProviderData.hoursOfOperation}</p>
                    <p>{ProviderData.phoneNumber}</p>
                </div>


            <div className={styles.menu_items}>
                <p style={{fontSize: '20px', fontWeight: "bold"}}>Menu Items</p>
                <div className={styles.menu_list}>
                    {ProviderData.menu.map((menuItem, index) => (
                        <MenuItemCard
                        key={menuItem.uuid}
                        uuid={menuItem.uuid}
                        name={menuItem.name}
                        img={menuItem.img}
                        description={menuItem.description}
                        cost={menuItem.cost}
                    />
                ))}
            </div>
        </div>
        </div>


        );


        }

        export default FoodProvider;
