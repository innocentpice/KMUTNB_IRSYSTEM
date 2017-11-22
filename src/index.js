import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import Store from './stores';
import Routes from './routes';

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'moment/locale/th';

const rootEl = document.getElementById('root');

if (module.hot) {
    module.hot.accept('./routes', () => {
        const NextApp = require('./routes').default;
        const NextStore = require('./stores').default;
        ReactDOM.render(
            <Provider store={NextStore}>
                <NextApp />
            </Provider>,
            rootEl
        )
    })
}

ReactDOM.render(
    <Provider store={Store}>
        <Routes />
    </Provider>, rootEl);

registerServiceWorker();
