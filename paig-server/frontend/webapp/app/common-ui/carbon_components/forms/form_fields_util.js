const getInputProps = ({fieldObj, value, onChange, invalid, invalidText}) => {
    let inputProps = {
        value,
        onChange,
        invalid,
        invalidText
    };

    if (fieldObj) {
        inputProps.value = value || fieldObj.value;
        inputProps.onChange = onChange || ((e) => fieldObj.value = e.target.value);
        inputProps.invalid = invalid != null ? rest.invalid : !!fieldObj.errorMessage;
        inputProps.invalidText = invalidText || fieldObj.errorMessage;
    }

    return inputProps;
}

const getToggleValue = (fieldObj, status) => {
    let valuesList=[['false', 'true'], ['0', '1'], [false, true], [0, 1], ['enable', 'disable'], ['enabled', 'disabled']]

    let values = valuesList.find(val => val.includes(fieldObj.value));
    if (values) {
        status = values[+status];
    }
    return status;
}

const getToggleProps = ({fieldObj, toggled, onToggle, invalid, invalidText}) => {
    let toggleProps={
        toggled,
        onToggle
    }

    if (fieldObj) {
        toggleProps.toggled = toggled != null ? toggled : ['true', '1', 'enable', 'enabled'].includes('' + fieldObj.value);
        toggleProps.onToggle = onToggle || ((status) => fieldObj.value = getToggleValue(fieldObj, status));
    }

    return toggleProps;
}

export {
    getInputProps,
    getToggleProps
}