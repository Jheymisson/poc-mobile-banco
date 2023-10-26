import { MongoClient } from 'mongodb';

const uri = '';
const dbName = '';

class MongoConnection {
  async getCodigoSms(phone: string): Promise<MongoCode[] | undefined> {
    const client = new MongoClient(uri);
    await client.connect();
    const result: MongoCode[] = await new Promise((resolve) => {
      client
        .db(dbName)
        .collection('OtpTokens')
        .find({ key: phone })
        .toArray((err: any, docs: any) => {
          resolve(docs);
        });
    });
    await client.close();
    return result;
  }

  async getCodigoEmail(email: string): Promise<MongoCode[] | undefined> {
    const client = new MongoClient(uri);
    await client.connect();
    const result: MongoCode[] = await new Promise((resolve) => {
      client
        .db(dbName)
        .collection('OtpTokens')
        .find({ key: email })
        .toArray((err: any, docs: any) => {
          resolve(docs);
        });
    });
    await client.close();
    return result;
  }
}

export default new MongoConnection();
