import React from 'react';
import {observer} from 'mobx-react';

import {Select, SelectItem} from '@carbon/react';

import {getInputProps} from './form_fields_util';

const FormSelect = observer(({fieldObj, data=[], label, value, onChange, invalid, invalidText,
    labelKey='text', valueKey='value', ...rest
}) => {
    let inputProps = getInputProps({
        fieldObj,
        value,
        onChange,
        invalid,
        invalidText
    });

    return (
        <Select
            id={label}
            labelText={label}
            data-testid="select-field"
            {...inputProps}
            {...rest}
        >
            {
                data && data.length > 0
                ?
                    data.map((item, index) => (
                        <SelectItem
                            key={item.text || index}
                            value={item[valueKey]}
                            text={item[labelKey]}
                        />
                    ))
                :
                    <SelectItem
                        disabled
                        text="No options"
                    />
            }
        </Select>
    )
})

export {
    FormSelect
}