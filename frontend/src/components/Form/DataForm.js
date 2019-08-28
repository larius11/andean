import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components';
import axios from 'axios'

const Styles = styled.div`
    .form-label{
        font-size: 20pt
        font-weight: bold
    }
`;

const StylesTitle = styled.div`
    .form-label{
        font-size: 30pt
        font-weight: bold
    }
`;

class DataForm extends React.Component {
    state = {
        name: '',
        price: '',
        category: '',
        subCategory: '',
        details: '',
        color: '',
        image: '',
        formData: {}

    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            category: '',
            subCategory: '',
            details: '',
            color: '',
            image: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit() {
        var formData = {
            "name": this.state.name,
            "category": this.state.category,
            "subCategory": this.state.subCategory,
            "color": this.state.color,
            "image": this.state.image,
            "price": this.state.price,
            "details": this.state.details
        }
        this.state.formData = formData
        console.log("This is the data", this.state.formData)
        this.getDataAxios(this.state.formData)
    }

    async getDataAxios() {
        console.log("Sending this data: ", this.state.formData)
            const response = await axios.post(
                'http://18.191.199.125:5000/insert',
                {   title: "dataEntry",
                    data: this.state.formData },
                {   headers: { 'Content-Type': 'application/json' } }
            )
            console.log("This is the response", response.data)
        }

    render() {
        return (
            <Styles>
                <Form>
                    <StylesTitle>
                    <Form.Row>
                        <Form.Label>Data Entry</Form.Label>
                    </Form.Row>
                    </StylesTitle>
                <Form.Row>
                    <Col>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" placeholder="Name" type="text" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                    </Col>
                        <Col>
                            <Form.Label>Category</Form.Label>
                        <Form.Control name="category" placeholder="Category" type="text" value={this.state.category} onChange={this.handleChange.bind(this)}/>
                    </Col>
                    <Col>
                        <Form.Label>Sub-Category</Form.Label>
                        <Form.Control name="subCategory" placeholder="Sub-Category" type="text" value={this.state.subCategory} onChange={this.handleChange.bind(this)}/>
                    </Col>
                </Form.Row>
                <p></p>
                <Form.Row>
                        <Col>
                        <Form.Label>Color</Form.Label>
                        <Form.Control name="color" placeholder="Color" type="text" value={this.state.color} onChange={this.handleChange.bind(this)}/>
                    </Col>
                        <Col>
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="image" placeholder="Image" type="text" value={this.state.image} onChange={this.handleChange.bind(this)}/>
                    </Col>
                        <Col>
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" placeholder="Price" type="text" value={this.state.price} onChange={this.handleChange.bind(this)}/>
                    </Col>
                </Form.Row>
                <p></p>
                <Form.Row>
                        <Col>
                        <Form.Label>Details</Form.Label>
                            <Form.Control name="details" placeholder="Details" type="text" value={this.state.details} onChange={this.handleChange.bind(this)}/>
                    </Col>
                </Form.Row>
                <p></p>
                <Button variant="primary" type="button" onClick={this.onSubmit}>
                    Submit
                </Button>
                </Form>
            </Styles>
        );
    }
    
}

export default DataForm
