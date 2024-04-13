import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getAllBlogs = async () => {

    const blogs = await pc.blog.findMany({
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

    if (!blogs)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_not_found' })

    return blogs;
}