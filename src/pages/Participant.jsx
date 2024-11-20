import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../FakeAuthContext";
import PageNav from "../components/PageNav";
import { resourceUrl } from "../config";
import styled from 'styled-components';
import DefaultButton from "../components/common/DefaultButton";
import React, { useState, useEffect } from "react";
import Header1 from "../components/common/Header1";
import Header2 from "../components/common/Header2";


function Participant({orderFoodProviderId}) {
    const { participantID } = useParams();
    const { user } = useAuth();
    const [participantOrders, setParticipantOrders] = useState([]);
    const [foodProviders, setFoodProviders] = useState([]);
	const navigate = useNavigate();

    const fetchParticipantData = async () => {
        try {
            const response = await fetch(`${resourceUrl}/participants/${participantID}`);
            const data = await response.json();
            setParticipantOrders(data.participantOrders);
        } catch (error) {
            console.error("Error fetching participant data:", error);
        }
    };

    const fetchFoodProvidersData = async () => {
        try {
            const response = await fetch(`${resourceUrl}/foodproviders`);
            const data = await response.json();
            setFoodProviders(data); 
        } catch (error) {
            console.error("Error fetching food providers data:", error);
        }
    };

	const handleAddToOrderClick = () => {
		if (orderFoodProviderId!==null && orderFoodProviderId!=="") {
			navigate(`/foodprovider/${orderFoodProviderId}`);
		}
		else{
			navigate(`/foodproviders`);
		}
    };

    useEffect(() => {
        fetchParticipantData();
        fetchFoodProvidersData();
    }, [participantID]);

    const totalItemCount = participantOrders.reduce((total, order) => {
        return total + Object.values(order.menuItemIDs).reduce((sum, quantity) => sum + quantity, 0);
    }, 0);

    const getMenuItemDetails = (menuItemID) => {
        for (const foodProvider of foodProviders) {
            const menuItem = foodProvider.menu.find(item => item.menuItemID === menuItemID);
            if (menuItem) {
                return menuItem;
            }
        }
        return null;
    };

    return (
        <div>
            <PageNav />
            <Container>
                <Header>
                    <Header1 text={user?.name} style={{ fontSize:'2.25rem', color:'black', padding:'2rem 1rem' }}/>
					<ButtonContainer>
                        <DefaultButton text="Add to Order" type="dark" onClick={handleAddToOrderClick}/>
                	</ButtonContainer>
                </Header>
				<Header2 text="Order History" style={{ fontSize:'2rem', color:'black', textAlign:"center", fontFamily: "Alexandria"}}/>
                <OrdersContainer>
                    {participantOrders.map(order => (
                        <OrderContainer key={order.participantOrderID}>
                            <OrderHeader>Order #{order.participantOrderID}</OrderHeader>
                            <OrderComment>Comments: {order.comments}</OrderComment>
                            <MenuItemsList>
                                {Object.entries(order.menuItemIDs).map(([menuItemID, quantity]) => {
                                    const menuItem = getMenuItemDetails(menuItemID);
                                    return (
                                        <MenuItem key={menuItemID}>
                                            {menuItem && (
                                                <ImageDetailsCont>
                                                    <MenuItemDetails>
														<MenuItemTitle>{menuItem ? menuItem.name + ` (Qty: ${quantity})`: "Item not found"}</MenuItemTitle>
                                                        <p>{menuItem.description}</p>
                                                        <strong>${menuItem.cost.toFixed(2)}</strong> 
                                                    </MenuItemDetails>
													{menuItem.image && (
                                                        <MenuItemImage src={menuItem.image} alt={menuItem.name} />
                                                    )}
                                                </ImageDetailsCont>
                                            )}
                                        </MenuItem>
                                    );
                                })}
                            </MenuItemsList>
                        </OrderContainer>
                    ))}
                </OrdersContainer>
            </Container>
        </div>
    );
}

// Styled Components
const Container = styled.div`
    padding: 3rem 5rem;
    font-family: 'Roboto', sans-serif;
`;

const ImageDetailsCont = styled.div`
	display:flex;
	flex-direction: row;
	width:100%;
	justify-content: space-between;
	align-items:center;
`

const Header = styled.div`
	font-family: "Alexandria", sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
	justify-content: space-around;
    width:18rem;
`;

const OrdersContainer = styled.div`
    display: flex;
    flex-direction: column;
	align-items:center;
    gap: 2rem;
	padding:2rem;
`;

const OrderContainer = styled.div`
    font-family: "Alexandria", sans-serif;
    background-color: #fff;
	width:80%;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
`;

const OrderHeader = styled.h3`
    font-size: 1.25rem;
    font-weight: 400;
    color: #333;
    margin-bottom: 1rem;
	text-align:center;
`;

const OrderComment = styled.p`
    font-size: 1rem;
    color: #777;
    margin-bottom: 1.2rem;
	font-weight: 300;
	text-align:center;
`;

const MenuItemsList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const MenuItem = styled.li`
    padding: 2rem;
	margin:2rem;
    background-color: #f5f5f5;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
`;


const MenuItemTitle = styled.h4`
    font-size: 1.15rem;
    font-weight: 600;
    color: #333; 
	font-weight: 400;
	margin:0;
`;

const MenuItemDetails = styled.div`
	display:flex;
	flex-direction:column;
	justify-content: space-between;
    font-size: 1rem;
    color: #555;
    margin-top: 0.8rem;
`;

const MenuItemImage = styled.img`
    width: 8rem;
    height: auto;
    border-radius: 8px;
`;

export default Participant;
