import { JsonObject } from '@prisma/client/runtime/library';
import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from 'types/enums/httpstatuses';
// Enum
import ServiceStatus from 'types/enums/servicestatus';

export const createService = async (name: string, description: JsonObject, serviceCategoryID: number, userID: number) => {
    const service = await pc.service.create({
        data: {
            name: name,
            description: description,
            createdby: userID,
            createdat: new Date(),
            isactive: ServiceStatus.ACTIVE,
            servicecategory: {
                connect: {
                    id: serviceCategoryID,
                    createdat: new Date(),
                    createdby: userID,
                    isactive: ServiceStatus.ACTIVE,
                }
            }
        }
    });

    if (!service)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_not_created' })

    return service;
}