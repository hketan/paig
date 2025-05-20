import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";

import history from 'common-ui/routers/history'
import {UI_CONSTANTS} from 'utils/globals';
import {Authorization, getRedirectPath} from 'auth/authorization';

import { permissionCheckerUtil } from 'common-ui/utils/permission_checker_util';

import CPageNotFound from 'containers/c_page_not_found';
import CForbiddenError from 'containers/c_forbidden_error';

import CDashboard from 'containers/dashboard/c_dashboard';
import CUserManagementMain from 'containers/user_management/c_user_management_main';

import CAIApplications from 'containers/applications/ai_applications/c_ai_applications';
import CAIApplicationCreate from 'containers/applications/ai_applications/c_ai_application_create';
import CAIApplicationMain from 'containers/applications/ai_applications/c_ai_application_main';

import CAIAssets from 'containers/applications/ai_assets/c_ai_assets';

import CVectorDB from 'containers/applications/vector_db/c_vector_db';
import CVectorDBCreate from 'containers/applications/vector_db/c_vector_db_create';
import CVectorDBMain from 'containers/applications/vector_db/c_vector_db_main';

import CSecurityAudits from 'containers/audits/security/c_security_audits';
import CAdminAudits from 'containers/compliance/c_admin_audits';

import CSensitiveData from 'containers/account/sensitive_data/c_sensitive_data';
import CShieldConfig from 'containers/shield_configuration/c_shield_configuration';
import CMetaData from 'containers/metadata/c_metadata';

import CReporting from 'containers/reports/c_reporting';
import CSavedReportsListing from 'containers/reports/c_saved_reports_listing';

import CEvaluationForm from 'containers/audits/evaluation/c_evaluation_create_form';
import CEvaluationConfigMain from 'containers/audits/evaluation/c_evaluation_main';
import CEvaluationReportsList from 'containers/audits/evaluation/c_evaluation_report_list';
import CEvaluationReportMain from 'containers/audits/evaluation/c_evaluation_report_main';

import CGuardrailListing from 'containers/guardrail/c_guardrail_listing';
import CResponseTemplate from 'containers/guardrail/c_response_template';
import CGuardrailForm from 'containers/guardrail/forms/c_guardrail_form';

import CGuardrailConnectionProvider from 'containers/guardrail/c_guardrail_connection_provider';
import CGuardrailProviderConnectedList from 'containers/guardrail/c_guardrail_provider_connected_list';

history.listen((location, action) => {
    // scroll to top when route changes
    window.scrollTo(0, 0);
});

const RedirectToPath = () => {
    let path = getRedirectPath();
    console.log('landing page path: ', path);
    return <Redirect to={path} />;
}

const checkComponentPermission = (permissionProperty) => {
    const permission = permissionCheckerUtil.getPermissions(permissionProperty);
    return !permissionCheckerUtil.checkHasReadPermission(permission);
}

const Routes = () => (
	<Switch>
		<Route exact path="/" component={RedirectToPath} />


        {/* Paig Navigator */}
        <Route path="/ai_application/create" name="Create Application" component={Authorization(CAIApplicationCreate, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.AI_APPLICATIONS])} />
        <Route path="/ai_application/:id" name="AI Application Details" component={Authorization(CAIApplicationMain, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.AI_APPLICATIONS])} />
        <Route path="/ai_applications" name="AI Applications" component={Authorization(CAIApplications, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.AI_APPLICATIONS])} />

        <Route path="/ai_assets" name="AI Assets" component={Authorization(CAIAssets, [UI_CONSTANTS.AI_ASSETS])} />

        <Route path="/vector_db/create" name="Create Vector DB" component={Authorization(CVectorDBCreate, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.VECTOR_DB])} />
        <Route path="/vector_db/:id" name="Update Vector DB" component={Authorization(CVectorDBMain, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.VECTOR_DB])} />
        <Route path="/vector_db" name="Vector DB" component={Authorization(CVectorDB, [UI_CONSTANTS.PAIG_NAVIGATOR, UI_CONSTANTS.VECTOR_DB])} />

        <Route path="/guardrails/create/:newId" name="Create Guardrail" component={Authorization(CGuardrailForm, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.GUARDRAILS])} />
        <Route path="/guardrails/create" name="Create Guardrail" component={Authorization(CGuardrailForm, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.GUARDRAILS])} />
        <Route path="/guardrails/edit/:id" name="Update Guardrail" component={Authorization(CGuardrailForm, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.GUARDRAILS])} />
        <Route path="/guardrails" name="Guardrails" component={Authorization(CGuardrailListing, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.GUARDRAILS])} />
        <Route path="/response_templates" name="Response Templates" component={Authorization(CResponseTemplate, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.RESPONSE_TEMPLATES])} />
        <Route path="/guardrail_connection_provider/:provider" name="Guardrail Connections" component={Authorization(CGuardrailProviderConnectedList, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.GUARDRAIL_CONNECTION_PROVIDER])} />
        <Route path="/guardrail_connection_provider" name="Guardrail Connections" component={Authorization(CGuardrailConnectionProvider, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.GUARDRAIL_CONNECTION_PROVIDER])} />

        {/* Paig Lens */}
        <Route path="/dashboard" name="Dashboard" component={Authorization(CDashboard, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.DASHBOARD])} />

        <Route path="/eval_reports" name="Evaluation Reports" component={Authorization(CEvaluationReportsList, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.EVALUATION_REPORTS])} />
        <Route path="/eval/create" name="Create Security Evaluation" component={Authorization(CEvaluationForm, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.EVALUATION_SECURITY, UI_CONSTANTS.EVALUATION_CONFIG])} />
        <Route path="/eval_configs" name="Security Evaluation" component={Authorization(CEvaluationConfigMain, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.EVALUATION_SECURITY])} />
        <Route path="/eval_report/:eval_id" name="Evaluation Report" component={Authorization(CEvaluationReportMain, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.EVALUATION_REPORTS])} />

        <Route path="/audits_security" name="Access Audits" component={Authorization(CSecurityAudits, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.SECURITY])} />
        {/* TODO: [PAIG-2025] Uncomment this route once Admin Audits implemented */}
        {/* <Route path="/admin_audits" name="Admin Audits" component={Authorization(CAdminAudits, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.ADMIN_AUDITS])} /> */}

        <Route exact path="/reports" name="Reports" component={Authorization(CReporting, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.BUILT_IN_REPORTS])} />
        <Route path="/reports/:reportType/new" name="Reports" component={Authorization(CReporting, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.BUILT_IN_REPORTS])} />
        {/* TODO: [PAIG-2025] Uncomment this route once Saved Reports implemented */}
        {/* <Route path="/saved_reports" name="Saved Reports" component={Authorization(CSavedReportsListing, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.SAVED_REPORTS])} /> */}
        {/* <Route path="/reports/:reportType/:configId" name="Saved Reports" component={Authorization(CReporting, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.BUILT_IN_REPORTS])} /> */}
        {/* <Route path="/report/:configId" name="Saved Reports" component={Authorization(CReporting, [UI_CONSTANTS.PAIG_LENS, UI_CONSTANTS.BUILT_IN_REPORTS])} /> */}

        {/* Paig Guard */}
        <Route path="/tags" name="Tags" component={Authorization(CSensitiveData, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.SENSITIVE_DATA])} />
        <Route path="/vector_db_metadata" name="Vector DB Metadata" component={Authorization(CMetaData, [UI_CONSTANTS.PAIG_GUARD, UI_CONSTANTS.META_DATA])} />
        
        {/* Settings */}
        <Route path="/users" name="Users" component={Authorization(CUserManagementMain, [UI_CONSTANTS.SETTINGS, UI_CONSTANTS.USERS])} />

        {/* TODO: [PAIG-2025] Uncomment this route once Shield Configuration implemented */}
        {/* <Route path="/shield_configuration" name="Shield Configuration" component={Authorization(CShieldConfig, [UI_CONSTANTS.SETTINGS, UI_CONSTANTS.SHIELD_CONFIGURATION])} /> */}

		<Route path="/not_found"  component={CPageNotFound} />
        <Route path="/forbidden" component={CForbiddenError}  />
        <Redirect to="/not_found" from="*" />
	</Switch>
)

export {
    Routes
}
