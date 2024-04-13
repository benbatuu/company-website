import { HTTPException } from 'hono/http-exception';
import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';

export const getAllCategory = async () => {
    const categories = await pc.servicecategory.findMany({
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

    if (!categories)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_category_not_found' })

    return categories;
}