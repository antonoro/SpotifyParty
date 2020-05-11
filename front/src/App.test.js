import App from './App';
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<App></App>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
