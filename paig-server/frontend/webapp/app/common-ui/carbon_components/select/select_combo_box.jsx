import React, {Component, Fragment} from 'react';

import {ComboBox} from '@carbon/react';

class SelectComboBox extends Component {
    state = {
        options: []
    }
    componentDidMount() {
        const {data, fetchOnLoad, fetchOptions} = this.props;
        if (fetchOnLoad) {
            this.fetchOptions();
        } else {
            this.setOptions();
        }
    }
    loadOptions = (value) => {
        this.fetchOptions(value);
    }
    fetchOptions = (inputValue='') => {
        const {fetchOptions} = this.props;
        if (fetchOptions) {
            try {
                //this._vState.loading = true;
                //this.searchValue = inputValue;
                fetchOptions(inputValue, this.setOptions);
            } catch(e) {
                //this.searchValue = '';
                //this._vState.loading = false;
            }
        }
    }
    setOptions = (options) => {
        this.setState({options});
    }
    render() {
        const {data, label, labelKey='label', valueKey='value', fetchOnLoad, fetchOptions, ...props} = this.props;
        const {options} = this.state;

        return (
            <ComboBox
                id={label}
                titleText={label}
                data-testid="combobox-field"
                {...props}
                items={options}
                itemToString={(item) => (item ? item[labelKey] || '' : '')}
            />
        )
    }
}

export {
    SelectComboBox
}