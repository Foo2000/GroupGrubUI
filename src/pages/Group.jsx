import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import styles from "./Group.module.css";
import {GroupOrderParticipantCard} from "./GroupOrderParticipantCard";
import foodProvider from "./FoodProvider";

function Group() {
    const { uuid } = useParams();
    const location = useLocation();
    const [groupData, setGroupData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [participantsData, setParticipantsData] = useState([]);
    const [menuItemCostMap, setMenuItemCostMap] = useState({});
    const [participantOrderIds, setParticipantOrderIds] = useState([]);



    const navigate = useNavigate();
    const handleJoinGroup = () => {
        navigate(`/form`, {state: {groupData, mode :"join"}});
    };
    const handleEditGroup = ()=>{
        navigate(`/form`, {state: {groupData, mode :"edit"}});
    }
    const handleOrderFromFoodProvider = ()=>{
        navigate(`/foodproviders`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get group data (groupOrderIds)
                const groupResponse = await axios.get(`http://localhost:8081/groups/${uuid}`);
                const data = groupResponse.data;
                setGroupData(data);



                //get participantOrderIDs/foodProviderID
                const groupOrders = await axios.get(`http://localhost:8081/groups/${uuid}/orders/${data.groupOrderIDs[0]}`);
                const groupOrdersdata = groupOrders.data;

                console.log("foodproviderId", groupOrdersdata.foodProviderID);

                // Fetch food provider data to get menu item costs
                const foodProviderResponse = await axios.get(`http://localhost:8081/foodproviders/${groupOrdersdata.foodProviderID}`);
                const foodProviderData = foodProviderResponse.data;

                // Create a map of menuItemID to cost for easy lookup
                const costMap = {};
                foodProviderData.menu.forEach(item => {
                    costMap[item.menuItemID] = item.cost;

                });
                console.log("costMap", costMap);
                setMenuItemCostMap(costMap);

                //set participantOrderIds
                setParticipantOrderIds(groupOrdersdata.participantOrderIDs);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [uuid]);



    useEffect(() => {
        if (participantOrderIds.length > 0) {
            Promise.all(
                participantOrderIds.map(orderId =>
                    fetch(`http://localhost:8081/participants?participantsOrderIdFilter=${orderId}`)
                        .then(response => response.json())
                )
            )
                .then(data => setParticipantsData(data[0]))
                .catch(error => console.error("Error fetching participant data:", error));
        }

    },[participantOrderIds])




    if (loading) return <p>Loading...</p>;
    if (!groupData) return <p>No specified group data found.</p>;




    return (
        <div>
            <div className = {styles.container}>
                <div className={styles.group_info}>
                    <h1>{groupData.name}</h1>
                    <p>Administrator ID: {groupData.administratorID}</p>
                    {location.state.newJoin && <button className="btn btn-warning btn-rounded" onClick={handleOrderFromFoodProvider}>Order from FoodProvider</button>}
                </div>
                <div className={`d-grid gap-2 d-md-flex justify-content-md-end  ${styles.btn_position}`}>


                    <button type="button" className="btn btn-light btn-rounded" data-mdb-ripple-init
                    onClick={handleJoinGroup}>Join Group</button>

                    <button onClick={handleEditGroup} type="button" className="btn btn-warning btn-rounded" data-mdb-ripple-init>Edit Group
                    </button>
                </div>

            </div>

            <div className={styles.menu_items}>

                <div className={styles.menu_list}>
                    {participantsData.map((participant, index) => (

                        <div key={participant.participantID} className={styles.participant_card}>

                            {participant.participantOrders && participant.participantOrders.map((order, orderIndex) => {
                                // Calculate total price for the order
                                const totalPrice = Object.entries(order.menuItemIDs).reduce((sum, [menuItemID, quantity]) => {
                                    const itemCost = menuItemCostMap[menuItemID] * quantity;

                                    return sum + itemCost;
                                }, 0);
                                return (

                                    <GroupOrderParticipantCard
                                        key={orderIndex}

                                        uuid={participant.uuid}
                                        name={participant.name}
                                        participantOrderId={order.participantOrderID}
                                        count={Object.keys(order.menuItemIDs).length}
                                        totalPrice={totalPrice}
                                    />


                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Group;
