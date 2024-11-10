import React, { useEffect, useState } from 'react';
import PageNav from "../components/PageNav";
import axios from "axios";
import {useParams} from "react-router-dom";
import styles from "./FoodProvider.module.css";


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
    const menuitem  = ProviderData.menu
    return (<div>
        <div className={styles.restaurant}>

            <h1>{FoodProvider.name}</h1>
            <p>{ProviderData.location}</p>
            <p>{ProviderData.hoursOfOperation}</p>
            <p>{ProviderData.phoneNumber}</p>
        </div>
        <div className={styles.menu_items}>
            <p>Menu Items</p>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {ProviderData.menu.map((menuItem, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100">
                            <img
                                src="/burger.png"
                                className="card-img-top"
                                alt={menuItem.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{menuItem.name}</h5>
                                <p className="card-text">{menuItem.description}</p>
                                <p className="card-text">{menuItem.cost}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
        </div>


        );


        }

        export default FoodProvider;
