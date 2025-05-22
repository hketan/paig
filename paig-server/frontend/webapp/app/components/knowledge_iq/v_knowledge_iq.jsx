import React from 'react';
import { observer } from 'mobx-react';

import {Button, Grid} from '@material-ui/core';

import {FormHorizontal, FormGroupInput, FormGroupSwitch} from 'common-ui/components/form_fields';

const VKnowledgeIQPrompt = observer(({_vState, handleAskQuestion}) => {
    return (
        <FormHorizontal>
            <FormGroupInput
                as="textarea"
                placeholder="Ask a question..."
                value={_vState.question}
                onChange={(e) => {
                    _vState.question = e.target.value;
                }}
                data-testid="ask-question"
            />
            <FormGroupSwitch
                label="Explain Results"
                checked={_vState.explainResults}
                onChange={e => {
                    _vState.explainResults = e.target.value;
                }}
                data-testid="explain-results"
            />
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!_vState.question.trim()}
                    onClick={handleAskQuestion}
                    data-testid="ask-question-button"
                >
                    Ask
                </Button>
            </Grid>
        </FormHorizontal>
    );
});

export {
    VKnowledgeIQPrompt
};