import { MailDataRequired } from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  mapNameToId,
  mapToTemplateId,
  REPLY_EMAIL,
  TEMPLATE_NAME,
} from '~/utils/sendgrid/constants';
import { sendMail, upsertContact } from '~/utils/sendgrid';

async function subscribeNewsletterApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, contact_list_name } = req.body;

  const data = {
    contacts: [
      {
        email,
      },
    ],
    list_ids: [mapNameToId[contact_list_name]],
  };

  const msg: MailDataRequired = {
    dynamicTemplateData: {
      first_name: 'there',
    },
    from: { email: REPLY_EMAIL },
    personalizations: [
      {
        to: email,
        from: REPLY_EMAIL,
      },
    ],
    templateId: mapToTemplateId[TEMPLATE_NAME.WELCOME_NEWSLETTER],
    to: { email },
  };

  try {
    await upsertContact(data);
    await sendMail(msg);
    return res.status(202).end();
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}

export default subscribeNewsletterApi;
