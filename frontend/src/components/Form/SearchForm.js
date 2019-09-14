import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import shirt from './shirt.jpg'

const Styles = styled.div`
    .form-label{
        font-size: 20pt
        font-weight: bold
    }
`;

class SearchForm extends React.Component {
    state = {
        name: '',
        price: '',
        category: '',
        subCategory: '',
        details: '',
        color: '',
        image: ''

    };

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            price: '',
            category: '',
            subCategory: '',
            details: '',
            color: '',
            image: ''
        };
    }

    render() {
        return (
            <Styles>
            <Form>
                <Form.Row>
                    <Form.Label>
                        Search
                    </Form.Label>
                </Form.Row>

                <Form.Row>
                    <ButtonToolbar>
                          <DropdownButton title="Category" size="lg" variant="primary" id="dropdown-basic">
                            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                            <Dropdown.Item eventKey="3">
                              Active Item
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton title="Sub-Category" size="lg" variant="secondary" id="dropdown-basic">
                                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="3">
                                    Active Item
                            </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton title="Product" size="lg" variant="info" id="dropdown-basic">
                                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="3">
                                    Active Item
                            </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                            </DropdownButton>

                    </ButtonToolbar>   
                    </Form.Row>
                    <p></p>
                    <p></p>
                    <Form.Row>
                        <Container>
                            <Form.Row>
                                <Col>
                                    <Image src={shirt} rounded />
                                </Col>
                                <Col>
                                    <Form.Label>
                                        Product Name
                                    </Form.Label>
                                    <Card type="text">
                                        <Card.Body>Product Details</Card.Body>
                                    </Card>
                                    <p></p>
                                    <Form.Label>
                                        Price
                                    </Form.Label>
                                    <Card type="text">
                                        <Card.Body>Price</Card.Body>
                                    </Card>
                                </Col>
                            </Form.Row>
                        </Container>
                    </Form.Row>
                <p></p>
                <Button variant="primary" type="button">
                    Purchase
                </Button>
            </Form>
            </Styles>
        );
    }

}

export default SearchForm;
