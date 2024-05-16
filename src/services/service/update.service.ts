import { HTTPException } from 'hono/http-exception';
import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import ServiceStatus from 'types/enums/servicestatus';

export const updateService = async (serviceID: number, name: string, description: string, serviceCategoryID: number, userID: number) => {

    const isServiceExist = await pc.service.findUnique({ where: { id: serviceID } });

    if (!isServiceExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_not_found' })

    if (isServiceExist?.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_already_passive_first_active_the_service' });

    const service = await pc.service.update({
        where: { id: serviceID },
        data: {
            name: name,
            description: description,
            updatedby: userID,
            updatedat: new Date(),
            servicecategory: {
                connect: {
                    id: serviceCategoryID,
                    updatedat: new Date(),
                    updatedby: userID,
                }
            }
        }
    });

    return { data: service, message: 'service_updated' };
}