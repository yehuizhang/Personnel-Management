import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('<App /> render without crashing', () => {
  shallow(<App />);
});
