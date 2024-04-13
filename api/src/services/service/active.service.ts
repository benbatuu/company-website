import HttpStatusCode from 'types/enums/httpstatuses';
import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const activeService = async (serviceID: number, userID: number) => {

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

    if (isServiceExist.isactive === ServiceStatus.ACTIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_already_active' })

    const service = await pc.service.update({
        where: { id: serviceID },
        data: {
            isactive: ServiceStatus.ACTIVE,
            updatedat: new Date(),
            updatedby: userID
        }
    });

    return service;
}