import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../FakeAuthContext";
import styled from "styled-components";
import mainImage from "../images/main-image.png"
import Header1 from "../components/common/Header1";
import DefaultButton from "../components/common/DefaultButton";
import Header2 from "../components/common/Header2";
import phones from "../images/phones.png"
import foodorder from "../images/foodorder.png"
import foodbank1 from "../images/foodbank-1.jpg"
import foodbank2 from "../images/foodbank-2.jpg"
import Footer from "../components/common/Footer";
import FoodProviderSearch from "../components/homepage/FoodProviderSearch";
import { GoogleLogin } from '@react-oauth/google';

const Homepage = () => {
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user && user.participantID) {
            navigate(`/participant/${user.participantID}`, { replace: true });
        }
    }, [isAuthenticated, navigate, user]);

    const handleOrderNowClick = () => {
        navigate('/foodproviders');
    };

    return (
        <div>
            <TopSection>
                <div style={{ float: 'right', display: 'block', padding: '1rem' }}>
                    <GoogleLogin
                        style={{float:'right', display:"block"}}
                        onSuccess={async (credentialResponse) => {
                            const token = credentialResponse.credential;
                            await login(token);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
                <FlexContainer>
                    <MainImage src={mainImage}/>
                    <Container>
                        <Header1 text="GroupGrub"/>
                        <Slogan>Easy Ordering, Together.</Slogan>
                        <FoodProviderSearch/>
                    </Container>
                </FlexContainer>
            </TopSection>
            <Section style={{padding:'3rem'}}>
                <Header2 text="Group Orders Made Easy" style={{ textAlign:'center' }}/>
                <FlexContainer style={{justifyContent:'space-around', padding:'2rem 10rem'}}>
                    <Container>
                        <Image src={phones}/>
                        <Header2 text="Individual Orders" style={{ fontSize:'1.75rem' }}/>
                        <Description>
                            Users place their individual food orders on their phones. 
                            Each participant adds their order to a shared group order, ensuring the administrator has access to everyone's choices in one place, without any hassle.
                        </Description>
                    </Container>
                    <Container>
                        <Image src={foodorder} style={{width:'32%'}}/>
                        <Header2 text="One Takeout" style={{ fontSize:'1.75rem' }}/>
                        <Description>
                            Once all participants have added their orders, the administrator reviews and submits the final group order. The final order includes all individual customizations, 
                            ensuring every participant’s specific needs are met in one seamless submission to the food provider.
                        </Description>
                    </Container>
                </FlexContainer>
            </Section>
            <Section style={{padding:'3rem', backgroundColor: 'white'}}>
                <Header2 text="Why You'll Love Us" style={{ textAlign:'center' }}/>
                <FlexContainer style={{justifyContent:'space-around', padding:'2rem'}}>
                    <Container>
                        <Image src={foodbank1} style={{ width:'80%' }}/>
                    </Container>
                    <Container style={{ width: '40%' }}>
                        <Header2 text="Feeding Communities Together" style={{ fontSize:'2rem', textAlign:'center' }}/>
                        <Description style={{ width: '80%' }}>
                            This service makes it easier for shelters and donors to provide personalized meals to the homeless, 
                            ensuring that everyone in need gets food that fits their dietary requirements while minimizing waste.
                        </Description>
                        <DefaultButton text="Order now" onClick={handleOrderNowClick}/>
                    </Container>
                </FlexContainer>
            </Section>
            <Section style={{padding:'3rem'}}>
                <FlexContainer style={{justifyContent:'space-around', flexDirection:'row-reverse', padding:'2rem', bottom:'1rem'}}>
                    <Container>
                        <Image src={foodbank2} style={{ width:'80%' }}/>
                    </Container>
                    <Container style={{ width: '40%' }}>
                        <Header2 text="Disaster Relief Made Easy" style={{ fontSize:'2rem', textAlign:'center' }}/>
                        <Description style={{ width: '90%' }}>
                            This service streamlines meal delivery to disaster-affected areas, quickly connecting relief organizations with the food communities need to support recovery efforts and minimize waste.
                        </Description>
                        <DefaultButton text="Order now" onClick={handleOrderNowClick}/>
                    </Container>
                </FlexContainer>
            </Section>
            <Footer/>
        </div>
    );
};

const Description = styled.p`
	font-size: 1.15rem;
	font-family: "Alexandria", sans-serif;
  	font-weight: 300;
	text-align:center;
	width: 80%;
	margin: 2rem;
`;

const Image = styled.img`
	margin: 2.5rem;
	width: 40%;
`;

const Section = styled.div`
	background-color: #FFF0E8;
	margin:0;
`;

const TopSection = styled.div`
	background-color: #FF8249;
	margin:0;
`;

const FlexContainer = styled.div`
	display:flex;
	justify-content: space-between;
`;

const MainImage = styled.img`
	width: 50vw;
	height: 100%;
`;

const Slogan = styled.p`
	font-family: "Alexandria", sans-serif;
  	font-weight: 300;
	color:white;
	font-size:1.75rem;
	text-align:center;
	padding: 0rem;
	margin:1rem;
`;

const Container = styled.div`
	display:flex;
	width:50vw;
	justify-content:center;
	align-items:center;
	flex-direction: column;
`;

export default Homepage;