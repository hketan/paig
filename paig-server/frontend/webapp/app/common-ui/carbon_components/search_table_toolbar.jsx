import React from 'react';
import { observer } from 'mobx-react';

import { TableToolbarSearch } from '@carbon/react';

import KeyEvent from 'common-ui/lib/react-structured-filter/keyevent';

const SearchTableToolbar = observer(({obj={}, field="", onEnter, onKeyUp, onChange, ...props}) => {
    const handleKeyUp = (e, ...args) => {
        let enterPress = false;
        switch ((e.keyCode || e.which)) {
            case KeyEvent.DOM_VK_RETURN:
            case KeyEvent.DOM_VK_ENTER:
                enterPress = true;
                break;
        }
        if (onEnter && enterPress) {
            onEnter(e, ...args);
        }
        onKeyUp && onKeyUp(e, ...args);
    }

    const handleOnChange = (e, ...args) => {
        if (obj && field) {
            obj[field] = e.target.value;
        }
        onChange && onChange(e, ...args);
    }

    return (
        <TableToolbarSearch
            persistent
            onKeyUp={handleKeyUp}
            onChange={handleOnChange}
            value={obj[field]}
            {...props}
        />
    )
})

export {
    SearchTableToolbar
}