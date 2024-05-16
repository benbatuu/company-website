import HttpStatusCode from 'types/enums/httpstatuses';
import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';

export const getSingleCategory = async (categoryID: number) => {

    const isCategoryExist = await pc.servicecategory.findUnique({ where: { id: categoryID } });

    if (!isCategoryExist) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_category_not_found' })

    const category = await pc.servicecategory.findUnique({
        where: { id: categoryID },
        select: {
            id: true,
            name: true,
            description: true,
            isactive: true,
            createdat: true,
            updatedat: true,
            createdby: true,
            updatedby: true
        }
    });

    return category;
}