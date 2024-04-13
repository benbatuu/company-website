import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const createContact = async (
    name: string,
    email: string,
    phone: string,
    message: string,
    userID: number,
    serviceCategory: number,
    service: number,
) => {

    const contact = await pc.contact.create({
        data: {
            name: name,
            email: email,
            phone: phone,
            message: message,
            createdby: userID,
            isclosed: ServiceStatus.PASSIVE,
            servicecategory: {
                connect: {
                    id: serviceCategory
                }
            },
            service: {
                connect: {
                    id: service
                }
            }
        }
    });

    if (!contact)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'contact_not_created' })

    return contact;
}