import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import "./SelectField.scss";

export default class SelectField extends Component {
    static propTypes = {
        field: PropTypes.object.isRequired,
        form: PropTypes.object.isRequired,

        category: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        options: PropTypes.array,
    };

    static defaultProps = {
        category: "sign",
        label: "",
        placeholder: "",
        disabled: false,
        options: [], // [{value, name}]
    };

    render() {
        const { field, form, category, label, options } = this.props;
        const { name } = field;
        const { errors, touched } = form;
        const showError = errors[name] && touched[name];
        return (
            <div>
                {category === "sign" && (
                    <FormControl className="select-field" error={showError}>
                        {label && (
                            <InputLabel id="demo-simple-select-label">
                                {label}
                            </InputLabel>
                        )}
                        <Select
                            labelId="demo-simple-select-label"
                            id={name}
                            {...field}
                        >
                            {options.map((item, i) => (
                                <MenuItem key={i} value={item.value}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors[name]}</FormHelperText>
                    </FormControl>
                )}
                {category === "category_book" && (
                    <FormControl
                        className="select-field"
                        style={{ width: "100%" }}
                        error={showError}
                    >
                        {label && (
                            <InputLabel id="demo-simple-select-label">
                                {label}
                            </InputLabel>
                        )}
                        <Select
                            labelId="demo-simple-select-label"
                            id={name}
                            {...field}
                        >
                            {options.map((item, i) => (
                                <MenuItem key={i} value={item.value}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors[name]}</FormHelperText>
                    </FormControl>
                )}
            </div>
        );
    }
}
