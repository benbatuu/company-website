import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const getSingleBlog = async (id: number) => {

    const isExistBlog = await pc.blog.findFirst({ where: { id: id } });

    if (!isExistBlog)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_not_found' });

    if (isExistBlog?.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_not_active' });

    const blog = await pc.blog.findFirst({
        where: { id: id },
        select: {
            id: true,
            title: true,
            content: true,
            featuredimage: true,
            slug: true,
            blogcategory: {
                select: {
                    id: true,
                    name: true,
                    description: true
                }
            },
            blogmeta: {
                select: {
                    id: true,
                    metaauthor: true,
                    metadescription: true,
                    metahttpequiv: true,
                    metakeywords: true,
                    metalanguage: true,
                    metarobots: true,
                    metarevisit: true,
                    metatitle: true,
                }
            },
            blogcomments: {
                select: {
                    blogid: true,
                    name: true,
                    email: true,
                    comment: true,
                }
            },
            createdat: true,
            createdby: true,
            isactive: true
        },
    });

    if (!blog)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_not_found' });

    return blog;
}