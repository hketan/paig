import React, {Component} from 'react';
import {observable} from 'mobx';

import CAIApplicationDetail from 'containers/applications/ai_applications/c_ai_application_detail';

class CAIApplicationCreate extends Component {
    @observable _vState = {
        loading: false,
        application: {}
    }
	constructor(props) {
		super(props);
	}
	render() {
        const {_vState} = this;

        return (
            <CAIApplicationDetail
                _vState={_vState}
            />
        )
	}
}

export default CAIApplicationCreate;