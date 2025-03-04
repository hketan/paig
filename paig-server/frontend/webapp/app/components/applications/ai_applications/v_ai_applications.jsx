import React, {Component} from 'react';
import {observer} from "mobx-react";

import {Tile, Grid, Row, Column, Link, OverflowMenu, OverflowMenuItem} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

import f from 'common-ui/utils/f';
import {SkeletonTextLoader} from 'common-ui/carbon_components/loader';

@observer
class VAIApplications extends Component {
    render() {
        const {data, permission, handleApplicationEdit, handleDeleteApplication} = this.props;

        return (
            <SkeletonTextLoader
              promiseData={data}
              lineCount={6}
            >
                {
                    () => {
                        return (
                            <Grid narrow data-testid="app-card-grid">
                                {
                                    f.models(data).map(app => {
                                        return (
                                            <Column key={app.id} lg={5} md={4} sm={4}>
                                                <Tile data-track-id="application" style={{height: '170px'}}>
                                                    <h6 data-testid="app-name">{app.name}</h6>
                                                    <br />
                                                    <div data-testid="app-desc" className="multiline-ellipsis" style={{height: '55px'}}>
                                                        <span>{app.description}</span>
                                                    </div>
                                                    <br />
                                                    <Row className="space-between align-items-center">
                                                        <Column className="m-l-xs" style={{height: '40px'}}>
                                                            {
                                                                !app.default &&
                                                                <OverflowMenu aria-label="application-action-menu">
                                                                    <OverflowMenuItem
                                                                        itemText="Edit"
                                                                        onClick={e => handleApplicationEdit(app.id)}
                                                                    />
                                                                    <OverflowMenuItem
                                                                        isDelete
                                                                        itemText="Delete"
                                                                        onClick={e => handleDeleteApplication(app)}
                                                                    />
                                                                </OverflowMenu>
                                                            }
                                                        </Column>
                                                        <Column>
                                                            <Link
                                                                href="void:0"
                                                                className="align-items-center"
                                                                onClick={e => handleApplicationEdit(app.id)}
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

export default VAIApplications;