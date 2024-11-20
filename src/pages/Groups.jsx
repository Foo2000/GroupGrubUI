import React, { useState, useEffect } from "react";
import { resourceUrl } from "../config";
import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";
import styles from "./Groups.module.css";
import Footer from "../components/common/Footer";
import Layout from "./Layout.module.css";
export default function Groups() {
    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${resourceUrl}/groups/getAllGroups`);
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error("Error fetching groups data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={Layout.pageWrapper}>
                <div className={Layout.mainContent}>
                    <PageNav/>
                    <h1 className={styles.title}>Groups</h1>
                    <div className={styles.container}>


                        {groups.length > 0 && (
                            groups.map((group) => (

                                <div className={styles.cardlist}>

                                    <div key={group.groupID} className={styles.groupCard}>

                                        <p className={styles.groupName}>{group.name}</p>

                                        <p className={styles.groupName}>Group ID: {group.groupID}</p>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <Link
                                                to={`/group/${group.groupID}`}
                                                className="btn btn-warning btn-rounded"
                                                data-mdb-ripple-init
                                                data-mdb-ripple-color="light"
                                            >
                                                view
                                            </Link>

                                        </div>

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
