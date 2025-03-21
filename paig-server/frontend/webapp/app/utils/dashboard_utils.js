var DashboardUtils = {};

DashboardUtils.formatSensitiveDataInApplications = (data = {}) => {
    const transformedData = [];

    if (!data.traits) {
      return transformedData;
    }

    for (const key in data.traits) {
      const trait = {
        tag: key,
        queries: data.traits[key].count,
        graphData: []
      };

      if (data.traits[key].applicationName) {
        for (const appKey in data.traits[key].applicationName) {
          trait.graphData.push({
            //name: appKey,
            //data: [data.traits[key].applicationName[appKey].count],
            group: appKey,
            key: key,
            value: data.traits[key].applicationName[appKey].count
          });
        }
      }

      transformedData.push(trait);
    }

    /*let transformedData = [];

    if (!data.traits) {
      return transformedData;
    }

    for (const key in data.traits) {
      const trait = data.traits[key];

      if (trait.applicationName) {
        for (const appKey in trait.applicationName) {
          transformedData.push({
            group: appKey,
            key: key,
            value: trait.applicationName[appKey].count,
            total: trait.count
          });
        }
      }
    }

    let d = transformedData.reduce((acc, curr) => {
        if (acc[curr.key]) {
          acc[curr.key][graphData].push(curr);
        } else {
            acc[curr.key] = {
                tag: curr.key,
                graphData: [curr]
            }
        }
        return acc;
    }, {});

    transformedData = Object.values(d);*/

    return transformedData;
  }

  export default DashboardUtils;