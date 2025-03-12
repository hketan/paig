import React from 'react';
import {observer} from 'mobx-react';

import {TextInput} from '@carbon/react';

import {getInputProps} from './form_fields_util';

const FormTextInput = observer(({fieldObj, required=false, label, value, onChange, invalid, invalidText, ...rest}) => {
    let inputProps = getInputProps({
        fieldObj,
        value,
        onChange,
        invalid,
        invalidText
    });

    let asterisk = required && (typeof label === 'string') ? '*' : '';

    return (
        <TextInput
            id={label}
            labelText={label + ' ' + asterisk}
            data-testid="input-field"
            {...inputProps}
            {...rest}
        />
    )
})

export {
    FormTextInput
}