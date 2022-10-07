import sgMail, { ClientResponse, MailDataRequired } from '@sendgrid/mail';
import client from '@sendgrid/client';
import { ClientRequest } from '@sendgrid/client/src/request';
import { HttpMethod } from '@sendgrid/helpers/classes/request';

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY || '');
client.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY || '');

export async function sendMail(msg: MailDataRequired): Promise<ClientResponse> {
  const [response] = await sgMail.send(msg);
  return response;
}

export async function upsertContact(data): Promise<ClientResponse> {
  const request: ClientRequest = {
    url: '/v3/marketing/contacts',
    method: 'PUT' as HttpMethod,
    body: data,
  };

  const [response] = await client.request(request);
  return response;
}
