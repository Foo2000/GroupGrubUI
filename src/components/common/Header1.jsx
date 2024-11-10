import React from 'react'
import styled from "styled-components"

const Header1 = ({text, style}) => {
  return (
	<Text style={style}>{text}</Text>
  )
}

const Text = styled.h1`
  font-family: "Mochiy Pop P One", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: white;
  font-size:4rem;
  padding: 0rem;
  margin:0.5rem;
`
export default Header1;