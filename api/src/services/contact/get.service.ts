import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getSingleContactForm = async (id: number) => {

    const contactForm = await pc.contact.findFirst({ where: { id: id } });

    if (!contactForm)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'contact_form_not_found' });

    return contactForm;
}