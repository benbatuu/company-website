import ServiceStatus from 'types/enums/servicestatus';
import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const archiveService = async (serviceID: number, userID: number) => {

    const isServiceExist = await pc.service.findUnique({
        where: {
            id: serviceID
        },
        select: {
            isactive: true
        }
    });

    if (!isServiceExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_not_found' })

    if (isServiceExist.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_already_archived' })

    const service = await pc.service.update({
        where: { id: serviceID },
        data: {
            isactive: ServiceStatus.PASSIVE,
            updatedat: new Date(),
            updatedby: userID
        }
    });

    return service;
}