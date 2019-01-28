import React, { Component } from 'react';
import axios from 'axios'
import { Container,Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, Button } from 'reactstrap';
import {CartContext} from '../contexts/Cart'

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products:[]
    }
  }

  //http://192.168.56.1:8080/ is localhost
  componentDidMount = () => {
    axios.get("http://192.168.56.1:8080/products").then(res => {
      this.setState({
        products: res.data
      })
    })
  };


  render() {
    const {products}= this.state
    return (
      <Container>
        <h2>Products</h2>
        <Row>
          {products.map(product => (
            <Col sm="4" key={product.id}>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={product.imageUrl}/>
                <CardBody>
                  <CardTitle>{product.name}</CardTitle>
                  <CardText>{product.description}</CardText>
                  <CartContext.Consumer>
                    {({ addToCart }) => (
                      <Button onClick={()=>addToCart(product)}>Add to cart</Button>
                    )}
                  </CartContext.Consumer>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }
}
