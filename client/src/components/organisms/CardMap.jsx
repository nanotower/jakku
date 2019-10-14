import React, { Component } from "react";
import { Row, Col, Card } from "react-materialize";
import { NavLink } from "react-router-dom";

export default class CardMap extends Component {
 





  render() {
    return (
      <div>
        <Row>
          <Col m={6} s={12}>
            <Card
              className="blue-grey darken-1"
              textClassName="white-text"
              title="Card title"
              actions={[<NavLink to={`/product/${this.props.bid._id}`}>Mudanza</NavLink>]}
            >
              I am a very simple card.
              <h1>{this.props.bid.deadLine}</h1>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }



  
}


