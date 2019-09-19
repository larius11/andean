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
        productList: [],
        colorList: [],
        product: [],
        categorySelected: 'Category',
        subCategorySelected: 'Sub-Category',
        productSelected: 'Product',
        selectionName: '',
        disabledValue: [],
        finalProduct: '',
        found: false
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
            productSelected: 'Product',
            colorSelected: 'Color',
            selectionName: '',
            disabledValue: [false, true, true, true],
            finalProduct: 'Product',
            found: false
        };
        //this.handleSelection = this.handleSelection.bind(this)
    }

    handleButtonClick = (event) => {
        var innerText = event.target.innerText
        if (event.target.innerText == "Product") {
            console.log("getInitialData for products")
            this.getInitialData("products").then((response) => {
                console.log("Response: ", response)
                const uniqueSet = new Array()
                response.forEach(element => {
                    if (!uniqueSet.includes(element[0])) {
                        uniqueSet.push(element[0])
                    }
                });
                console.log("uniqueSet: ", uniqueSet)
                this.setState({
                    product: uniqueSet
                });
                console.log("Products in state: ", this.state.product)
                this.setState(state => {
                    this.createDropdowns(innerText)
                    return {
                        isOpen: !state.isOpen
                    }

                });

            })
        }
        else if (event.target.innerText == "Color") {
            console.log("getInitialData for Color")
            this.getInitialData("colors").then((response) => {
                console.log("Response: ", response)
                const uniqueSet = new Array()
                response.forEach(element => {
                    if (!uniqueSet.includes(element[0])) {
                        uniqueSet.push(element[0])
                    }
                });
                console.log("uniqueSet: ", uniqueSet)
                this.setState({
                    color: uniqueSet
                });
                console.log("Colors in state: ", this.state.color)
                this.setState(state => {
                    this.createDropdowns(innerText)
                    return {
                        isOpen: !state.isOpen
                    }
                });
            })
        }
        else {
            console.log("Handling Regularly")
            this.setState(state => {
                return {
                    isOpen: !state.isOpen
                }
            });
            this.createDropdowns(event.target.innerText)
        }
    }
    componentWillUpdate() {
        console.log("in componentWillUpdate and color is: ", this.state.color)
        if (this.state.categorySelected !== "Category" && this.state.subCategorySelected !== "Sub-Category" && this.state.subCategorySelected == "Product") {
            console.log("Component will NOT update")
            //this.state.testState = 'testState'
            return false
        }
        else if (this.state.colorSelected !== "Color"){
            return true
        }
        else {
            console.log("Component will update")
            return true
        }
    }

    componentDidUpdate(){
        console.log("Inside componentDidUpdate and this.state.found= ", this.state.found)
        if (this.state.colorSelected !== "Color" && this.state.categorySelected !== "Category" && this.state.subCategorySelected !== "Sub-Category" && this.state.productSelected != "Product" && this.state.found == false){
            console.log("Inside componentDidUpdate and getting final product")
            this.getInitialData("product").then((response) => {
                console.log("Response: ", response)
                const product = response
                console.log("Product Data: ", product)
                this.setState({
                    finalProduct: product[0],
                    price: product[1],
                    image: product[2],
                    found: true
                })
                return true
            })
        }
        else{
            return true
        }
    }

    componentDidMount() {
        console.log("Component Did Mount")
        this.getInitialData("categories")
        this.getInitialData("subCategories")
    }

    async getDataAxios(title) {
        if (title == "products") {
            console.log("Request Title: ", title)
            var data = {
                "category": this.state.categorySelected,
                "subCategory": this.state.subCategorySelected
            }
            const response =
                await axios.post("http://18.191.199.125:5000/" + title,
                    data,
                    { headers: { 'Content-Type': 'application/json' } }
                )
            return response.data
        }
        else if (title == "colors") {
            console.log("Request Title: ", title)
            var data = {
                "category": this.state.categorySelected,
                "subCategory": this.state.subCategorySelected,
                "product": this.state.productSelected
            }
            const response =
                await axios.post("http://18.191.199.125:5000/" + title,
                    data,
                    { headers: { 'Content-Type': 'application/json' } }
                )
            return response.data
        }
        else if (title == "product") {
            var data = {
                "category": this.state.categorySelected,
                "subCategory": this.state.subCategorySelected,
                "product": this.state.productSelected,
                "color": this.state.colorSelected
            }
            const response =
                await axios.post("http://18.191.199.125:5000/" + title,
                    data,
                    { headers: { 'Content-Type': 'application/json' } }
                )
            return response.data
        }
        else {
            const response =
                await axios.post("http://18.191.199.125:5000/" + title)
            console.log("Response: ", response.data)
            return response.data
        }
    }

    async getInitialData(title) {
        var formInfo = await this.getDataAxios(title)
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
        else if (title == "products") {
            const uniqueSet = new Array()
            formInfo.forEach(element => {
                if (!uniqueSet.includes(element[0])) {
                    uniqueSet.push(element[0])
                }
            });
            console.log("uniqueSet: ", uniqueSet)
            this.setState({
                product: uniqueSet
            });
            console.log("Products in state: ", this.state.product)
        }
        else if (title === "colors") {
            this.setState({
                color: formInfo
            })
        }
        else if (title === "product"){
            return formInfo
        }
        return formInfo
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
            console.log("testData: ", testData)
            this.state.productList = testData.map(function (name) {
                return <Dropdown.Item key={name}>{name}</Dropdown.Item>
            })
            return
        }
        else if (title == "Color") {
            var testData = this.state.color
            console.log("testData: ", testData)
            this.state.colorList = testData.map(function (name) {
                return <Dropdown.Item key={name}>{name}</Dropdown.Item>
            })
            return
        }
        else if (title == "Color" && this.state.colorSelected !== "Color") {
            var testData = this.state.color
            console.log("testData: ", testData)
            this.state.colorList = testData.map(function (name) {
                return <Dropdown.Item onSelect={console.log("Selected Color")} key={name}>{name}</Dropdown.Item>
            })
            return
        }
        else {
            this.handleDropDownSelection(title)
        }
    }

    handleSelect(e){
        console.log("Selected: ", e.target)
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
        else if (this.state.product.toString().includes(title)) {
            console.log("Product exists ", title)
            this.setState({
                disabledValue: [false, false, false, false],
                productSelected: title
            })
        }
        else if (this.state.color.toString().includes(title)) {
            console.log("Color exists ", title)
            this.setState({
                disabledValue: [false, false, false, false],
                colorSelected: title
            })
        }
        // else if (this.state.color.toString().includes(title) && this.state.colorSelected !== "Color") {
        //     console.log("getInitialData for product")
        //     this.getInitialData("product").then((response) => {
        //         console.log("Response: ", response)
        //         const product = response.data
        //         console.log("product: ", product)
        //         this.setState({
        //             finalProduct: product
        //         });
        //         console.log("product in state: ", this.state.product)
        //         this.setState(state => {
        //             this.createDropdowns(this.state.colorSelected)
        //             return {
        //                 isOpen: !state.isOpen
        //             }
        //         });
        //     })
        // }
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
                                <DropdownButton ref="product" disabled={this.state.disabledValue[2]} onClick={this.handleButtonClick.bind(this)} title={this.state.productSelected} size="lg" variant="info" id="dropdown-basic3">
                                    {this.state.productList}
                                </DropdownButton>
                            </Col>
                            <Col sm={3}>
                                <Form.Row>
                                    <Form.Label>
                                        Color
                                    </Form.Label>
                                </Form.Row>
                                <DropdownButton disabled={this.state.disabledValue[3]} onClick={this.handleButtonClick.bind(this)} title={this.state.colorSelected} size="lg" variant="primary" id="dropdown-basic4">
                                    {this.state.colorList}
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
                                        <Image alt={""} src={this.state.image} width={300} height={300} rounded />
                                    </Col>
                                    <Col>
                                        <Form.Label>
                                            Product
                                        </Form.Label>
                                        <Card type="text">
                                            <Card.Body>{this.state.finalProduct}</Card.Body>
                                        </Card>
                                        <p></p>
                                        <Form.Label>
                                            Price
                                    </Form.Label>
                                        <Card type="text">
                                            <Card.Body>{this.state.price}</Card.Body>
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
