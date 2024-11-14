import React from 'react'
import styled from "styled-components"

const Header2 = ({text, style}) => {
  return (
	<Text style={style}>{text}</Text>
  )
}

const Text = styled.h2`
  font-family: "Mochiy Pop P One", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: black;
  font-size:2rem;
  padding: 0rem;
  margin:0.5rem;
`
export default Header2;