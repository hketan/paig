import pytest
from unittest.mock import AsyncMock

from api.authz.authorizer.backend.rds_based_paig_authorizer import RDSBasedPaigAuthorizer
from core.controllers.paginated_response import Pageable
from core.exceptions import NotFoundException
from api.governance.api_schemas.ai_app import AIApplicationView
from api.governance.api_schemas.ai_app_config import AIApplicationConfigView
from api.governance.api_schemas.ai_app_policy import AIApplicationPolicyView
from api.governance.api_schemas.vector_db import VectorDBView
from api.governance.api_schemas.vector_db_policy import VectorDBPolicyView


@pytest.fixture
def user_controller():
    return AsyncMock()


@pytest.fixture
def ai_app_service():
    return AsyncMock()


@pytest.fixture
def ai_app_config_service():
    return AsyncMock()


@pytest.fixture
def ai_app_policy_service():
    return AsyncMock()


@pytest.fixture
def vector_db_service():
    return AsyncMock()


@pytest.fixture
def vector_db_policy_service():
    return AsyncMock()


@pytest.fixture
def authorizer(user_controller, ai_app_service, ai_app_config_service, ai_app_policy_service, vector_db_service,
               vector_db_policy_service):

    return RDSBasedPaigAuthorizer(
        user_service=user_controller,
        ai_app_service=ai_app_service,
        ai_app_config_service=ai_app_config_service,
        ai_app_policy_service=ai_app_policy_service,
        vector_db_service=vector_db_service,
        vector_db_policy_service=vector_db_policy_service
    )


@pytest.mark.asyncio
async def test_get_user_groups(authorizer, user_controller):
    user_controller.get_users_with_groups.return_value = Pageable(
        content=[{"username": "testuser", "groups": ["group1", "group2"]}],
        totalPages=1,
        totalElements=1,
        last=True,
        size=1,
        number=0,
        sort=[],
        numberOfElements=1,
        first=True,
        empty=False
    )
    groups = await authorizer.get_user_groups("testuser")
    assert groups == ["group1", "group2"]

    user_controller.get_users_with_groups.return_value = Pageable(
        content=[{"username": "nonexistentuser", "groups": []}],
        totalPages=1,
        totalElements=1,
        last=True,
        size=1,
        number=0,
        sort=[],
        numberOfElements=1,
        first=True,
        empty=False
    )
    groups = await authorizer.get_user_groups("nonexistentuser")
    assert groups == []

    user_controller.get_users_with_groups.side_effect = NotFoundException
    groups = await authorizer.get_user_groups("erroruser")
    assert groups == []


@pytest.mark.asyncio
async def test_get_application_details(authorizer, ai_app_service):
    app_view = AIApplicationView()
    ai_app_service.get_ai_application_by_application_key.return_value = app_view
    result = await authorizer.get_application_details("app_key")
    assert result == app_view


@pytest.mark.asyncio
async def test_get_application_config(authorizer, ai_app_config_service):
    app_config_view = AIApplicationConfigView()
    ai_app_config_service.get_ai_app_config.return_value = app_config_view
    result = await authorizer.get_application_config("app_key", application_id="app_id")
    assert result == app_config_view


@pytest.mark.asyncio
async def test_get_application_policies(authorizer, ai_app_policy_service):
    policy_views = [AIApplicationPolicyView(
        name="policy1",
        description="policy1 description",
        users=["user"],
        groups=["group"],
        roles=[],
        tags=["tag"],
        prompt="ALLOW",
        reply="DENY",
        enriched_prompt="ALLOW",
        application_id=1
    )]
    ai_app_policy_service.list_ai_application_authorization_policies.return_value = policy_views
    result = await authorizer.get_application_policies("app_key", ["tag"], "user", ["group"], "prompt",
                                                       application_id="app_id")
    assert result == policy_views


@pytest.mark.asyncio
async def test_get_vector_db_details(authorizer, vector_db_service):
    vector_db_view = VectorDBView(
        name="vector_db_name",
        description="vector_db_description",
        type="MILVUS",
        user_enforcement=1,
        group_enforcement=1,
        ai_applications=[]
    )
    vector_db_service.get_vector_db_by_name.return_value = vector_db_view
    result = await authorizer.get_vector_db_details("vector_db_name")
    assert result == vector_db_view


@pytest.mark.asyncio
async def test_get_vector_db_policies(authorizer, vector_db_policy_service):
    policy_views = [VectorDBPolicyView()]
    vector_db_policy_service.list_vector_db_authorization_policies.return_value = policy_views
    result = await authorizer.get_vector_db_policies(1, "user", ["group"])
    assert result == policy_views