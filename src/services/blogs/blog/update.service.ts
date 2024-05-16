import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';
import { slugify } from 'helpers/helpers';

export const updateBlog = async (
    id: number,
    title: string,
    content: string,
    featuredimage: string,
    blogcategoryid: number,
    metaid: number,
    userID: number
) => {

    const isBlogExist = await pc.blog.findFirst({ where: { id: id } });

    if (!isBlogExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_not_found' });

    if (isBlogExist?.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_not_active' });

    const blog = await pc.blog.update({
        where: { id: id },
        data: {
            title: title,
            content: content,
            featuredimage: featuredimage,
            slug: slugify(title, "-"),
            blogcategoryid: blogcategoryid,
            metaid: metaid,
            updatedat: new Date(),
            updatedby: userID
        }
    });

    if (!blog)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_not_updated' })

    return blog;
}