import React from 'react';

import {permissionCheckerUtil} from 'common-ui/utils/permission_checker_util';

import {Column, Button} from '@carbon/react';
import {Add} from '@carbon/icons-react';

const CustomButton = ({permission, children, addCol=true, colProps={}, ...props}) => {
    if (permission === null || permissionCheckerUtil.checkHasUpdatePermission(permission)) {
        let button = (
            <Button data-testid="custom-button" {...props}>
                {children}
            </Button>
        );

        if (addCol) {
            return (
                <Column {...colProps}>
                    {button}
                </Column>
            )
        }

        return button;
    }
    return null;
}

const AddButton = ({...props}) => {
    return (
        <CustomButton
            renderIcon={Add}
            {...props}
        />
    )
}

export {
    CustomButton,
    AddButton
}