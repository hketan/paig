import React, {Fragment} from 'react';
import { observer } from 'mobx-react';

import {Tile, Form, Stack, FormGroup, Button, Layer} from '@carbon/react';

import {Utils} from 'common-ui/utils/utils';
import {STATUS} from 'common-ui/utils/globals';
import {VECTOR_DB_TYPES} from 'utils/globals';

import {FormTextInput} from 'common-ui/carbon_components/forms/FormTextInput';
import {FormTextArea} from 'common-ui/carbon_components/forms/FormTextArea';
import {FormToggle} from 'common-ui/carbon_components/forms/FormToggle';
import {FormSelect} from 'common-ui/carbon_components/forms/FormSelect';

const VVectorDBForm = observer(({form, _vState, handleCreate, handleUpdate, handleCancel}) => {
    const { id, name, description, status, type } = form.fields;

    let saveButton = 'Create';
    const saveButtonProps = {}
    const cancelButtonProps = {
        onClick: handleCancel,
        'data-testid': 'cancel-btn'
    }

    if (id.value) {
        saveButton = 'Update';
        Object.assign(saveButtonProps, {
            onClick: handleUpdate,
            'data-testid': 'edit-save-btn',
            'data-track-id': 'update-vector-db-save-btn'
        });
        Object.assign(cancelButtonProps, {
            'data-track-id': 'edit-vector-db-cancel-btn'
        });
    } else {
        Object.assign(saveButtonProps, {
            onClick: handleCreate,
            'data-testid': 'create-app-btn',
            'data-track-id': 'create-vector-db-save-btn'
        });
        Object.assign(cancelButtonProps, {
            'data-track-id': 'create-vector-db-cancel-btn'
        });
    }

    const Wrapper = _vState.editMode ? Tile : Fragment;

    return (
        <Wrapper>
            <h4 className='m-b-md' data-testid="info">Information</h4>
            <Layer>
                <Form aria-label="sample form">
                    <Stack gap={7}>
                        <FormSelect
                            label="Type"
                            data={Object.values(VECTOR_DB_TYPES)}
                            fieldObj={type}
                            labelKey="LABEL"
                            valueKey="TYPE"
                            placeholder="Select Type"
                            readOnly={!_vState.editMode}
                            data-testid="type"
                        />
                        <FormTextInput
                            required={true}
                            fieldObj={name}
                            label="Name"
                            placeholder="Enter name"
                            readOnly={!!id.value || !_vState.editMode}
                            data-testid="name"
                        />
                        <FormTextArea
                            fieldObj={description}
                            label="Description"
                            placeholder={_vState.editMode ? 'Enter a description' : 'No description added'}
                            data-testid="desc"
                            readOnly={!_vState.editMode}
                            rows={2}
                        />
                        <FormToggle
                            label="Enabled"
                            labelA=""
                            labelB=""
                            fieldObj={status}
                            readOnly={!_vState.editMode}
                            data-testid="status"
                        />

                        {
                            _vState.editMode &&
                            <FormGroup legendText="">
                                <Button
                                    className="m-r-md"
                                    disabled={_vState.saving}
                                    {...saveButtonProps}
                                >
                                  {saveButton}
                                </Button>
                                <Button
                                    kind="secondary"
                                    onClick={handleCancel}
                                    data-testid="cancel-btn"
                                    data-track-id="create-vector-db-cancel-btn"
                                >
                                  Cancel
                                </Button>
                            </FormGroup>
                        }
                    </Stack>
                </Form>
            </Layer>
        </Wrapper>
    );
})

const vector_db_form_def = {
    id: {},
    name: {
        defaultValue: "",
        validators: {
            errorMessage: 'Required!',
            fn: (field) => {
                let length = (field.value || '').trim().length
                if (length > 0) {
                    if (length > 64) {
                        field._originalErrorMessage = 'Max 64 characters allowed!';
                        return false;
                    }

                    return Utils.characterValidation(field);
                }
                field._originalErrorMessage = 'Required!';
                return false;
            }
        }
    },
    description: {
        defaultValue: "",
        validators: {
            errorMessage: '',
            fn: (field) => {
                let length = (field.value || '').trim().length
                if (length > 5000) {
                    field._originalErrorMessage = 'Max 5000 characters allowed!';
                    return false;
                }
                field._originalErrorMessage = '';
                return true;
            }
        }
    },
    type: {
        defaultValue: VECTOR_DB_TYPES.MILVUS.TYPE
    },
    userEnforcement: {
        defaultValue: STATUS.disabled.value
    },
    groupEnforcement: {
        defaultValue: STATUS.disabled.value
    },
    status: {
        defaultValue: STATUS.enabled.value
    }
}

export {
    vector_db_form_def
}
export default VVectorDBForm;