import App from './App';
import React from 'react';
import renderer from 'react-test-renderer';

const {MongoClient} = require('mongodb');
const url = process.env.MONGO_URI;
const mu = {}, dbName = "PartyData", GroupColl = "groupParties", GroupChats = "groupChats";

it('renders correctly', () => {
  const tree = renderer
    .create(<App></App>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
    });
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});