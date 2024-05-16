import ServiceStatus from 'types/enums/servicestatus';
import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const createCategory = async (name: string, description: string, metaID: number, userID: number) => {

    const isCategoryExist = await pc.servicecategory.findFirst({
        where: {
            name
        }
    });

    if (isCategoryExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: `category_[${name}]_already_exist_please_change_the_category_name` })

    const category = await pc.servicecategory.create({
        data: {
            name: name,
            description: description,
            metaid: metaID,
            createdat: new Date(),
            createdby: userID,
        }
    });

    if (!category)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_category_not_created' });

    return { data: category, message: 'service_category_created' };
}