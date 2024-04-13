import HttpStatusCode from 'types/enums/httpstatuses';
import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';

export const getAllServices = async () => {

    const services = await pc.service.findMany({
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
        }
    });

    if (!services)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_not_found' })

    return services;
}