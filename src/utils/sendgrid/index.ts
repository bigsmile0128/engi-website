import sgMail, { ClientResponse, MailDataRequired } from '@sendgrid/mail';
import client from '@sendgrid/client';
import { ClientRequest } from '@sendgrid/client/src/request';
import { HttpMethod } from '@sendgrid/helpers/classes/request';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
client.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function sendMail(msg: MailDataRequired): Promise<ClientResponse> {
  try {
    const [response] = await sgMail.send(msg);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function upsertContact(data): Promise<ClientResponse> {
  const request: ClientRequest = {
    url: `/v3/marketing/contacts`,
    method: 'PUT' as HttpMethod,
    body: data,
  };

  try {
    const [response] = await client.request(request);
    return response;
  } catch (error) {
    throw error;
  }
}