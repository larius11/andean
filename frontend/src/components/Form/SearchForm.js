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
import axios from 'axios'

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
        category: [],
        subCategory: [],
        details: '',
        color: [],
        image: '',
        categoryList: [],
        subCategoryList: [],
        colorList: []
    };

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            price: '',
            category: [],
            subCategory: [],
            details: '',
            color: [],
            image: '',
            categoryList: [],
            subCategoryList: [],
            colorList: []
        };
    }

    handleButtonClick = (event) => {
        this.setState(state => {
            return {
                isOpen: !state.isOpen
            }
        });
        this.createDropdowns(event.target.innerText)
    }

    componentDidMount() {
        console.log("Component Did Mount")
        this.getInitialData("categories")
        this.getInitialData("subCategories")
        //this.createDropdowns(data)
    }

    async getDataAxios(title) {
        const response =
            await axios.get("http://18.191.199.125:5000/" + title)
        console.log("Response: ", response.data)
        return response.data
    }

    async getInitialData(title) {
        var formInfo = await this.getDataAxios(title)
        console.log("formInfo: ", formInfo)
        if (title == "categories") {
            this.setState({
                category: formInfo
            });
        }
        else if (title == "subCategories") {
            this.setState({
                subCategory: formInfo
            });
        }

    }

    createDropdowns(title) {
        console.log("State:", this.state)
            console.log("Title:", title)
            if (title == "Category") {
                var testData = this.state.category
                console.log("testData for Category: ", testData)
                this.state.categoryList = testData.map(function (name) {
                    return <Dropdown.Item key={name}>{name}</Dropdown.Item>
                })
                return
            }
            else if (title == "Sub-Category") {
                var testData = this.state.subCategory
                console.log("testData for subCategory: ", testData)
                this.state.subCategoryList = testData.map(function (name) {
                    return <Dropdown.Item key={name}>{name}</Dropdown.Item>
                })
                return
            }
    }

    render() {
        return (
            <div className="container">
                <Styles>
                    <Form>
                        <Form.Row>
                            <Form.Label>
                                Search
                    </Form.Label>
                        </Form.Row>

                        <Form.Row>
                            <ButtonToolbar>
                                <DropdownButton required={true} onClick={this.handleButtonClick.bind(this)} title="Category" size="lg" variant="primary" id="dropdown-basic" name="category">
                                    {this.state.categoryList}
                                </DropdownButton>

                                <DropdownButton onClick={this.handleButtonClick.bind(this)} title="Sub-Category" size="lg" variant="secondary" id="dropdown-basic">
                                    {this.state.subCategoryList}
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

                                <DropdownButton title="Color" size="lg" variant="primary" id="dropdown-basic">
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
                        <Button variant="primary" type="button" onClick={this.onSubmit}>
                            Purchase
                </Button>
                    </Form>
                </Styles>
            </div>
        );
    }

}

export default SearchForm;
