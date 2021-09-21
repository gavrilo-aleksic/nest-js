declare interface IMail {
  to: [string];
  cc?: [string];
  bcc?: [string];
  from: string;
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
  amp?: string;
  attachments?: IAttachment[];
}

declare interface IAttachment {
  filename?: string;
  content?: string;
  path?: string;
  contentType?: string;
  encoding?: string;
  raw?: string;
  cid?: string;
}
