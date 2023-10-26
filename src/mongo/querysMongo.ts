import { last } from 'lodash';
import MongoConnection from './mongoConnection';
import { sleep } from '../utils/helpers';

class QuerysMongo {
  async getTokenSms(phone: string): Promise<string> {
    let smsMongo;
    let codeSms;
    for (let i = 0; i < 3; i++) {
      smsMongo = await MongoConnection.getCodigoSms(phone);
      try {
        codeSms = last(smsMongo).code;
        break;
      } catch {
        await sleep(3000);
      }
    }
    console.log(`CODIGO SMS === ${codeSms}`);
    return codeSms;
  }

  async getTokenEmail(email: string): Promise<string> {
    let emailMongo;
    let codeEmail;
    for (let i = 0; i < 3; i++) {
      emailMongo = await MongoConnection.getCodigoEmail(email);
      try {
        codeEmail = last(emailMongo).code;
        break;
      } catch {
        await sleep(3000);
      }
    }
    console.log(`CODIGO EMAIL === ${codeEmail}`);
    return codeEmail;
  }
}
export default new QuerysMongo();
