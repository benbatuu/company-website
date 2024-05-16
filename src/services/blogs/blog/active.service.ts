import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const activeBlog = async (id: number, userID: number) => {

    const isBlogExist = await pc.blog.findFirst({ where: { id: id } });

    if (!isBlogExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_not_found' });

    if (isBlogExist?.isactive === ServiceStatus.ACTIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_already_inactive' });

    const blog = await pc.blog.update({
        where: { id: id },
        data: {
            isactive: ServiceStatus.ACTIVE,
            updatedat: new Date(),
            updatedby: userID
        }
    });

    if (!blog)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'offer_not_inactive' })

    return blog;
}