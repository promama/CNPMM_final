import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class InputField extends Component {
    static propTypes = {
        field: PropTypes.object.isRequired,
        form: PropTypes.object.isRequired,

        type: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        disable: PropTypes.bool,
        category: PropTypes.string,
        row: PropTypes.number,
    };

    static defaultProps = {
        category: "text_sign",
        type: "text",
        label: "",
        placeholder: "",
        disable: false,
    };

    render() {
        const { field, form, type, label, disable, category, row } = this.props;
        const { name } = field;
        const { errors, touched } = form;
        const showError = errors[name] && touched[name];
        return (
            <div>
                {category === "text_sign" && (
                    <TextField
                        variant="outlined"
                        margin="normal"
                        type={type}
                        fullWidth
                        id={name}
                        label={label}
                        disabled={disable}
                        {...field}
                        error={showError}
                        helperText={showError ? errors[name] : ""}
                    />
                )}
                {category === "text_thin" && (
                    <TextField
                        id={name}
                        type={type}
                        fullWidth
                        label={label}
                        margin="dense"
                        disabled={disable}
                        variant="outlined"
                        {...field}
                        error={showError}
                        helperText={showError ? errors[name] : ""}
                    />
                )}
                {category === "multiple" && (
                    <TextField
                        label={label}
                        multiline
                        rows={row}
                        fullWidth
                        id={name}
                        variant="outlined"
                        {...field}
                        error={showError}
                        helperText={showError ? errors[name] : ""}
                    />
                )}
            </div>
        );
    }
}
