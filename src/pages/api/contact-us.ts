import { MailDataRequired } from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  mapNameToId,
  mapToTemplateId,
  REPLY_EMAIL,
  TEMPLATE_NAME,
} from '~/utils/constants/sendgrid';
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
    personalizations: [
      {
        to: email,
        from: REPLY_EMAIL,
      },
    ],
    to: { email },
    from: { email: REPLY_EMAIL },
    templateId: mapToTemplateId[TEMPLATE_NAME.CONTACT_US_REPLY],
    dynamicTemplateData: {
      first_name,
      subject,
    },
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