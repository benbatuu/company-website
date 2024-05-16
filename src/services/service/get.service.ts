import { HTTPException } from 'hono/http-exception';
import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';

export const getSingleService = async (serviceID: number) => {

    const isServiceExist = await pc.service.findUnique({ where: { id: serviceID } });

    if (!isServiceExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_not_found' })

    const service = await pc.service.findUnique({
        select: {
            id: true,
            name: true,
            description: true,
            isactive: true,
            servicecategory: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    isactive: true,
                }
            }
        },
        where: { id: serviceID },
    });

    if (!service)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_not_found' })

    return service;
}