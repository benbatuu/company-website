import HttpStatusCode from 'types/enums/httpstatuses';
import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const updateCategory = async (categoryID: number, name: string, description: string, metaID: number, userID: number) => {

    const isCategoryExist = await pc.servicecategory.findUnique({ where: { id: categoryID } });

    if (!isCategoryExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_category_not_found' })

    if (isCategoryExist?.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_category_already_passive_first_active_the_category' });

    const category = await pc.servicecategory.update({
        where: { id: categoryID },
        data: {
            name: name,
            description: description,
            metaid: metaID,
            updatedby: userID,
            updatedat: new Date(),
        }
    });

    return { data: category, message: 'service_category_updated' };
}