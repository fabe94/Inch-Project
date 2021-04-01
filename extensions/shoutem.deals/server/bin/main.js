require('es6-promise').polyfill();
import 'fetch-everywhere';

import '@shoutem/react-web-ui/lib/styles/index.scss';
import '@shoutem/extension-sandbox';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';
import URI from 'urijs';
import { LoaderContainer } from '@shoutem/react-web-ui';
import api, { getExtension } from '@shoutem/redux-api-sdk';
import { RioStateSerializer } from '@shoutem/redux-io';
import { SyncStateEngine } from '@shoutem/redux-sync-state-engine';
import * as extension from '../src/index';
import { PageProvider, connectPage, Page } from './page';
import { SyncStateEngineProvider } from './syncStateEngine';
import configureStore from './configureStore';

const uri = new URI(window.location.href);
const pageName = _.get(uri.search(true), 'page', '');
const PageComponent = _.get(extension, ['pages', pageName]);
const rioStateSerializer = new RioStateSerializer();

function renderPage() {
  if (!PageComponent) {
    return (
      <div>Page not found: {pageName}</div>
    );
  }

  const ConnectedPageComponent = connectPage()(PageComponent);
  return (<ConnectedPageComponent />);
}

function initializeApi(context, initialState) {
  const { ownExtensionName } = context;
  const installation = getExtension(initialState, ownExtensionName);
  const additionalEndpoints = [_.get(installation, 'settings.dealsEndpoint')];
  const newContext = _.cloneDeep(context);
  // url.aditionalEndpoints - used to extend endpoints validated against fetch 
  // token intercept regex
  _.set(newContext, 'url.additionalEndpoints', additionalEndpoints);
  // initialize fetchTokenIntercept and register shortcut and extension schemas
  api.init(newContext);
}

// handler for Shoutem initialization finished
function onShoutemReady(event) {
  // config object containing builder extension configuration, can be accessed via event
  // or by shoutem.sandbox.config
  const config = rioStateSerializer.deserialize(event.detail.config);
  const { context, parameters, state: initialState } = config;

  const page = new Page(context, parameters);

  const pageWillMount = _.get(extension, 'pageWillMount');
  if (pageWillMount) {
    pageWillMount(page);
  }

  const syncStateEngine = new SyncStateEngine({
    stateSerializer: rioStateSerializer,
  });

  const store = configureStore(context, initialState, syncStateEngine);
  initializeApi(context, initialState);

  // Render it to DOM
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  ReactDOM.render(
    <Provider store={store}>
      <SyncStateEngineProvider syncStateEngine={syncStateEngine}>
        <PageProvider page={page}>
          {renderPage()}
        </PageProvider>
      </SyncStateEngineProvider>
    </Provider>,
    document.getElementById('root')
  );
}

// listen for Shoutem initialization complete
document.addEventListener('shoutemready', onShoutemReady, false);

// Render it to DOM
ReactDOM.render(
  <LoaderContainer size="50px" isLoading />,
  document.getElementById('root')
);

