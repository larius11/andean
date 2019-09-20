import React, { useCallback } from 'react'
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
        images: '',
        formData: {},
        file: null

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
            images: '',
            file: null
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
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
            "image": this.state.images,
            "price": this.state.price,
            "details": this.state.details
        }
        this.state.formData = formData
        this.getDataAxios()
    }

    async getDataAxios() {
        console.log("Sending this data: ", this.state.formData)
        const response = await axios.post(
            'http://18.224.15.182:5000/insert',
            this.state.formData,
            { headers: { 'Content-Type': 'application/json' } }

        )
        console.log("This is the response", response.data)
    }

    onImageChange(e) {
        let files = e.target.files;
        let fileReader = new FileReader();
        console.log("this is e: " + e.target.files[0])
        if (files[0]) {
            this.setState({
                file: URL.createObjectURL(e.target.files[0])
            })
            fileReader.readAsDataURL(files[0]);
            fileReader.onload = (e) => {
                //console.log("image data", e.target.result)
                this.state.images = e.target.result;
                //this.state.file = URL.createObjectURL(files[0])
            }
        }
        else {
            this.setState({
                file: null
            })
        }

        fileReader.onabort = () => {
            alert("Reading Aborted")
            this.setState({
                file: null
            })
        }
        fileReader.onerror = () => {
            alert("Reading Error")
            this.setState({
                file: null
            })
        }
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
                            <Form.Control required={true} name="name" placeholder="Name" type="text" value={this.state.name} onChange={this.handleChange.bind(this)} />
                        </Col>
                        <Col>
                            <Form.Label>Category</Form.Label>
                            <Form.Control required={true} name="category" placeholder="Category" type="text" value={this.state.category} onChange={this.handleChange.bind(this)} />
                        </Col>
                        <Col>
                            <Form.Label>Sub-Category</Form.Label>
                            <Form.Control required={true} name="subCategory" placeholder="Sub-Category" type="text" value={this.state.subCategory} onChange={this.handleChange.bind(this)} />
                        </Col>
                    </Form.Row>
                    <p></p>
                    <Form.Row>
                        <Col>
                            <Form.Label>Color</Form.Label>
                            <Form.Control required={true} name="color" placeholder="Color" type="text" value={this.state.color} onChange={this.handleChange.bind(this)} />
                        </Col>
                        <Col>
                            <Form.Label>Price</Form.Label>
                            <Form.Control required={true} name="price" placeholder="Price" type="text" value={this.state.price} onChange={this.handleChange.bind(this)} />
                        </Col>
                    </Form.Row>
                    <p></p>
                    <Form.Row>
                        <Col>
                            <Form.Label>Details</Form.Label>
                            <Form.Control required={true} name="details" placeholder="Details" type="text" value={this.state.details} onChange={this.handleChange.bind(this)} />
                        </Col>
                    </Form.Row>
                    <p></p>
                    <Form.Row>
                        <Col>
                            <Form.Label>Image</Form.Label>
                            <Form.Row>
                                <Form.Control required={true} name="images" placeholder="Image Link" type="text" value={this.state.images} onChange={this.handleChange.bind(this)} />
                            </Form.Row>
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