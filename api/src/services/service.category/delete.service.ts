import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const deleteCategory = async (categoryID: number) => {

    const isCategoryExist = await pc.servicecategory.findUnique({ where: { id: categoryID } });

    if (!isCategoryExist) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'service_category_not_found' })

    const category = await pc.servicecategory.delete({
        where: { id: categoryID }
    });

    return category;
}