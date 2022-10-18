import { MailDataRequired } from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  mapNameToId,
  mapToTemplateId,
  CONTACT_REPLY_EMAIL,
  TEMPLATE_NAME,
} from '~/utils/sendgrid/constants';
import { upsertContact, sendMail } from '~/utils/sendgrid';

async function contactUsApi(req: NextApiRequest, res: NextApiResponse) {
  const { email, contact_list_name, first_name, last_name, subject, message } =
    req.body;

  const data = {
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

  const msg: MailDataRequired = {
    dynamicTemplateData: {
      first_name,
      subject,
    },
    from: { email: CONTACT_REPLY_EMAIL },
    personalizations: [
      {
        to: email,
        from: CONTACT_REPLY_EMAIL,
      },
    ],
    templateId: mapToTemplateId[TEMPLATE_NAME.CONTACT_US_REPLY],
    to: { email },
  };

  try {
    await upsertContact(data);
    await sendMail(msg);

    return res.status(202).end();
  } catch (error) {
    return res.status(400).end();
  }
}

export default contactUsApi;
