import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import BookCard from "../../../../components/BookCard/BookCard.js";
import "./styles.scss";

function HomePage(props) {
    return (
        <Container className="container-fluid HomePage">
            <Row>
                <Col>
                    <BookCard />
                </Col>
                <Col>
                    <BookCard />
                </Col>
                <Col>
                    <BookCard />
                </Col>
                <Col>
                    <BookCard />
                </Col>
            </Row>
        </Container>
    );
}

HomePage.propTypes = {};

export default HomePage;
