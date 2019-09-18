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
        font-size: 30px
        font-weight: bold
    }
    .dropdown-header{
        font-size: 30px
        font-weight: bold
        color: black
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
        subCategorySelected: 'Sub-Category',
        selectionName: '',
        disabledValue: []
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
            subCategorySelected: 'Sub-Category',
            selectionName: '',
            disabledValue: [false, true, true, true]
        };
        //this.handleSelection = this.handleSelection.bind(this)
    }

    handleButtonClick = (event) => {
        this.setState(state => {
            return {
                isOpen: !state.isOpen
            }
        });
        this.createDropdowns(event.target.innerText)

        if (event.target.innerText == "Product" && this.state.categorySelected != "Category" && this.state.subCategorySelected != "Sub-Category") {
            console.log("getInitialData for products")
            this.getInitialData("products")
        }
    }

    // handleSelection = (event) => {

    //     console.log("Selection: ", event.target)
    // }

    componentDidMount() {
        console.log("Component Did Mount")
        this.getInitialData("categories")
        this.getInitialData("subCategories")
    }

    async getDataAxios(title) {
        if (title == "products") {
            console.log("Request Title: ", title)
            var data = {
                category: [this.state.categorySelected],
                subCategory: [this.state.subCategorySelected]
            }
            console.log("Product JSON Data: ", data)
            const response =
                await axios.get("http://18.191.199.125:5000/" + title,
                JSON.stringify(data),
                // { headers: {'Content-Type': 'application/json'}}
                )
            console.log("Response for products: ", response.data)
            return response.data
        }
        else {
            const response =
                await axios.get("http://18.191.199.125:5000/" + title)
            console.log("Response: ", response.data)
            return response.data
        }
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
            this.setState({
                subCategory: formInfo
            })
        }
        else if (title == "products") {
            this.setState({
                product: formInfo
            });
            console.log("Products: ", this.state.product)
        }
        else if (title === "colors") {
            this.setState({
                color: formInfo
            })
        }
    }

    createDropdowns(title) {
        if (title == "Category") {
            var testData = this.state.category
            this.state.categoryList = testData.map(function (name) {
                return <Dropdown.Item key={name}>{name}</Dropdown.Item>
            })
            return
        }
        else if (title == "Sub-Category") {
            var testData = this.state.subCategory
            this.state.subCategoryList = testData.map(function (name) {
                return <Dropdown.Item key={name} value={name}>{name}</Dropdown.Item>
            })
            return
        }
        else if (title == "Product") {
            var testData = this.state.product
            this.state.product = testData.map(function (name) {
                return <Dropdown.Item href={name} ref={name} onClick={this.handleSelection} key={name}>{name}</Dropdown.Item>

            })
            return
        }
        else {
            this.handleDropDownSelection(title)
        }
    }

    handleDropDownSelection(title) {
        console.log("Title: ", title)
        console.log("Categories: ", this.state.category)
        //console.log(this.state.category.filter((val) => val.includes(title)))
        console.log("SubCategories: ", this.state.subCategory)
        //console.log(this.state.subCategory.filter((val) => val.includes(title)))

        if (this.state.category.toString().includes(title)) {
            this.setState({
                disabledValue: [false, false, true, true],
                categorySelected: title
            });
        }
        else if (this.state.subCategory.toString().includes(title)) {
            console.log("Sub-category exists ", title)
            this.setState({
                disabledValue: [false, false, false, true],
                subCategorySelected: title
            })
        }
    }

    render() {
        return (
            <div className="container">
                <Styles>
                    <p></p>
                    <Card className="text-center" bg={'#206fac'}>
                        <Card.Header>Search</Card.Header>
                        <Card.Body>
                            <Card.Title>Search for an item.</Card.Title>
                            <Card.Text>
                                Select your item based on the criteria.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Form>
                        {/* <Form.Row> */}
                        <ButtonToolbar>
                            <Col sm={3}>
                                <Form.Row>
                                    <Form.Label>
                                        Categories
                                            </Form.Label>
                                </Form.Row>
                                {/* <Dropdown.Header>Category</Dropdown.Header> */}
                                <DropdownButton ref="category" disabled={false} required={true} onClick={this.handleButtonClick.bind(this)} title={this.state.categorySelected} size="lg" variant="primary" id="dropdown-basic1" name="category">
                                    {this.state.categoryList}
                                </DropdownButton>
                            </Col>
                            <Col sm={3}>
                                <Form.Row>
                                    <Form.Label>
                                        Subcategories
                                            </Form.Label>
                                </Form.Row>
                                <DropdownButton ref="subCategory" disabled={this.state.disabledValue[1]} onClick={this.handleButtonClick.bind(this)} title={this.state.subCategorySelected} size="lg" variant="secondary" id="dropdown-basic2">
                                    {this.state.subCategoryList}
                                </DropdownButton>
                            </Col>
                            <Col sm={3}>
                                <Form.Row>
                                    <Form.Label>
                                        Products
                                            </Form.Label>
                                </Form.Row>
                                <DropdownButton ref="product" disabled={this.state.disabledValue[2]} onClick={this.handleButtonClick.bind(this)} title="Product" size="lg" variant="info" id="dropdown-basic3">
                                    {this.state.product}
                                </DropdownButton>
                            </Col>
                            <Col sm={3}>
                                <Form.Row>
                                    <Form.Label>
                                        Color
                                            </Form.Label>
                                </Form.Row>
                                <DropdownButton disabled={this.state.disabledValue[3]} title="Color" size="lg" variant="primary" id="dropdown-basic4">
                                    {/* This is where I dynamically create the list for products */}
                                </DropdownButton>
                            </Col>
                        </ButtonToolbar>
                        {/* </Form.Row> */}
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
