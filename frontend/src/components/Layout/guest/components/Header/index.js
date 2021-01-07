import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from "material-ui-search-bar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import _, { size } from "lodash";
import MoreIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { connect,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LogoImg from "../../../../../assets/images/bookstor_compact.webp";
import { isLogin, removeSession } from "../../../../../utils/auth";
import "./Header.scss";
import { TextareaAutosize } from "@material-ui/core";
import booksApi from "../../../../../api/booksApi";
import { getBooks } from "../../../../../actions/books"

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        // marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    multilineColor: {
        color: 'white'
    }
}));

function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSearchChange=async (event)=>{
        const keyword={
            keyword:event.target.value
        }
        const response = await booksApi.search(keyword);
        const result ={
            docs:response,
            total:response.length,
            limit:response.length,
            page:1,
            pages:1
        }
        let action = await getBooks(result);
        dispatch(action)
        console.log(keyword.keyword.length)
        if(keyword.keyword.length==0)
        {
            let params = {
                page: 1,
                perPage: 8,
            };

            const response = await booksApi.get(params);
            let action = await getBooks(response);
            console.log(action)
            dispatch(action);
        }
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        console.log("logout");
        removeSession();
    };
    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {!isLogin() ? (
                <div>
                    <MenuItem>
                        <Link onClick={handleMenuClose} to="/user/login">
                            Đăng nhập
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link onClick={handleMenuClose} to="/user/register">
                            Đăng ký
                        </Link>
                    </MenuItem>
                </div>
            ) : (
                    <div>
                        <MenuItem>
                            <Link onClick={handleMenuClose} to="/buyer/">
                                Quản lý tài khoản
                        </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                onClick={() => {
                                    handleMenuClose();
                                    handleLogout();
                                }}
                                to="/shop"
                            >
                                Đăng xuất
                        </Link>
                        </MenuItem>
                    </div>
                )}
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    aria-label="show 11 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className="header">
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            <Link to="/" className="item">
                                <img src={LogoImg} width={100} alt="logo" />
                            </Link>
                        </Typography>
                        <div className="nav-list"></div>

                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                aria-label="show 4 new mails"
                                color="inherit"
                                borderRadius="0px"
                                style={{border:"none"}}
                            >
                                <Badge
                                >
                                    <SearchIcon />
                                    <TextField InputProps={{className: classes.multilineColor}} 
                                    onChange={handleSearchChange}
                                    />
                                </Badge>
                            </IconButton>
                            <Link to="/shop/cart" style={{ color: "#fff" }}>
                                <IconButton
                                    aria-label="show 4 new mails"
                                    color="inherit"
                                >
                                    <Badge
                                        badgeContent={
                                            _.isEmpty(props.cart)
                                                ? 0
                                                : props.cart.productList.length
                                        }
                                        color="secondary"
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Link>

                            <IconButton
                                edge={"end"}
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {isLogin() ? (
                                    <ContactMailIcon />
                                ) : (
                                        <AccountCircle />
                                    )}
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

export default connect(mapStateToProps, null)(PrimarySearchAppBar);
