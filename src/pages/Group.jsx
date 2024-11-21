import PageNav from "../components/PageNav";
import {Link, useNavigate, useParams} from "react-router-dom";
import { resourceUrl } from "../config";
import React, { useState, useEffect } from "react";
import { useAuth } from "../FakeAuthContext";
import styles from "./Group.module.css"
import axios from "axios";
import Footer from "../components/common/Footer";
import Layout from "./Layout.module.css";
import DefaultButton from "../components/common/DefaultButton";
import styled from "styled-components";

export default function Group({ setSessionGroupId, setSessionGroupOrderId, setOrderFoodProviderId }) {
  const { groupID } = useParams();
  const [group, setGroup] = useState();
  const [groupOrders, setGroupOrders] = useState({});
  const [participantOrdersData, setParticipantOrdersData] = useState({});
  const { user } = useAuth();
  const [costMap, setCostMap] = useState({});
  const navigate = useNavigate();

  const fetchGroupData = async () => {
    try {
      const response = await fetch(`${resourceUrl}/groups/${groupID}`);
      const data = await response.json();
      setGroup(data);
      data.groupOrderIDs.forEach((groupOrderID) => fetchGroupOrderDetails(groupOrderID));
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  };

  const fetchGroupOrderDetails = async (groupOrderID) => {
    try {
      const response = await fetch(`${resourceUrl}/groups/${groupID}/orders/${groupOrderID}`);
      const orderData = await response.json();
      setGroupOrders((prevOrders) => ({
        ...prevOrders,
        [groupOrderID]: orderData
      }));

      //fetch menu data
      const foodProviderResponse = await axios.get(`${resourceUrl}/foodproviders/${orderData.foodProviderID}`);
      const foodProviderData = foodProviderResponse.data;

      // Create a map of menuItemID to cost for easy lookup
      const costMap = {};
      foodProviderData.menu.forEach(item => {
        costMap[item.menuItemID] = item.cost;

      });
      setCostMap(costMap);


      orderData.participantOrderIDs.forEach((participantOrderID) => {
        fetchParticipantOrderDetails(participantOrderID);
      });
    } catch (error) {
      console.error("Error fetching group order details:", error);
    }
  };

  const fetchParticipantOrderDetails = async (participantOrderID) => {
    try {
      const response = await fetch(
        `${resourceUrl}/participants?participantsOrderIdFilter=${participantOrderID}`
      );
      const data = await response.json();
      setParticipantOrdersData((prevData) => ({
        ...prevData,
        [participantOrderID]: data,
      }));



    } catch (error) {
      console.error("Error fetching participant order details:", error);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, []);

  const handleJoinGroupOrder = async (groupOrderID, FoodProviderID) => {
    try {
      const groupResponse = await fetch(`${resourceUrl}/groups/${groupID}`);
      const updatedGroup = await groupResponse.json();
      if (!updatedGroup.participantIDs.includes(user.participantID)) {
        updatedGroup.participantIDs.push(user.participantID);
      }
      await fetch(`${resourceUrl}/groups/${groupID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGroup),
      });

      setSessionGroupId(groupID);
      setSessionGroupOrderId(groupOrderID);
      setOrderFoodProviderId(groupOrders[groupOrderID].foodProviderID);
      navigate(`/foodprovider/${FoodProviderID}`)

      fetchGroupData();
    } catch (error) {
      console.error("Error joining group order:", error);
    }
  };

  return (
      <div className={Layout.pageWrapper}>
        <div className={Layout.mainContent}>
          <PageNav/>

          {group && (
              <div>
                <div className={styles.heading}>
                <div className={styles.container}>
                  <div className={styles.group_info}>
                    <p className = {styles.group_info_name}>
                     {group.name}
                    </p>
                    <p>
                      <strong>Group ID:</strong> {group.groupID}
                    </p>
                    <p>
                      <strong>Administrator ID:</strong> {group.administratorID}
                    </p>
                  </div>
                </div>
                </div>


                {group.groupOrderIDs.map((groupOrderID) => (
                    <OrdersContainer>

                    <div key={groupOrderID} className={styles.groupOrdersContainer}>

                      <div className={styles.groupOrderHeader}>
                        <div style={{fontSize: '18px', fontWeight: 'bold'}}>
                          Group Order ID: {groupOrderID}
                        </div>
                        <DefaultButton text="Join Group Order" style={{margin: 0}}
                                       onClick={() => handleJoinGroupOrder(groupOrderID, groupOrders[groupOrderID].foodProviderID)}/>


                      </div>
                      {groupOrders[groupOrderID] && (
                          <div>
                            <div className={styles.status}>
                              <p>
                                <strong>Status:</strong>{" "}
                                {groupOrders[groupOrderID].status}
                              </p>
                            </div>
                            <div className={styles.pickupTimeframe}>
                              <p>
                                <strong>Desired Pickup Timeframe:</strong>{" "}
                                {groupOrders[groupOrderID].desiredPickupTimeframe}
                              </p>
                            </div>
                            <div className={styles.foodProviderID}>
                              <p>
                                <strong>Food Provider ID:</strong>{" "}
                                {groupOrders[groupOrderID].foodProviderID}
                              </p>
                            </div>


                            <div className={styles.menu_list}>


                              {groupOrders[groupOrderID].participantOrderIDs.map((participantOrderID) => (
                                  <div key={participantOrderID} className={styles.menuItemCard}>


                                    {participantOrdersData[participantOrderID] && (
                                        <div>
                                          {participantOrdersData[participantOrderID].map((participant) => {
                                            return participant.participantOrders.map((order, orderIndex) => {
                                              // Calculate total price for the order
                                              const totalPrice = Object.entries(order.menuItemIDs).reduce(
                                                  (sum, [menuItemID, quantity]) => {
                                                    const itemCost = costMap[menuItemID] * quantity;
                                                    return sum + itemCost;
                                                  },
                                                  0
                                              );
                                              //calculate the total quantity menu item ordered by this order
                                              const itemCount = Object.values(order.menuItemIDs).reduce(
                                                  (sum, quantity) => sum + quantity,
                                                  0
                                              );
                                              return (
                                                  <div key={styles.orderCard}>
                                                    <p className={styles.orderCardName}>
                                                      <strong>Participant Name:</strong> {participant.name}
                                                    </p>
                                                    <p className={styles.orderCardCost}>
                                                      <strong>Participant ID:</strong> {participant.participantID}
                                                    </p>
                                                    <p className={styles.orderCardCost}>
                                                      <strong>Participant Order
                                                        ID:</strong> {participantOrderID}
                                                    </p>
                                                    <p className={styles.orderCardCost}>
                                                      <strong>Item Count:</strong> {itemCount}
                                                    </p>
                                                    <p className={styles.orderCardCost}>
                                                      <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                                                    </p>
                                                    <div
                                                        className="d-grid gap-2 d-md-flex justify-content-md-end">


                                                        <DefaultButton text="View" style={{margin: 0}}
                                                                       onClick={() => navigate(`/participant/${participant.participantID}`)}/>

                                                    </div>

                                                  </div>
                                              );
                                            });
                                          })}
                                        </div>
                                    )}

                                  </div>
                              ))}


                            </div>


                          </div>
                      )}

                    </div>
                    </OrdersContainer>
                ))}



              </div>
          )}
        </div>
        <Footer/>
        </div>

        );
        }

const OrdersContainer = styled.div`
    display: flex;
    flex-direction: column;
	align-items:center;
    gap: 2rem;
	padding:2rem;
`;