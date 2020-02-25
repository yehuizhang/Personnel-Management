import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

// temporarily exclude
xit('<App /> render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('<App /> shallow render', () => {
  shallow(<App />);
});
