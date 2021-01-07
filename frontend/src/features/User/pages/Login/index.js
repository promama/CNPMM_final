import { Avatar, Container, Typography, Snackbar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/Keyboard";
import React from "react";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { loginUser } from "../../../../actions/user";
import userApi from "../../../../api/userApi";
import LoginForm from "../../components/LoginForm";
import { setSession } from "../../../../utils/auth";
import FacebookLogin from "../FacebookLogin";
import GoogleLogin from "../GoogleLogin";
import "./styles.scss";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAlert: false,
            contentAlert: "",
            typeAlert: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        (async () => {
            try {
                const response = await userApi.login(values);
                let action = await loginUser(response);
                let resDispatch = this.props.dispatch(action);

                if (resDispatch.payload.success) {
                    setSession(
                        response.data.user.username,
                        response.data.accessToken,
                        response.data.user.role,
                        response.data.user.email,
                        response.data.user._id
                    );

                    if (response.data.user.role === 1) {
                        this.props.history.push("/shop");
                    }
                    if (response.data.user.role === 2) {
                        this.props.history.push("/seller/account");
                    }
                    if (response.data.user.role === 3) {
                        this.props.history.push("/admin");
                    }
                } else {
                    this.setState({
                        contentAlert: response.msg,
                        openAlert: true,
                        typeAlert: "error",
                    });
                }
            } catch (error) {
                console.log(`failed post register as ${error}`);
            }
        })();
    }
    render() {
        const { isloginFail } = this.state;
        return (
            <Container component="main" maxWidth="xs" className="login">
                <div className="paper">
                    <Avatar className="avatar">
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Loging in
                    </Typography>
                    <LoginForm handleSubmit={this.handleSubmit} />
                </div>
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
                        severity={this.state.typeAlert}
                    >
                        {this.state.contentAlert}
                    </Alert>
                </Snackbar>
                <div className="centerStyle">
                    <FacebookLogin/>
                    <GoogleLogin/>
                </div> 
            </Container>
        );
    }
}

LoginPage.propTypes = {};

export default connect(null, null)(LoginPage);
