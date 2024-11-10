import React, { useState } from "react";
import styled from "styled-components";
import { restaurants } from "../../data/food-provider-search";
import { useNavigate } from "react-router-dom";

const FoodProviderSearch = () => {
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
const navigate = useNavigate();

const handleInputChange = (e) => {
	const input = e.target.value;
	setQuery(input);

	if (input) {
		const filtered = restaurants.filter((restaurant) =>
			restaurant.name.toLowerCase().includes(input.toLowerCase()));
		setResults(filtered);
	} 
	else {
		setResults([]);
	}
};

const handleRestaurantClick = (restaurantName) => {
	navigate(`/foodproviders/${encodeURIComponent(restaurantName)}`);
};

const handleRedirect = () => {
	navigate("/foodproviders");
};

return (
	<div>
		<SearchBarContainer>
			<Input
				type="text"
				placeholder="Find a restaurant near you..."
				value={query}
				onChange={handleInputChange}
			/>
			<Button onClick={handleRedirect}>
			<span>&#8594;</span>
			</Button>
		</SearchBarContainer>
		{results.length > 0 && (
			<SearchResults>
				{results.map((item) => (
					<div
					key={item.id}
					onClick={() => handleRestaurantClick(item.name)}
					>
					{item.name} - {item.location}
					</div>
				))}
			</SearchResults>)}
	</div>);
};

const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	background-color: white;
	padding: 5px 10px;
	border-radius: 15px;
	width: 400px;
	margin: 1rem;
`;

const Input = styled.input`
	font-family: "Alexandria", sans-serif;
	font-weight: 300;
	flex: 1;
	padding: 10px;
	border: none;
	border-radius: 20px;
	outline: none;
	font-size: 16px;
	color: #000000;
	opacity:0.65;
`;

const Button = styled.button`
	background-color: #f17c44;
	border: none;
	outline: none;
	padding: 0px 2px;
	border-radius: 50%;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	color:white;
	font-size:2.15rem;
`;

const SearchResults = styled.div`
	font-family: "Alexandria", sans-serif;
	font-weight: 300;
	margin-top: 10px;
	padding: 10px;
	cursor: pointer;
	background-color: #fff;
	border-radius: 10px;
	max-width: 400px;
	margin: auto;
`;

export default FoodProviderSearch;