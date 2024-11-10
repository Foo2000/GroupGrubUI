import React from 'react'
import styled from 'styled-components'

const DefaultButton = ({ text, type, style, onClick }) => {
	return (
	  <Btn $type={type} style={style} onClick={onClick}>{text}</Btn>
	);
  };  

const Btn = styled.button`
	background-color: ${props => props.$type === "light" ? "#FFFFFF" : props.$type === "remove" ? "#BEBEBE" : "#FF5E00"};
	color: ${props => props.$type === "light" ? "#FF5E00" : "#FFFFFF"};
	border-radius: 25px;
	font-family: "Alexandria", sans-serif;
	font-weight: 400;
	font-size: 1rem;
	border: none;
	padding: 0.5rem 1rem;
	margin:1rem;
	cursor:pointer;
`;

export default DefaultButton;