import React from 'react';
import {observer} from 'mobx-react';

import {Toggle} from '@carbon/react';

import {getToggleProps} from './form_fields_util';

const FormToggle = observer(({fieldObj, label, toggled, onToggle, ...rest}) => {
    let inputProps = getToggleProps({
        fieldObj,
        toggled,
        onToggle
    });

    return (
        <Toggle
            id={label}
            labelText={label}
            data-testid="toggle-switch"
            {...inputProps}
            {...rest}
        />
    )
})

export {
    FormToggle
}