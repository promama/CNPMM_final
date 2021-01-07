import { Grid } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as Yup from "yup";
import InputField from "../../../../../../../../components/custom-field/InputField";
import "./index.scss";

class UpdateAccountForm extends Component {
    static propTypes = {
        prop: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.initialValues = {
            name: props.user.name || props.user.username,
            email: props.user.email,
            address: props.user.address,
            phone: props.user.phone,
        };
        this.validationSchema = Yup.object().shape({
            name: Yup.string().required("Vui lòng không để trống."),
            email: Yup.string()
                .email("Không đúng định dạng một email")
                .required("Vui lòng không để trống."),
            address: Yup.string().required("Vui lòng không để trống."),
            phone: Yup.number()
                .typeError("Không đúng định dạng số điện thoại")
                .required("Vui lòng không để trống."),
        });
    }

    render() {
        return (
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.props.handleSubmit}
            >
                {(formikProps) => {
                    return (
                        <Form className="form login-form">
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <FastField
                                        category="text_thin"
                                        name="name"
                                        component={InputField}
                                        label="Tên hiển thị"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FastField
                                        category="text_thin"
                                        name="email"
                                        component={InputField}
                                        label="Email"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FastField
                                        category="text_thin"
                                        name="phone"
                                        component={InputField}
                                        label="Số điện thoại"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FastField
                                        category="text_thin"
                                        name="address"
                                        component={InputField}
                                        label="Địa chỉ"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        className="submit"
                                    >
                                        Cập nhật
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ...state.user.login,
    };
};
export default connect(mapStateToProps)(UpdateAccountForm);
