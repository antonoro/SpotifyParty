import React from 'react';
import Dashboard from '../Dashboard.js';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Dashboard></Dashboard>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it('renders correctly', () => {
  const tree = renderer
    .create(<Dashboard page="http://www.instagram.com">Instagram</Dashboard>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('will fail every time', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'Juan Otalora',
  };

  expect(user).toMatchSnapshot();
});

// Snapshot
exports[`will fail every time 1`] = `
Object {
  "createdAt": 2018-05-19T23:36:09.816Z,
  "id": 3,
  "name": "Juan Otalora",
}
`;