import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'sd_hub';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('students');

  const findResult = await collection.find({}).toArray();
console.log('Found documents =>', findResult);

const insertResult = await collection.insertMany([{studentID:14,name:"mohd yaser",age:24,number:665465465,email:"mohdyaser@sdhub.com"}]);
console.log('Inserted documents =>', insertResult);


  // the following code examples can be pasted here...

  return 'done.';

}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());