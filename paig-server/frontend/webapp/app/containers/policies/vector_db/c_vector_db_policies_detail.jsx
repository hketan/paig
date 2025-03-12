import React, {Component, Fragment} from 'react';
import { observer, inject } from 'mobx-react';
import {observable} from 'mobx';
import { withRouter } from 'react-router';
import { cloneDeep } from 'lodash';

import {FlexGrid, Row, Column, TableCell} from '@carbon/react';
import {UserMultiple, Filter, Rag, CheckmarkFilled, Misuse} from '@carbon/icons-react';

import f from 'common-ui/utils/f';
import { permissionCheckerUtil } from 'common-ui/utils/permission_checker_util';
import { STATUS } from 'common-ui/utils/globals';
import {FEATURE_PERMISSIONS} from 'utils/globals';
import VectorDBPolicyFormUtil from 'containers/policies/vector_db/vector_db_policy_form_util';
import Table from 'common-ui/carbon_components/table';

@inject('vectorDBPolicyStore', 'aiApplicationStore')
@observer
class CVectorDBPoliciesDetail extends Component {
  cContentRestrictionData = f.initCollection();
  cAIApplications = f.initCollection();
  @observable _vState = {
    accessPolicy: {}
  }
  constructor(props) {
    super(props);
    this.permission = permissionCheckerUtil.getPermissions(FEATURE_PERMISSIONS.GOVERNANCE.AI_POLICIES.PROPERTY);
    this.vectorDBPolicyFormUtil = new VectorDBPolicyFormUtil();

    this.cContentRestrictionData.params = {
      size: 1,
      status: 1
    }

    this.cAIApplications.params = {
      vectorDB: props.vectorDBModel.name,
      exactMatch: true,
      page: 0,
      size: 10
    }
  }

  componentDidMount() {
    // this.fetchAccessPolicy();
    this.fetchContentRestrictionData();
    this.getAIApplications();
  }

  fetchAccessPolicy = async() => {
    try {
      let response = await this.props.vectorDBPolicyStore.getGlobalPermissionPolicy(this.props.vectorDBModel.id);
      this._vState.accessPolicy = response;
    } catch(e) {
      console.error('Failed to get policy count', e)
    }
  }

  fetchContentRestrictionData = () => {
    f.beforeCollectionFetch(this.cContentRestrictionData);
    this.props.vectorDBPolicyStore.getAllPolicies(this.props.vectorDBModel.id, {
      params: this.cContentRestrictionData.params
    })
    .then(
      f.handleSuccess(this.cContentRestrictionData),
      f.handleError(this.cContentRestrictionData)
    );
  };

  getAIApplications = () => {
    f.beforeCollectionFetch(this.cAIApplications)
    this.props.aiApplicationStore.getAIApplications({
      params: this.cAIApplications.params
    }).then(f.handleSuccess(this.cAIApplications), f.handleError(this.cAIApplications));
  }

  handleApplicationRedirect = (applicationId) => {
    this.props.history.push(`/ai_application/${applicationId}`); // Redirect to the specified application ID
  };

  reAssignOthersOptionToGroups = () => {
    const data = cloneDeep(this.aiPolicyFormUtil.getFormData());
    
    if (data.others?.length) {
      data.groups = ["public"];
    }
    delete data.others;

    return data;
  }

  handlePageChange = () => {
    this.getAIApplications();
  };

  render () {
    const {cContentRestrictionData, cAIApplications, permission, handleApplicationRedirect, handlePageChange} = this;
    const { handleTabSelect } = this.props;

    return (
        <Permissions
            vectorDBModel={this.props.vectorDBModel}
            accessPolicy={this._vState.accessPolicy}
            contentRestrictionData={cContentRestrictionData}
            permission={permission}
            handleTabSelect={handleTabSelect}

            cAIApplications={cAIApplications}
            handleApplicationRedirect={handleApplicationRedirect}
            handlePageChange={handlePageChange}
        />
    )

    return (
      <Fragment>
        <Grid container spacing={1} className="m-b-sm" data-testid="permission-card" data-track-id="vector-db-permissions">
          <Grid item xs={12} md={6}>
            <div className='full-card-height'> 
              <Card className='full-width'>
                <Permissions 
                  vectorDBModel={this.props.vectorDBModel}
                  accessPolicy={this._vState.accessPolicy}
                  contentRestrictionData={cContentRestrictionData} 
                  permission={permission}
                  handleTabSelect={handleTabSelect}
                />
              </Card>
            </div>
          </Grid>
          {
            this.props.vectorDBModel.aiApplications?.length > 0 &&
            <Grid item xs={12} md={6}>
              <div className='full-card-height'> 
                <Card className='full-width'>
                  <ApplicationOverview 
                    cAIApplicationsData={cAIApplications}
                    handleApplicationRedirect={handleApplicationRedirect}
                    handlePageChange={handlePageChange}
                  />
                </Card>
              </div>
            </Grid>
          }
        </Grid>
      </Fragment>
    )
  }
}

const Permissions = observer(({vectorDBModel, contentRestrictionData, permission, handleTabSelect,
    cAIApplications, handleApplicationRedirect, handlePageChange
}) => {
  let totalCount = f.pageState(contentRestrictionData).totalElements;

  return (
      <>
        <br/>
        <FlexGrid narrow>
            <Row>
                <Column data-testid="permission-card">
                    <h5 data-testid="permission-info">Permissions</h5>
                    <div className="d-flex align-items-center space-between m-t-md">
                        <div data-testid="cont-rest-title">
                          <Rag /> RAG Filtering Permissions
                        </div>
                        <div data-testid="sim-icon">
                            <Filter />
                        </div>
                    </div>
                    <div className="d-flex align-items-center space-between m-t-md">
                        <div data-testid="cont-rest-title">
                          <UserMultiple /> User/Group Access-Limited Retrieval
                        </div>
                        <div data-testid="sim-icon">
                            {
                                vectorDBModel.groupEnforcement === STATUS.enabled.value
                                ? <CheckmarkFilled className="text-success" data-testid="check-icon"/>
                                : <Misuse data-testid="cancel-icon"/>
                            }
                        </div>
                    </div>
                </Column>
                <Column>
                    <h5 data-testid="application-info">Applications Overview</h5>
                    <ApplicationOverview
                        cAIApplicationsData={cAIApplications}
                        handleApplicationRedirect={handleApplicationRedirect}
                        handlePageChange={handlePageChange}
                    />
                </Column>
            </Row>
        </FlexGrid>
      </>
  )

  return (
    <Fragment>
      <CardContent data-testid="permission-card">
        <Grid item xs={12} data-track-id="vector-db-permissions">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="m-b-md">
            <Typography variant="h6" component="h2">
              Permissions
            </Typography>
            <AddButtonWithPermission
              className="pull-right"
              colAttr={{sm: 3}}
              permission={permission}
              label={"manage"}
              variant="outlined"
              onClick={() => handleTabSelect(1)}
              data-testid="manage-permission-btn"
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div data-testid="cont-rest-row" style={{ display: 'flex', alignItems: 'center' }} className="m-b-md">
            <RemoveCircleOutlineOutlinedIcon className="m-r-sm" />
            <Typography data-testid="cont-rest-title" variant="subtitle1" component="div">
              RAG Filtering Permissions
            </Typography>
            <div style={{ marginLeft: 'auto' }}>
              <Badge data-testid="sim-icon"
                badgeContent={totalCount}
                color="primary"
                className="m-r-md"
              >
                <SimCardAlertIcon color="action" />
              </Badge>
            </div>
          </div>
          <div data-testid="cont-rest-row" style={{ display: 'flex', alignItems: 'center' }} className="m-b-md">
            <GroupIcon className="m-r-sm" />
            <Tooltip arrow placement="top" title={"When enabled, this feature restricts the retrieval of data chunks and contextual information from RAG to only those elements the user or group has explicit permission to access. It ensures that each user's data interactions align with their designated access rights, enhancing data security and compliance"}>
              <Typography data-testid="cont-rest-title" variant="subtitle1" component="div">
                User/Group Access-Limited Retrieval
              </Typography>
            </Tooltip>
            <div style={{ marginLeft: 'auto' }}>
              <Badge data-testid="sim-icon"
                color="primary"
                className="m-r-md"
              >
                {
                  vectorDBModel.groupEnforcement === STATUS.enabled.value
                  ? <CheckCircleIcon className="text-success" data-testid="check-icon"/>
                  : <CancelIcon color="action" data-testid="cancel-icon"/>
                }
              </Badge>
            </div>
          </div>
        </Grid>
      </CardContent>
    </Fragment>
  );
});

const ApplicationOverview = observer(({cAIApplicationsData, handleApplicationRedirect, handlePageChange}) => {
  const getHeaders = () => {
    return [
      <TableCell column="applicationName" key={1} width="112px">Application Name</TableCell>,
      <TableCell column="status" key={2} width="21%">Status</TableCell>
    ];
  };
  const getRowData = (application) => {
    return [
      <TableCell key={1}>
        <a onClick={() => handleApplicationRedirect(application.id)} style={{ cursor: 'pointer' }} data-testid={`app-name-${application.id}`}>
          {application.name}
        </a>
      </TableCell>,
      <TableCell key={2}>
        {/* {
          application.status == STATUS.enabled.value
          ? <DoneIcon data-testid="application-enabled" className="text-success" />
          : <ClearIcon data-testid="application-disabled" color="secondary" />
        } */}
      </TableCell>
    ];
  };

  return (
      <Table
        data={cAIApplicationsData}
        getHeaders={getHeaders}
        getRowData={getRowData}
        pageChange={handlePageChange}
      />
  )

  return (
    <Fragment>
      <CardContent data-testid="application-overview-card">
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="m-b-md">
            <Typography variant="h6" component="h2">
              Applications Overview
            </Typography>
          </div>
          <Box pl={2} pr={2} className='scrollable-card'>
            <Table 
              hasElevation={false}
              data={cAIApplicationsData}
              getHeaders={getHeaders}
              getRowData={getRowData}
              stickyHeader={true}
              pageChange={handlePageChange}
            />
          </Box>
        </Grid>
      </CardContent>
    </Fragment>
  );
});

const SimCardAlertIcon = ({ className='MuiSvgIcon-colorAction' }) => {
  return (
    <svg
      className={`MuiSvgIcon-root MuiSvgIcon-fontSizeMedium ${className}`}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="sim-card-alert-icon"
    >
      <path d="M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 15h-2v-2h2v2zm0-4h-2V8h2v5z"></path>
    </svg>
  );
};

export default withRouter(CVectorDBPoliciesDetail);