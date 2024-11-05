import React, { useEffect, useState } from 'react';
import PageNav from "./components/PageNav";
import axios from "axios";

function FoodProvider() {
    const [users, setUsers] = useState([]);
    const [view, setView] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [currentMenuItem, setCurrentMenuItem] = useState({
        name: "",
        description: "",
        cost: "",
        image: "",
    });
    const handleCurrentMenuItemChange = (field, value) => {
        setCurrentMenuItem({ ...currentMenuItem, [field]: value });
        console.log("Updated currentMenuItem:", { ...currentMenuItem, [field]: value });

    };
    const addMenuItem = () => {
        const newMenuItem = { ...currentMenuItem };
        setMenuItems((prevMenuItems) => [...prevMenuItems, newMenuItem]);
        console.log("all MenuItems:", ...menuItems);
        setCurrentMenuItem({ name: "", description: "", cost: "", image: "" });

    };

    useEffect(() => {
        fetch('http://localhost:8081/foodproviders')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFoodProvider = {
            name: e.target.name.value,
            location: e.target.location.value,
            phoneNumber: e.target.phoneNumber.value,
            hoursOfOperation: e.target.hoursOfOperation.value,
            menu: menuItems,
        };
        try {
            const response = await axios.post('http://localhost:8081/foodproviders', newFoodProvider);
            console.log('Data saved successfully:', response.data);
            setUsers((prevUsers) => [...prevUsers, response.data]);
            setView("allInfo");
        } catch (error) {
            console.error(error);
        }

    }

    return (

        <div>
            <PageNav />
            <h2>Food Providers</h2>
            <div>
                <button onClick={()=>setView("signup")}>Sign Up for New Food Provider</button>
                <button onClick={()=>setView("allInfo")}>Available Food Provider</button>
            </div>
            {view === "allInfo" && (<ul>
                    {users.map(user => (
                        <li key={user.foodProviderID}>
                            <h3>{user.name}</h3>
                            <p>Location: {user.location}</p>
                            <p>Phone: {user.phoneNumber}</p>
                            <p>Hours of Operation: {user.hoursOfOperation}</p>

                            <h4>Menu:</h4>

                            <ul>
                                {user.menu.map((menuItem, index) => (
                                    <li key={menuItem.menuItemID || index}>
                                        <p>Name: {menuItem.name}</p>
                                        <p>Description: {menuItem.description}</p>
                                        <p>Cost: ${menuItem.cost}</p>
                                        <img
                                            src={menuItem.image}
                                            alt={menuItem.name}
                                            style={{width: '150px'}}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>


            )}
            {view === "signup" && (
                <div>
                    <h2>Sign Up New Food Provider</h2>
                    {/* Sign-up form */}
                    <form onSubmit={handleSubmit}>
                        {/* Basic Information for Food Provider */}
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required/>
                        <br/>

                        <label htmlFor="location">Location:</label>
                        <input type="text" id="location" name="location" required/>
                        <br/>

                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" required/>
                        <br/>

                        <label htmlFor="hoursOfOperation">Hours of Operation:</label>
                        <input type="text" id="hoursOfOperation" name="hoursOfOperation" required/>
                        <br/>

                        <h3>Menu Items:</h3>

                        <label htmlFor="menuItemName">Name:</label>
                        <input
                            type="text"
                            id="menuItemName"
                            value={currentMenuItem.name}
                            onChange={(e) => handleCurrentMenuItemChange("name", e.target.value)}
                            required
                        />
                        <br/>


                        <label htmlFor="menuItemDescription1">Description:</label>
                        <input
                            type="text"
                            id="menuItemDescription1"
                            name="menuItemDescription1"
                            value={currentMenuItem.description}
                            onChange={(e) => handleCurrentMenuItemChange("description", e.target.value)}
                            required
                        />
                        <br/>

                        <label htmlFor="menuItemCost1">Cost:</label>
                        <input
                            type="number"
                            id="menuItemCost1"
                            name="menuItemCost1"
                            min="0"
                            step="0.01"
                            value={currentMenuItem.cost}
                            onChange={(e) => handleCurrentMenuItemChange("cost", e.target.value)}
                            required
                        />
                        <br/>

                        <label htmlFor="menuItemImage1">Image URL:</label>
                        <input
                            type="url"
                            id="menuItemImage1"
                            name="menuItemImage1"
                            value={currentMenuItem.image}
                            onChange={(e) => handleCurrentMenuItemChange("image", e.target.value)}
                            required
                        />
                        <br/>
                        <button type="button" onClick={addMenuItem}>
                            Add More Menu Item
                        </button>
                        <br/>
                        <button type="submit" >Submit</button>
                    </form>

                </div>

            )}

        </div>
    );
}

export default FoodProvider;
