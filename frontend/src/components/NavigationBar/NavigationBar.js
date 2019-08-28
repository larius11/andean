import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar{
        background-color: #222;
    }

.navbar-brand, .navbar-nav .nav-link{
    color: #bbb;
    font-size: 15pt
    font-weight: bold
    
&:hover{
    color: white;

    }
}
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar expands="lg">
            <Navbar.Brand href="/"> Mercaderia </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav"> </Navbar.Collapse>
                <Nav className="m1-auto">
                <Nav.Item> <Nav.Link href="/">Home</Nav.Link></Nav.Item>
                <Nav.Item> <Nav.Link href="/SearchForm">Search</Nav.Link></Nav.Item>
                </Nav>
         </Navbar>
    </Styles>
)