import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'; // Import Link
import Header2 from './Header2'

const Footer = () => {
  return (
	<FooterCont>
		<Link to="/" style={{ textDecoration: 'none' }}> {/* Wrap Header2 with Link */}
			<Header2 text="GroupGrub" style={{color:'white'}}/>
		</Link>
		<Rights>© 2024. All rights reserved. </Rights>
	</FooterCont>
  )
}

const FooterCont = styled.div`
	background-color: #252525;
	text-align:center;
	padding:2rem;
`

const Rights = styled.div`
	font-family: "Alexandria", sans-serif;
	font-weight: 300;
	color: white;
	font-size:1rem;
	margin:2rem;
`

export default Footer;