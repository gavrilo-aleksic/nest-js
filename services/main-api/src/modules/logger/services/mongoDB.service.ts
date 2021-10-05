import { Injectable } from '@nestjs/common';
import { connect, model, Schema, Model } from 'mongoose';
import { ILogError } from 'src/@types/api';
import { EventsGateway } from 'src/modules/events/events.gateway';

interface IMessageLog {
  error: string;
  code: string;
  date: Date;
  stack: string;
}

@Injectable()
export class MongoDBService {
  private Error: Model<IMessageLog>;
  private errorSchema = new Schema({
    error: String,
    code: String,
    date: Date,
    stack: String,
  });

  constructor(private eventsGateway: EventsGateway) {
    this.Error = model('Error', this.errorSchema);
  }

  connect() {
    connect(process.env.MONGO_DB_CONNECTION).then((res) => {});
  }

  async log(value: ILogError) {
    const error = new this.Error({
      error: value.error.message,
      code: value.error.code,
      user: value.user,
      date: new Date(),
      stack: value.stack,
    });
    this.eventsGateway.sendMessage('TEST MESSAGE');
    return error.save();
  }
}
