import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const activeContact = async (id: number, userID: number) => {

    const isContactExist = await pc.contact.findFirst({ where: { id: id } });

    if (!isContactExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'contact_not_found' });

    if (isContactExist?.isclosed === ServiceStatus.ACTIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'contact_already_open' });

    const contact = await pc.contact.update({
        where: { id: id },
        data: {
            isclosed: ServiceStatus.ACTIVE,
            updatedat: new Date(),
            updatedby: userID
        }
    });

    if (!contact)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'contact_not_opened' })

    return contact;
}