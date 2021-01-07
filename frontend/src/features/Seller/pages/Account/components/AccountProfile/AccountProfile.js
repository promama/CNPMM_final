import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    LinearProgress,
    Modal,
    Typography,
    Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import StoreImg from "../../../../../../assets/images/store_img.png";
import DraggableUploader from "../../../../../../components/imageUploader/DraggableUploader";
import userApi from "../../../../../../api/userApi";
import { updateAvatar } from "../../../../../../actions/user";

const useStyles = makeStyles((theme) => ({
    root: {},
    details: {
        display: "flex",
    },
    avatar: {
        marginLeft: "auto",
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0,
    },
    progress: {
        marginTop: theme.spacing(2),
    },
    handleAvatarButton: {
        marginRight: theme.spacing(2),
        letterSpacing: "2px!important",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const AccountProfile = (props) => {
    const dispatch = useDispatch();
    const { className, user, actions, ...rest } = props;

    const [openModal, setOpenModal] = useState(false);
    const [openAlertRemove, setOpenAlertRemove] = useState(false);
    const [avatar, setAvatar] = useState(user.avatar || StoreImg);

    const classes = useStyles();

    const { username, address, name } = user;

    function receiveFile(files) {
        (async function () {
            let formData = new FormData();
            formData.append("avatar", files[0]);
            const response = await userApi.uploadAvatar(formData);
            if (response.success) {
                dispatch(updateAvatar(response.avatar));
                setAvatar(response.avatar);
                setOpenModal(false);
            }
        })();
    }

    function generateBodyModal() {
        const bodyModal = (
            <div style={{}} className="body">
                <Card className="">
                    <CardContent>
                        <DraggableUploader
                            files={receiveFile}
                            title="Chọn ảnh cửa hàng"
                        />
                    </CardContent>
                </Card>
            </div>
        );
        return bodyModal;
    }

    function handleRemove() {
        (async function () {
            const response = await userApi.removeAvatar();
            if (response.success) {
                setAvatar(StoreImg);
            }
        })();
    }
    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent>
                <div className={classes.details}>
                    <div>
                        <Typography gutterBottom variant="h2">
                            {name ? name : username}
                        </Typography>
                        <Typography
                            className={classes.locationText}
                            color="textSecondary"
                            variant="body1"
                        >
                            {address}
                        </Typography>
                    </div>
                    <Avatar className={classes.avatar} src={avatar} />
                </div>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    className={classes.handleAvatarButton}
                    color="primary"
                    variant="text"
                    onClick={() => setOpenModal(true)}
                >
                    Thay ảnh cửa hàng
                </Button>
                <Button variant="text" onClick={handleRemove}>
                    Xóa ảnh cửa hàng
                </Button>
            </CardActions>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                {generateBodyModal()}
            </Modal>
            <Snackbar
                open={openAlertRemove}
                autoHideDuration={6000}
                onClose={() => setOpenAlertRemove(false)}
            >
                <Alert
                    onClose={() => setOpenAlertRemove(false)}
                    severity="warning"
                >
                    Đã xóa ảnh hiện tại. Hệ thống sẽ sử dụng ảnh mặc định
                </Alert>
            </Snackbar>
        </Card>
    );
};

AccountProfile.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object,
};

export default AccountProfile;
