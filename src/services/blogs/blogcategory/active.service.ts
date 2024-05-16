import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const activeBlogCategory = async (id: number, userID: number) => {
    const blogCategory = await pc.blogcategory.findUnique({ where: { id } });

    if (!blogCategory)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_category_not_found' });

    if (blogCategory?.isactive === ServiceStatus.ACTIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_category_already_active' });


    return pc.blogcategory.update({
        where: { id, },
        data: {
            updatedat: new Date(),
            updatedby: userID,
            isactive: ServiceStatus.ACTIVE,
        },
    });
}