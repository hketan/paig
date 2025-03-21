import React, { Component, Fragment, useContext } from "react";
import { observer } from "mobx-react";
import { maxBy } from 'lodash';

// import { Box, Grid, Paper, Typography } from "@material-ui/core";
import {Tile, Row, Column, TableCell, Tag} from '@carbon/react';
import { DonutChart, GroupedBarChart, StackedBarChart } from '@carbon/charts-react'
import '@carbon/charts-react/styles.css';

// import { ApplicationTable } from "containers/dashboard/application_table";
// import DataAccessGraph from "components/dashboard/data_access_graph";
// import DonutChart from "components/dashboard/donut_chart";
// import { Loader, getSkeleton } from 'common-ui/components/generic_components'
import f from "common-ui/utils/f";
import ThemeContext from 'components/site/theme_context';
import Table from 'common-ui/carbon_components/table';

const PaperCard = (props) => {
  const { children, boxProps={}, paperProps={} } = props;
  return (
    <Box {...boxProps}>
      <Paper {...paperProps}>
        <Box p={2}>{children}</Box>
      </Paper>
    </Box>
  );
};

const VChartComponent = observer(({title, data, trackId}) => {
  const { getGlobalTheme } = useContext(ThemeContext);
  return (
    <Column item md={4} sm={6} xs={12} className="graph-border-left" data-track-id={trackId}>
        <DonutChart
            data={f.models(data).length ? f.models(data) : []}
            options={{
                title,
                resizable: true,
                pie: {
                    valueMapsTo: 'count'
                },
                height: '400px',
                toolbar: {
                    enabled: false
                },
                theme: getGlobalTheme()
            }}
        />
    </Column>
  )
})

const VUsage = ({cMessageUsage, cSensitiveDataPromptUsage, cSensitiveDataRepliesUsage}) => {
  return (
    <Tile>
      <div>
        Usage
      </div>
      <Row>
        <VChartComponent
          title="Messages"
          data={cMessageUsage}
          trackId="messages"
        />
        <VChartComponent
          title="Sensitive Data in Prompts"
          data={cSensitiveDataPromptUsage}
          trackId="sensitive-data-prompts"
        />
        <VChartComponent
          title="Sensitive Data in Replies"
          data={cSensitiveDataRepliesUsage}
          trackId="sensitive-data-replies"
        />
      </Row>
    </Tile>
  )
}

const VSensitiveDataAccess = observer(({data}) => {
  const { getGlobalTheme } = useContext(ThemeContext);

  let firstHalf = [];
  let secondHalf = [];

  let models = f.models(data);
  let length = models.length;
  // Find the maximum queries value across all models
  let maxQuery = maxBy(models, 'queries')?.queries || 0;

  if (length) {
    const middleIndex = Math.ceil(length / 2);
    firstHalf = models.slice(0, middleIndex);
    secondHalf = models.slice(middleIndex);
  }

  let options = {
   title: ' ',
   axes: {
     left: {
       visible: false,
       scaleType: 'labels',
       mapsTo: 'key'
     },
     bottom: {
       visible: false,
       stacked: true,
       mapsTo: 'value'
     }
   },
   grid: {
     x: false,
     y: false
   },
   legend: {
     enabled: false, // ✅ Hide legend
   },
   toolbar: {
     enabled: false, // ✅ Hide export and view table
   },
   height: '40px',
   theme: getGlobalTheme()
 }

  const headers = [{
      header: 'Tags'
  }, {
      header: 'Queries'
  }, {
     header: 'Distribution'
  }]

  const getRowData = (model) => {
      return [
          <TableCell key="tags">
              <Tag
                  type="cool-gray"
                  size="md"
              >
                {model.tag}
              </Tag>
          </TableCell>,
          <TableCell key="queries">
            {model.queries}
          </TableCell>,
          <TableCell key="distribution">
              <StackedBarChart
                  data={model.graphData}
                  options={options}
              />
          </TableCell>
      ];
  }

  return (
    <Tile paperProps={{'data-track-id': 'sensitive-data-in-applications'}} className="m-t-md">
      <div id="sensitive-data-title">
        Sensitive Data Accessed in Applications
      </div>
        <Row>
          {
            firstHalf.length > 0
            ? (
              <Fragment>
                <Column lg={16} /* className="border-right" */>
                  {/* <ApplicationTable distributionData={firstHalf} maxQuery={maxQuery} /> */}
                  <Table
                    data={firstHalf}
                    headers={headers}
                    getRowData={getRowData}
                  />
                </Column>
                <Column lg={16}>
                  {/* <ApplicationTable distributionData={secondHalf} maxQuery={maxQuery} /> */}
                  {/* <StackedBarChart
                    data={secondHalf}
                    options={options}
                  /> */}
                  <Table
                      data={secondHalf}
                      headers={headers}
                      getRowData={getRowData}
                  />
                </Column>
              </Fragment>
            )
            : (
              <Column xs={12}>
                <div data-testid="noData">
                  <div variant="subtitle1">No data to display</div>
                </div>
              </Column>
            )
          }
        </Row>
    </Tile>
  )
})

const VDataAccess = observer(({data}) => {
    const { getGlobalTheme } = useContext(ThemeContext);
  return (
    <Tile paperProps={{'data-track-id': 'data-access'}} className="m-t-md">
    <Row>
      <Column item xs={12}>
        {/* <DataAccessGraph data={{
            chartData: model?.series || [],
            categories: model?.categories || []
          }}
        /> */}
        <GroupedBarChart
            data={f.models(data)}
            options={{
               title: 'Data Access',
               axes: {
                 left: {
                   mapsTo: 'value'
                 },
                 bottom: {
                   scaleType: 'labels',
                   mapsTo: 'key'
                 }
               },
               height: '400px',
               toolbar: {
                   enabled: false
               },
               theme: getGlobalTheme()
            }}
        />
      </Column>
    </Row>
    </Tile>
  );
});

export {
  VUsage,
  VSensitiveDataAccess,
  VDataAccess
}
