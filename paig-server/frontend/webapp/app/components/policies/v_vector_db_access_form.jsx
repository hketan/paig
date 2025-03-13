import React from 'react';
import { observer } from 'mobx-react';

import { Layer, Form, Stack, FormGroup } from '@carbon/react';

import {STATUS} from 'common-ui/utils/globals';
import {FormToggle} from 'common-ui/carbon_components/forms/FormToggle';
import {CustomButton} from 'common-ui/carbon_components/action_buttons';

const VVectorDBAccessForm = observer(({form, editMode, permission, onEditClick}) => {

    const {userEnforcement, groupEnforcement} = form.fields;

    return (
        <Layer>
            <Form aria-label="sample form">
                <Stack gap={7}>
                    <FormGroup legendText="">
                        <FormToggle
                            label="User/Group Access-Limited Retrieval"
                            labelA="Disabled"
                            labelB="Enabled"
                            toggled={userEnforcement.value === STATUS.enabled.value}
                            onToggle={val => {
                                if (val) {
                                    userEnforcement.value = STATUS.enabled.value
                                    groupEnforcement.value = STATUS.enabled.value
                                } else {
                                    userEnforcement.value = STATUS.disabled.value
                                    groupEnforcement.value = STATUS.disabled.value
                                }
                            }}
                            readOnly={!editMode}
                        />
                        <CustomButton
                            addCol={false}
                            kind="ghost"
                            className="pull-right"
                            permission={permission}
                            onClick={onEditClick}
                        >
                            Edit
                        </CustomButton>
                    </FormGroup>
                </Stack>
            </Form>
        </Layer>
    )
})

export default VVectorDBAccessForm;