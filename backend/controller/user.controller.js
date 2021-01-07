const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const graphUrl = "https://graph.facebook.com"
const version = "v4.0"
const facebook_secret = "e0e1c5672975422d1567e95e0bd62b0a"
const secret="ajhfiaasfjasasfgasghdcahsd1242141"
const Validator=require("validatorjs")
const CryptoJS=require("crypto-js")
var User = require("../models/user");
var bookModel = require("../models/book");
var ObjectId = require("mongodb").ObjectId;
const axios = require('axios').default;
const {OAuth2Client}=require("google-auth-library");
const client=new OAuth2Client("75435593592-ibbekma2opi25sc4bnfnrr276ki2ne01.apps.googleusercontent.com")

module.exports.callbackGoogle=async(req,res)=>{
    const {tokenId}=req.body;
    client.verifyIdToken({idToken: tokenId,audience:"75435593592-ibbekma2opi25sc4bnfnrr276ki2ne01.apps.googleusercontent.com"})
    .then(response=>{
        const {email_verified,name,email}=response.payload;
        console.log(email_verified)
        console.log(email)
        console.log(name);
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                console.log("user",user);
                if(err){
                    return res.status(400).json({
                        error:"====no"
                    })
                }else {
                    if(user){
                        const token=jwt.sign({_id:user._id},process.env.jwt,{expiresIn:"180000"})
                        const {_id,name,email,role}=user;
                        res.json({
                            token,
                            user:{_id,name,email,role} 
                        })
                    }else{
                        console.log("vo day")
                        const role=3;
                        let newUser=new User({name,email,role});
                        newUser.save((err,data)=>{
                            if(err){
                                return res.status(400).json({
                                    error:"====no"
                                })
                            }
                            const token=jwt.sign({_id:data._id},process.env.jwt,{expiresIn:"180000"})
                        const {_id,name,email,role}=newUser;
                        res.json({
                            token,
                            user:{_id,name,email,role} 
                            })
                        })
                    }
                }
            })
        }
    })
}

module.exports.callbackFacebook= async (req,res)=>{
    let rules = {
        accessToken:"required",
      };
    let validation = new Validator(req.body, rules);
    if(validation.fails()){
        return res.status(422).json({msg:validation.errors.all()})
    }
    let token = req.body.accessToken
    
    var fields = ["name", "email", "gender", "verified", "link"]
    let meURL = graphUrl + "/" + version + "/me?access_token=" + token + "&fields=" + fields.join(",")
    let appSecretProof = CryptoJS.HmacSHA256(token, facebook_secret).toString();
    meURL += "&appsecret_proof=" + appSecretProof;
    axios.get(meURL,{
        headers: {
            "Content-Type": "application/json"
        },
    });
    const id=req.body.id;
    const email=req.body.email;
    const userByidFB=await User.findOne({id});
    const userByemail =await User.findOne({email})
       
    if(userByidFB==null && userByemail==null)
    {
        var user=await User.create(req.body);
        console.log(user.id)
        const set_pass = await User.findOneAndUpdate({_id:user.id}, {password: '1', role: 3},{
            new: true,
        })
        
        let accessToken = jwt.sign({
            id:user._id,
            email:user.email
            },process.env.jwt, { expiresIn: '180000' });
        res.status(201).json({
            success: true,
            data: { accessToken, user: set_pass },
        });
    }
    else{
            console.log('vo else')
            const { email} = req.body;
            const userByEmail = await User.findOne({ email });
            
            const payload = {
                user: {
                    id: userByEmail.id,
                    email: userByEmail.email,
                    role: userByEmail.role,
                },
            };
            const accessToken = jwt.sign(payload, process.env.jwt, {
                expiresIn: "180000",
            });
            console.log("acc2",accessToken);
            res.status(201).json({
                success: true,
                data: { accessToken, user: userByEmail },
            });
        }
}

module.exports.postRegister = async (req, res) => {
    const { email, username } = req.body;
    const userByUsername = await User.find({ username });

    if (userByUsername.length) {
        return res.status(202).json({
            success: false,
            msg: "Tên tài khoản đã tồn tại",
        });
    }
    const userByMail = await User.find({ email });
    if (userByMail.length) {
        return res.status(202).json({
            success: false,
            msg: "Email đã tồn tại",
        });
    }

    var hash = bcryptjs.hashSync(req.body.password);
    req.body.password = hash;
    var user = await User.create(req.body);
    const cart = new Cart({
        userID: user._id,
    });
    await cart.save();
    res.status(201).json({ success: true, data: { user } });
};

module.exports.postLogin = async (req, res) => {
    const { username, password, role } = req.body;
    const userByUsername = await User.findOne({ username });

    if (userByUsername === null) {
        return res
            .status(202)
            .json({ success: false, msg: "Username không tồn tại" });
    } else {
        if (!bcryptjs.compareSync(password, userByUsername.password)) {
            return res
                .status(202)
                .json({ success: false, msg: "Mật khẩu không đúng" });
        }
        if (userByUsername.role !== role) {
            return res
                .status(202)
                .json({ success: false, msg: "Lỗi quyền truy cập" });
        }
        if (userByUsername.status === 0) {
            return res.status(202).json({
                success: false,
                msg: "Lỗi truy cập. Tài khoản đã bị khóa",
            });
        }
    }

    const payload = {
        user: {
            id: userByUsername.id,
            email: userByUsername.email,
            //username: userByUsername.username,
            role: userByUsername.role,
        },
    };
    const accessToken = jwt.sign(payload, process.env.jwt, {
        expiresIn: "180000",
    });
    console.log("acc3",accessToken);
    res.status(201).json({
        success: true,
        data: { accessToken, user: userByUsername },
    });
};

module.exports.update = async (req, res) => {
    let objUpdate = req.body;

    const result = await User.findOneAndUpdate(
        { _id: req.user.id },
        objUpdate,
        {
            new: true,
        }
    );

    res.status(201).json({ success: true, data: { user: result } });
};

module.exports.getBook = async (req, res) => {
    const { page, perPage, author, categoryId, sellerId } = req.query;
    console.log(req.user);
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
    };

    if (!categoryId && !sellerId && !author) {
        const books = await bookModel.paginate({}, options);
        return res.json(books);
    }

    const books = await bookModel.paginate(
        {
            $or: [
                { author: author },
                { category: ObjectId(categoryId) },
                { seller: ObjectId(sellerId) },
            ],
        },
        options
    );

    return res.json(books);
};

module.exports.getUserById = async (req, res) => {
    const email = req.body.email;
    console.log("email",email)
    const user = await User.findOne(email);
    console.log("user",user);
    return res.json(user);
};


