import React ,{Component} from 'react';
import GoogleLoginBtn from 'react-google-login';
import { withRouter } from "react-router-dom";
import userApi from "../../../api/userApi";
import './FacebookAndGoogle.css'

class GoogleLogin extends Component{
    constructor(props){
        super(props);
        this.state={
            auth:false,
            name:'',
            email:'',
            picture:''
        }
    }

    ACCESS_TOKEN="accessToken";
    REFRESH_TOKEN="refeshToken";
    USER_ID="userId";
    NAME="name";
    ROLE="role";
    EMAIL="email";

    responseSuccessGoogle= async (respone)=>{
        console.log("tokenId",respone.tokenId);
        const values = {
            tokenId: respone.tokenId, 
            // name: respone.name, 
            // id: respone.id, 
            // email: respone.email
        }

        const res= await userApi.loginGoogle(values);
        console.log(res);
        localStorage.setItem(this.ACCESS_TOKEN, res.token);
        localStorage.setItem(this.ROLE, res.user.role);
        localStorage.setItem(this.EMAIL, res.user.email);
        localStorage.setItem(this.USER_ID, res.user._id);
        if(res.user.role=== 3) {
             this.props.history.push("/admin")
        }

    }
    responseFailGoogle = async (respone) =>{
        console.log("err");
    }
    render(){
        let GoogleData;
        this.state.auth ?
            GoogleData = (
                <div>
                    Hi!
                </div>
            ) : GoogleData = (
                    <GoogleLoginBtn
                        clientId="75435593592-ibbekma2opi25sc4bnfnrr276ki2ne01.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this.responseSuccessGoogle}
                        onFailure={this.responseFailGoogle}
                        cookiePolicy={'single_host_origin'}
                        className='btnGoogle'
                        style={{textAlign:'center'}}
                    />
            );

        return (
            <div>
                {GoogleData}
            </div>
        );
    }
}
export default withRouter(GoogleLogin);