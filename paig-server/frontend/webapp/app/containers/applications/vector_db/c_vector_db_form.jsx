import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';

import VVectorDBForm, {vector_db_form_def} from 'components/applications/vector_db/v_vector_db_form';
import f from 'common-ui/utils/f';
import {createFSForm} from 'common-ui/lib/form/fs_form';
import {SkeletonTextLoader} from 'common-ui/carbon_components/loader';

@inject('vectorDBStore')
@observer
class CVectorDBForm extends Component {
    @observable _vState = {
        editMode: true,
        saving: false,
        model: null,
        loading: true
    }
    constructor(props) {
        super(props);

        this.form = createFSForm(vector_db_form_def);
        if (props.editMode != null) {
            this._vState.editMode = props.editMode;
        }
    }
    componentDidMount() {
        const {model} = this.props;
        if (model) {
            this._vState.model = model;
            this.form.refresh(model);
            this._vState.loading = false;
        } else if (this.props.match?.params?.id) {
            this.getVectorDBDetails(this.props.match.params.id);
        } else {
            this._vState.model = null;
            this._vState.loading = false;
        }
    }
    getVectorDBDetails = (id) => {
        this._vState.loading = true;
        this.props.vectorDBStore.getVectorDBById(id)
            .then((response) => {
                this._vState.model = response;
                this._vState.loading = false;

                this.form.refresh(response);
            }, f.handleError(null, () => {
                this._vState.loading = false;
                this._vState.model = null;
            }));
    }

    handleCreate = async () => {
        await this.form.validate();
        if (!this.form.valid) {
            return;
        }
        let data = this.form.toJSON();
        delete data.id;

        try {
            this._vState.saving = true;

            let response = await this.props.vectorDBStore.createVectorDB(data);
            //f.notifySuccess("The Vector DB created successfully");
            //this.props.handlePostCreate?.(response);
            this.props.history.push(`/vector_db`);
        } catch(e) {
            this._vState.saving = false;
            f.handleError()(e);
        }
    }
    handleUpdate = async () => {
        await this.form.validate();
        if (!this.form.valid) {
            return;
        }
        let data = this.form.toJSON();
        let {model} = this.props;
        data = Object.assign({}, model, data);

        try {
            this._vState.saving = true;
            await this.props.vectorDBStore.updateVectorDB(data)
            //f.notifySuccess("The Vector DB updated successfully");
            //this.props.handlePostUpdate?.(data.id);
        } catch(e) {
            this._vState.saving = false;
            f.handleError()(e);
        }
    }
    handleCancel = () => {
        this.props.history.goBack();
    }

    render() {
        const {handleCreate, handleUpdate, handleCancel} = this;

        return (
            <SkeletonTextLoader
                isLoading={this._vState.loading}
                lineCount={6}
            >
                {
                    () => {
                        if (!this.props.match?.params?.id || this._vState.model) {
                            return (
                                <VVectorDBForm
                                    form={this.form}
                                    _vState={this._vState}
                                    handleCreate={handleCreate}
                                    handleUpdate={handleUpdate}
                                    handleCancel={handleCancel}
                                />
                            )
                        }

                        return (
                            <div>
                                <h4>Vector DB not found</h4>
                            </div>
                        )
                    }
                }
            </SkeletonTextLoader>
        );
    }
}

export default CVectorDBForm;