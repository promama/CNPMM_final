import React ,{Component} from 'react';
import FacebookLoginBtn from 'react-facebook-login';
import { withRouter } from "react-router-dom";
import userApi from "../../../api/userApi";
import './FacebookAndGoogle.css'

class FacebookLogin extends Component{
    constructor(props){
        super(props);
        //const match = useRouteMatch();
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

    responseFacebook= async (respone)=>{
        const values = {
            accessToken: respone.accessToken, 
            name: respone.name, 
            id: respone.id, 
            email: respone.email
        }

        const res= await userApi.loginFacebook(values);
        localStorage.setItem(this.ACCESS_TOKEN, res.data.accessToken);
        localStorage.setItem(this.ROLE, res.data.user.role);
        localStorage.setItem(this.EMAIL, res.data.user.email);
        localStorage.setItem(this.USER_ID, res.data.user._id);
        if(res.data.user.role=== 3) {
             this.props.history.push("/admin")
        }

    }

    render(){
        let FacebookData;
        this.state.auth ?
            FacebookData = (
                <div>
                    Hi!
                </div>
            ) : FacebookData = (
                    <FacebookLoginBtn
                        appId="2214828185317281"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                        cssClass="btnFacebook"
                        icon="fa-facebook"
                    />
            );

        return (
            <div>
                {FacebookData}
            </div>
        );
    }
}
export default withRouter(FacebookLogin);