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
        colorList: [],
        product: [],
        categorySelected: 'Category',
        subCategorySelected: 'Sub-Category'
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
            colorList: [],
            product: [],
            categorySelected: 'Category',
            subCategorySelected: 'Sub-Category'
        };
        this.handleSelection = this.handleSelection.bind(this)
    }

    handleButtonClick = (event) => {
        this.setState(state => {
            return {
                isOpen: !state.isOpen
            }
        });
        this.createDropdowns(event.target.innerText)
    }

    handleSelection = (event) => {

        console.log("Selection: ", event.target)
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
        else if (title == "product") {
            this.setState({
                product: formInfo
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
        else if (title == "Product") {
            var testData = this.state.product
            console.log("testData for Product: ", testData)
            this.state.subCategoryList = testData.map(function (name) {
                return <Dropdown.Item onClick={this.handleSelection} key={name}>{name}</Dropdown.Item>
            })
            return
        }
        else {
            this.handleDropDownSelection(title)
        }
    }

    handleDropDownSelection(title) {
        if (this.state.categoryList.some(item => this.state.categoryList.name === item.name)) {
            console.log("Category exists ", title)
            this.setState({
                categorySelected: title
            })
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
                                <Form.Row>
                                    <Col>
                                        <Form.Row>
                                            <Form.Label>
                                                Categories
                                            </Form.Label>
                                        </Form.Row>
                                        <DropdownButton required={true} onClick={this.handleButtonClick.bind(this)} title={this.state.categorySelected} size="lg" variant="primary" id="dropdown-basic" name="category">
                                            {this.state.categoryList}
                                        </DropdownButton>
                                    </Col>
                                    <Col>
                                        <Form.Row>
                                            <Form.Label>
                                                Subcategories
                                            </Form.Label>
                                        </Form.Row>
                                        <DropdownButton onClick={this.handleButtonClick.bind(this)} value={this.state.subCategorySelected} title="Sub-Category" size="lg" variant="secondary" id="dropdown-basic">
                                            {this.state.subCategoryList}
                                        </DropdownButton>
                                    </Col>
                                    <Col>
                                        <Form.Row>
                                            <Form.Label>
                                                Products
                                            </Form.Label>
                                        </Form.Row>
                                            <DropdownButton onClick={this.handleButtonClick.bind(this)} title="Product" size="lg" variant="info" id="dropdown-basic">
                                                {this.state.product}
                                            </DropdownButton>
                                    </Col>
                                    <Col>
                                        <Form.Row>
                                            <Form.Label>
                                                Products
                                            </Form.Label>
                                        </Form.Row>
                                            <DropdownButton title="Color" size="lg" variant="primary" id="dropdown-basic">
                                                {/* This is where I dynamically create the list for products */}
                                            </DropdownButton>
                                    </Col>
                                </Form.Row>
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
