import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const archiveCategory = async (categoryID: number, userID: number) => {

    const isCategoryExist = await pc.servicecategory.findUnique({
        where: { id: categoryID },
        select: { isactive: true }
    });

    if (!isCategoryExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_category_not_found' })

    if (isCategoryExist.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_category_already_archived' })

    const category = await pc.servicecategory.update({
        where: { id: categoryID },
        data: {
            isactive: ServiceStatus.PASSIVE,
            updatedat: new Date(),
            updatedby: userID,
        }
    });

    return category;
}