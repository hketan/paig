import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';

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

        if (props.vectorDBModel) {
            this.form.refresh(props.vectorDBModel);
        }
    }
    handleEdit = () => {
        //this._vState.editMode = true;
    }
    handleUpdate = async () => {
        const { vectorDBModel, postPermissionUpdate } = this.props;

        let data = Object.assign({}, vectorDBModel, this.form.toJSON());

        this._vState.saving = true;
        this.props.vectorDBStore.updateVectorDB(data)
            .then((response) => {
                f.notifySuccess('Permission updated successfully.');
                this._vState.editMode = false;
                this._vState.saving = false;
                postPermissionUpdate(response);
                this.form.refresh(response);
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
                    ref={ref => this.policyFormRef = ref}
                    editMode={this._vState.editMode}
                    form={this.form}
                    permission={permission}
                    onEditClick={this.handleEdit}
                />
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