import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';

import {HeaderPanel, Tile, Button, FormGroup, ButtonSet} from '@carbon/react';

import f from 'common-ui/utils/f';
import {createFSForm} from 'common-ui/lib/form/fs_form';
import VVectorDBAccessForm from 'components/policies/v_vector_db_access_form';
import {vector_db_form_def} from 'components/applications/vector_db/v_vector_db_form';

@inject('vectorDBStore')
@observer
class CVectorDBAccessForm extends Component {
    @observable _vState = {
        editMode: false,
        saving: false
    }
    constructor(props) {
        super(props);

        this.form = createFSForm(vector_db_form_def);
        this.displayForm = createFSForm(vector_db_form_def);

        if (props.vectorDBModel) {
            this.form.refresh(props.vectorDBModel);
            this.displayForm.refresh(props.vectorDBModel);
        }
    }
    handleEdit = () => {
        this._vState.editMode = true;
    }
    handleCancelEdit = () => {
        this._vState.editMode = false;
    }
    handleUpdate = async () => {
        const { vectorDBModel, postPermissionUpdate } = this.props;

        let data = Object.assign({}, vectorDBModel, this.form.toJSON());

        this._vState.saving = true;
        this.props.vectorDBStore.updateVectorDB(data)
            .then((response) => {
                //f.notifySuccess('Permission updated successfully.');
                this._vState.editMode = false;
                this._vState.saving = false;
                postPermissionUpdate(response);
                this.displayForm.refresh(response);
            }, (e) => {
                this._vState.saving = false;
                f.handleError()(e);
            });
    }

    render() {
        const { permission, vectorDBModel } = this.props;

        return (
            <>
                <VVectorDBAccessForm
                    editMode={false}
                    form={this.displayForm}
                    permission={permission}
                    onEditClick={this.handleEdit}
                />
                <HeaderPanel expanded={this._vState.editMode} style={{width: this._vState.editMode ? '450px' : ''}}>
                <Tile className='sidebar-form'>
                        <div className="header-panel-title">
                            <h4>Edit Access Control</h4>
                        </div>
                        <div className="header-panel-content">
                        <div className="header-panel-description">
                            Manage data retrieval permissions based on user and group access levels.
                        </div>
                        <FormGroup legendText="">
                            <VVectorDBAccessForm
                                editMode={true}
                                form={this.form}
                                permission={permission}
                            />
                        </FormGroup>
                        </div>
                        <div className="header-panel-footer">
                            <Button
                                data-testid="edit-save-btn"
                                data-track-id="access-form-edit-save-btn"
                                disabled={this._vState.saving}
                                onClick={this.handleUpdate}
                            >
                                Save
                            </Button>
                            <Button
                                kind="secondary"
                                data-testid="edit-cancel-btn"
                                data-track-id="access-form-edit-cancel-btn"
                                onClick={this.handleCancelEdit}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Tile>
                </HeaderPanel>
            </>
        )

        return (
            <Grid container spacing={3} style={{padding: '5px 15px'}} data-testid="access-card"
                data-track-id="vector-db-access-limited"
            >
                {
                    this._vState.editMode &&
                    <div>
                        <Button
                            data-testid="edit-save-btn"
                            variant="contained"
                            color="primary"
                            className="m-r-sm"
                            size="small"
                            disabled={this._vState.saving}
                            onClick={this.handleUpdate}
                        >
                            {
                                this._vState.saving &&
                                <CircularProgress size="15px" className="m-r-xs" />
                            }
                            SAVE
                        </Button>
                        <Button
                            data-testid="edit-cancel-btn"
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={this.handleCancelEdit}
                        >CANCEL</Button>
                    </div>
                }
                <VVectorDBAccessForm
                    ref={ref => this.policyFormRef = ref}
                    editMode={this._vState.editMode}
                    form={this.form}
                />
            </Grid>
        );
    }
}

export default CVectorDBAccessForm;