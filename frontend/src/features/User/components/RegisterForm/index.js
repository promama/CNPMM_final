import { Button, Grid } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import * as Yup from "yup";
import InputField from "../../../../components/custom-field/InputField";
import SelectField from "../../../../components/custom-field/SelectField";
import { TYPE_SIGN } from "../../../../constants/options";
import "./RegisterForm.scss";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.initialValues = {
            username: "",
            password: "",
            email: "",
            address: "",
            phone: "",
            role: 3,
        };
        this.validationSchema = Yup.object().shape({
            username: Yup.string().required("Please enter your username"),
            password: Yup.string().required("Please enter your password"),
            email: Yup.string()
                .email("Please enter an email format")
                .required("Please enter"),
            address: Yup.string().required("Please enter your address"),
            phone: Yup.number().required("Please enter phone numbers"),
            role: Yup.number().required("Please choose your role"),
        });
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={handleSubmit}
            >
                {(formikProps) => {
                    // do something
                    return (
                        <Form className="form register-form">
                            <Container>
                                <Row>
                                    <Col xs={6}>
                                        <FastField
                                            category="text_sign"
                                            name="username"
                                            component={InputField}
                                            label="Enter your Username"
                                            type="text"
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <FastField
                                            category="text_sign"
                                            name="password"
                                            component={InputField}
                                            label="Enter your Password"
                                            type="password"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FastField
                                            category="text_sign"
                                            name="email"
                                            component={InputField}
                                            label="Enter your Email address"
                                            type="email"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FastField
                                            category="text_sign"
                                            name="address"
                                            component={InputField}
                                            label="Enter your location"
                                            type="text"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FastField
                                            category="text_sign"
                                            name="phone"
                                            component={InputField}
                                            label="Enter your telephone numbers"
                                            type="number"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6}>
                                        <FastField
                                            name="role"
                                            component={SelectField}
                                            label="Role"
                                            category="sign"
                                            options={TYPE_SIGN}
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className="submit"
                                        >
                                            Sign-in
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6}>
                                        {this.props.success === false && (
                                            <Grid item className="err-wrapper">
                                                <ErrorIcon />{" "}
                                                <span className="err-msg">
                                                    {this.props.msg}
                                                </span>
                                            </Grid>
                                        )}
                                    </Col>
                                    <Col xs={6} className="forgot">
                                        <Link
                                            to="/user/login"
                                            variant="body2"
                                            title="Login"
                                        >
                                            <LockOpenIcon />
                                        </Link>
                                    </Col>
                                </Row>
                            </Container>

                            <Grid
                                container
                                justify={
                                    this.props.success === false
                                        ? "space-between"
                                        : "flex-end"
                                }
                            >
                                <Grid item></Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        );
    }
}

RegisterForm.propTypes = {
    handleSubmit: PropTypes.func,
};
const mapStateToProps = (state) => {
    return {
        ...state.user.register,
    };
};
export default connect(mapStateToProps)(RegisterForm);
