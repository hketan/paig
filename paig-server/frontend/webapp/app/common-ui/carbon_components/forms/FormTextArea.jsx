import React from 'react';
import {observer} from 'mobx-react';

import {TextArea} from '@carbon/react';

import {getInputProps} from './form_fields_util';

const FormTextArea = observer(({fieldObj, label, value, onChange, invalid, invalidText, ...rest}) => {
    let inputProps = getInputProps({
        fieldObj,
        value,
        onChange,
        invalid,
        invalidText
    });

    return (
        <TextArea
            id={label}
            labelText={label}
            data-testid="input-field"
            {...inputProps}
            {...rest}
        />
    )
})

export {
    FormTextArea
}