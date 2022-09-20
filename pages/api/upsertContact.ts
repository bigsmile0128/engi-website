import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@sendgrid/client';
import { HttpMethod } from '@sendgrid/helpers/classes/request';
import { ClientRequest } from '@sendgrid/client/src/request';
import { SENDGRID_LIST_NAME } from '../../types';

client.setApiKey(process.env.SENDGRID_API_KEY || '');

const mapNameToId: Record<SENDGRID_LIST_NAME, string> = {
  [SENDGRID_LIST_NAME.ENGI_NEWSLETTER]: '3b228e62-867a-4a44-9413-b906adb1f287',
  [SENDGRID_LIST_NAME.CONTACT_US]: '9625f53a-048f-4831-ae03-3d12a0194d0f',
};

async function upsertContact(req: NextApiRequest, res: NextApiResponse) {
  const { email, contact_list_name, first_name, last_name, subject, message } =
    req.body;

  let data;

  if (contact_list_name === SENDGRID_LIST_NAME.CONTACT_US) {
    data = {
      contacts: [
        {
          email,
          first_name,
          last_name,
          custom_fields: {
            e1_T: subject,
            e2_T: message,
          },
        },
      ],
      list_ids: [mapNameToId[contact_list_name]],
    };
  }

  if (contact_list_name === SENDGRID_LIST_NAME.ENGI_NEWSLETTER) {
    data = {
      contacts: [
        {
          email,
        },
      ],
      list_ids: [mapNameToId[contact_list_name]],
    };
  }

  const request: ClientRequest = {
    url: `/v3/marketing/contacts`,
    method: 'PUT' as HttpMethod,
    body: data,
  };

  try {
    const [response] = await client.request(request);

    if (response.statusCode === 202) {
      return res.status(202).end();
    } else {
      return res.status(400).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}

export default upsertContact;
