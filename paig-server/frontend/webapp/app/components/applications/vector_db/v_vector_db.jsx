import React, {Component} from 'react';
import {observer} from "mobx-react";

import {Tile, Grid, Row, Column, Link, OverflowMenu, OverflowMenuItem} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

import f from 'common-ui/utils/f';
import {SkeletonTextLoader} from 'common-ui/carbon_components/loader';

@observer
class VVectorDB extends Component {
    render() {
        const {data, permission, handleVectorDBEdit, handleDeleteVectorDB} = this.props;

        return (
            <SkeletonTextLoader
              promiseData={data}
              lineCount={6}
            >
                {
                    () => {
                        return (
                            <Grid narrow data-testid="card-grid">
                                {
                                    f.models(data).map(model => {
                                        return (
                                            <Column key={model.id} lg={5} md={4} sm={4}>
                                                <Tile data-track-id="vector-db-grid" style={{height: '170px'}}>
                                                    <h6 data-testid="name">{model.name}</h6>
                                                    <br />
                                                    <div data-testid="desc" className="multiline-ellipsis" style={{height: '55px'}}>
                                                        <span>{model.description}</span>
                                                    </div>
                                                    <br />
                                                    <Row className="space-between align-items-center">
                                                        <Column className="m-l-xs" style={{height: '40px'}}>
                                                            <OverflowMenu aria-label="vector-db-action-menu">
                                                                <OverflowMenuItem
                                                                    itemText="Edit"
                                                                    onClick={e => handleVectorDBEdit(model.id)}
                                                                />
                                                                <OverflowMenuItem
                                                                    isDelete
                                                                    itemText="Delete"
                                                                    onClick={e => handleDeleteVectorDB(model)}
                                                                />
                                                            </OverflowMenu>
                                                        </Column>
                                                        <Column>
                                                            <Link
                                                                href="void:0"
                                                                className="align-items-center"
                                                                onClick={e => handleVectorDBEdit(model.id)}
                                                            >
                                                                <span className="m-r-sm">Detail</span> <ArrowRight aria-label="Detail" />
                                                            </Link>
                                                        </Column>
                                                    </Row>
                                                </Tile>
                                            </Column>
                                        )
                                    })
                                }
                            </Grid>
                        )
                    }
                }
            </SkeletonTextLoader>
        );
    }
}

export default VVectorDB;