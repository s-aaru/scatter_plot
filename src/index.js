import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store/configureStore';
import {loadPlottedPoints} from './actions/entityAction';
import {Provider} from 'react-redux';

const store = configureStore();

/*fetch data from api and set it to redux store*/
store.dispatch(loadPlottedPoints());

ReactDOM.render(
<Provider store={store}>	
<App/>
</Provider>,document.getElementById('app'));