"""Added Guardrail service tables

Revision ID: 67a256363095
Revises: db6e7b60cb0a
Create Date: 2025-01-31 16:59:29.619823

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import core.db_models.utils


# revision identifiers, used by Alembic.
revision: str = '67a256363095'
down_revision: Union[str, None] = 'db6e7b60cb0a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('guardrail',
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=4000), nullable=True),
    sa.Column('version', sa.Integer(), nullable=False),
    sa.Column('guardrail_provider', sa.Enum('AWS', name='guardrailprovider'), nullable=True),
    sa.Column('guardrail_connection_name', sa.String(length=255), nullable=True),
    sa.Column('guardrail_configs', sa.JSON(), nullable=False),
    sa.Column('guardrail_provider_response', sa.JSON(), nullable=True),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('status', sa.Integer(), nullable=False),
    sa.Column('create_time', sa.DateTime(), nullable=False),
    sa.Column('update_time', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_guardrail_create_time'), 'guardrail', ['create_time'], unique=False)
    op.create_index(op.f('ix_guardrail_id'), 'guardrail', ['id'], unique=False)
    op.create_index(op.f('ix_guardrail_update_time'), 'guardrail', ['update_time'], unique=False)
    op.create_table('guardrail_connection',
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=4000), nullable=True),
    sa.Column('guardrail_provider', sa.Enum('AWS', name='guardrailprovider'), nullable=False),
    sa.Column('connection_details', sa.JSON(), nullable=False),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('status', sa.Integer(), nullable=False),
    sa.Column('create_time', sa.DateTime(), nullable=False),
    sa.Column('update_time', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_guardrail_connection_create_time'), 'guardrail_connection', ['create_time'], unique=False)
    op.create_index(op.f('ix_guardrail_connection_id'), 'guardrail_connection', ['id'], unique=False)
    op.create_index(op.f('ix_guardrail_connection_update_time'), 'guardrail_connection', ['update_time'], unique=False)
    op.create_table('response_template',
    sa.Column('response', sa.String(length=4000), nullable=False),
    sa.Column('description', sa.String(length=4000), nullable=True),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('status', sa.Integer(), nullable=False),
    sa.Column('create_time', sa.DateTime(), nullable=False),
    sa.Column('update_time', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_response_template_create_time'), 'response_template', ['create_time'], unique=False)
    op.create_index(op.f('ix_response_template_id'), 'response_template', ['id'], unique=False)
    op.create_index(op.f('ix_response_template_update_time'), 'response_template', ['update_time'], unique=False)
    op.create_table('guardrail_version_history',
    sa.Column('guardrail_id', sa.Integer(), nullable=False),
    sa.Column('version', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=4000), nullable=True),
    sa.Column('guardrail_provider', sa.Enum('AWS', name='guardrailprovider'), nullable=True),
    sa.Column('guardrail_connection_name', sa.String(length=255), nullable=True),
    sa.Column('guardrail_configs', sa.JSON(), nullable=False),
    sa.Column('guardrail_provider_response', sa.JSON(), nullable=True),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('status', sa.Integer(), nullable=False),
    sa.Column('create_time', sa.DateTime(), nullable=False),
    sa.Column('update_time', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['guardrail_id'], ['guardrail.id'], name='fk_guardrail_version_history_guardrail_id', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_guardrail_version_history_create_time'), 'guardrail_version_history', ['create_time'], unique=False)
    op.create_index(op.f('ix_guardrail_version_history_id'), 'guardrail_version_history', ['id'], unique=False)
    op.create_index(op.f('ix_guardrail_version_history_update_time'), 'guardrail_version_history', ['update_time'], unique=False)

    op.add_column('ai_application', sa.Column('guardrails', core.db_models.utils.CommaSeparatedList(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('ai_application', 'guardrails')

    op.drop_index(op.f('ix_guardrail_version_history_update_time'), table_name='guardrail_version_history')
    op.drop_index(op.f('ix_guardrail_version_history_id'), table_name='guardrail_version_history')
    op.drop_index(op.f('ix_guardrail_version_history_create_time'), table_name='guardrail_version_history')
    op.drop_table('guardrail_version_history')
    op.drop_index(op.f('ix_response_template_update_time'), table_name='response_template')
    op.drop_index(op.f('ix_response_template_id'), table_name='response_template')
    op.drop_index(op.f('ix_response_template_create_time'), table_name='response_template')
    op.drop_table('response_template')
    op.drop_index(op.f('ix_guardrail_connection_update_time'), table_name='guardrail_connection')
    op.drop_index(op.f('ix_guardrail_connection_id'), table_name='guardrail_connection')
    op.drop_index(op.f('ix_guardrail_connection_create_time'), table_name='guardrail_connection')
    op.drop_table('guardrail_connection')
    op.drop_index(op.f('ix_guardrail_update_time'), table_name='guardrail')
    op.drop_index(op.f('ix_guardrail_id'), table_name='guardrail')
    op.drop_index(op.f('ix_guardrail_create_time'), table_name='guardrail')
    op.drop_table('guardrail')
    # ### end Alembic commands ###
