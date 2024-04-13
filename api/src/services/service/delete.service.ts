import { HTTPException } from 'hono/http-exception';
import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';

export const deleteService = async (serviceID: number) => {

    const isServiceExist = await pc.service.findUnique({ where: { id: serviceID } });

    if (!isServiceExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_not_found' })

    const service = await pc.service.delete({
        where: { id: serviceID },
    });

    if (!service)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_not_deleted' })

    return service;
}