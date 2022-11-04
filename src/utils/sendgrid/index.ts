import sgMail, { ClientResponse, MailDataRequired } from '@sendgrid/mail';
import client from '@sendgrid/client';
import { ClientRequest } from '@sendgrid/client/src/request';
import { HttpMethod } from '@sendgrid/helpers/classes/request';

function initialize(client) {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey && process.env.NODE_ENV === 'production') {
    throw new Error('Sendgrid key is not defined');
  }

  client.setApiKey(apiKey);
}

export async function sendMail(msg: MailDataRequired): Promise<ClientResponse> {
  initialize(sgMail);

  const [response] = await sgMail.send(msg);

  return response;
}

export async function upsertContact(data): Promise<ClientResponse> {
  initialize(client);

  const request: ClientRequest = {
    url: '/v3/marketing/contacts',
    method: 'PUT' as HttpMethod,
    body: data,
  };

  const [response] = await client.request(request);

  return response;
}
