import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getAllContactForms = async () => {

    const contactForms = await pc.contact.findMany();

    if (!contactForms)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'contact_forms_not_found' });

    return contactForms;
}