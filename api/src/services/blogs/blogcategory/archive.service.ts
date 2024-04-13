import pc from '../../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from 'types/enums/httpstatuses';
import ServiceStatus from 'types/enums/servicestatus';

export const archiveBlogCategory = async (id: number, userID: number) => {
    const blogCategory = await pc.blogcategory.findUnique({ where: { id } });

    if (!blogCategory)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_category_not_found' });

    if (blogCategory?.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_category_already_archived' });

    return pc.blogcategory.update({
        where: { id, },
        data: {
            updatedby: userID,
            updatedat: new Date(),
            isactive: ServiceStatus.PASSIVE,
        },
    });
}