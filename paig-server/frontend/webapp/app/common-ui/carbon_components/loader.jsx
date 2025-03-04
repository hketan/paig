import React from 'react';
import {observer} from "mobx-react";

import {SkeletonText} from '@carbon/react';

import f from 'common-ui/utils/f';

const SkeletonTextLoader = observer(({
    promiseData=null, isLoading=false, children, obj, field, ...props
}) => {
    let loading = false;

    if ((f.isPromise(promiseData) && f.isLoading(promiseData)) || isLoading) {
        loading = true;
    } else if (obj && field && typeof obj[field] === 'boolean') {
        loading = obj[field];
    }
    if (loading) {
        return (
            <SkeletonText
                lineCount={3}
                paragraph={true}
                width="100%"
                data-testid='loader'
                {...props}
            />
        );
    }

    if (typeof children === 'function') {
        return children();
    }

    return children;
});

export {
    SkeletonTextLoader
}