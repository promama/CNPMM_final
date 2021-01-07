import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © to NP company, no comercial allowed "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
