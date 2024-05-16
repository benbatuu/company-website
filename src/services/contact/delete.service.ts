import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const deleteContact = async (id: number) => {

    const isContactExist = await pc.contact.findFirst({ where: { id: id } });

    if (!isContactExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'contact_not_found' });

    const contact = await pc.contact.delete({
        where: { id: id }
    });

    if (!contact)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'contact_not_deleted' })

    return contact;
}