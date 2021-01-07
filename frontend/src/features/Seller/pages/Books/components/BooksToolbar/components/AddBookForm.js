import { Grid } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import { Snackbar, Button } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import Alert from "@material-ui/lab/Alert";
import InputField from "../../../../../../../components/custom-field/InputField";
import SelectField from "../../../../../../../components/custom-field/SelectField";
import DraggableUploader from "../../../../../../../components/imageUploader/DraggableUploader";

import userApi from "../../../../../../../api/userApi";
import { getBooksSeller } from "../../../../../../../actions/user";

class AddBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAlert: false,
            content: "Loading ...",
            type: "info",
            filesImg: [],
            filesPrev: [],
        };
        this.initialValues = {
            name: "",
            author: "",
            category: "",
            price: "",
            description: "",
            quantity: 1,
        };
        this.validationSchema = Yup.object().shape({
            name: Yup.string().required("Vui lòng không để trống."),
            author: Yup.string().required("Vui lòng không để trống."),
            price: Yup.number().required("Vui lòng không để trống"),
            quantity: Yup.number().required("Vui lòng không để trống"),
        });

        this.handleSubmit = this.handleSubmit.bind(this);
        this.receiveFileImg = this.receiveFileImg.bind(this);
        this.receiveFilePrev = this.receiveFilePrev.bind(this);
    }

    componentDidMount() {}

    handleSubmit(values) {
        let filesImg = this.state.filesImg;
        let filesPrev = this.state.filesPrev;
        this.setState({ openAlert: true });

        let formData = new FormData();
        formData.set("title", values.name);
        formData.set("author", values.author);
        formData.set("price", values.price);
        formData.set("description", values.description);
        formData.set("category", values.category);
        formData.set("quantity", values.quantity);
        for (let fileImg of filesImg) {
            formData.append("images", fileImg);
        }
        for (let filePrev of filesPrev) {
            formData.append("previewImgs", filePrev);
        }

        (async () => {
            try {
                const response = await userApi.upload(formData);
                if (response.success) {
                    this.setState({
                        openAlert: true,
                        content:
                            "Upload thành công. Click bên ngoài khung để xem kết quả.",
                        type: "success",
                    });
                    let res = this.props.dispatch(
                        getBooksSeller(response.books)
                    );
                    console.log(res);
                }
            } catch (error) {
                console.log(`failed post register as ${error}`);
            }
        })();
    }

    receiveFileImg(files) {
        this.setState({
            filesImg: [...files],
        });
    }
    receiveFilePrev(files) {
        this.setState({
            filesPrev: [...files],
        });
    }

    render() {
        let { categories } = this.props;
        let categoriesRender = [];
        categories.forEach((category) => {
            categoriesRender.push({ value: category._id, name: category.name });
        });

        return (
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleSubmit}
            >
                {(formikProps) => {
                    return (
                        <Form>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <FastField
                                        category="text_thin"
                                        name="name"
                                        component={InputField}
                                        label="Tên sách *"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FastField
                                        category="text_thin"
                                        name="author"
                                        component={InputField}
                                        label="Tác giả *"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <Grid item md={12} xs={12}>
                                        <FastField
                                            category="text_thin"
                                            name="quantity"
                                            component={InputField}
                                            label="Số lượng bán *"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <FastField
                                            category="text_thin"
                                            name="price"
                                            component={InputField}
                                            label="Giá bán *"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <FastField
                                            category="category_book"
                                            name="category"
                                            component={SelectField}
                                            label="Loại sách"
                                            options={categoriesRender}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item md={6} style={{ marginTop: "8px" }}>
                                    {/* <Grid item md={12} xs={12}> */}
                                    <FastField
                                        category="multiple"
                                        name="description"
                                        component={InputField}
                                        label="Mô tả *"
                                        row={6}
                                    />
                                    {/* </Grid> */}
                                </Grid>
                                <Grid item md={12}>
                                    <Grid
                                        item
                                        md={12}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <DraggableUploader
                                            files={this.receiveFileImg}
                                            title="Chọn ảnh bìa"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <DraggableUploader
                                        files={this.receiveFilePrev}
                                        title="Chọn ảnh chụp sách"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={12}
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        color="primary"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Đăng bán
                                    </Button>
                                </Grid>
                                <Snackbar
                                    open={this.state.openAlert}
                                    autoHideDuration={6000}
                                    onClose={() => {
                                        this.setState({ openAlert: false });
                                    }}
                                >
                                    <Alert
                                        onClose={() => {
                                            this.setState({ openAlert: false });
                                        }}
                                        severity={this.state.type}
                                    >
                                        {this.state.content}
                                    </Alert>
                                </Snackbar>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.books.categories,
});

export default connect(mapStateToProps, null)(AddBookForm);
