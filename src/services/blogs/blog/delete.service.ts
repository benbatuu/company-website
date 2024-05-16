import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const deleteBlog = async (id: number) => {

    const isBlogExist = await pc.blog.findFirst({ where: { id: id } });

    if (!isBlogExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_not_found' });

    const deleteBlog = await pc.blog.delete({
        where: { id: id }
    });

    const deleteBlogCategory = await pc.blogcategory.deleteMany({
        where: {
            blogs: {
                some: { id: deleteBlog.id }
            }
        }
    });

    const deleteBlogMeta = await pc.meta.deleteMany({
        where: {
            blog: {
                some: { id: deleteBlog.id }
            }
        }
    });

    const deleteBlogComments = await pc.blogcomment.deleteMany({
        where: {
            blogid: deleteBlog.id
        }
    });

    if (!deleteBlog)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: `${id}_blog_doesnt_deleted` })

    if (!deleteBlogCategory)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blogcategory_not_deleted' })

    if (!deleteBlogMeta)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blogmeta_not_deleted' })

    if (!deleteBlogComments)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blogcomments_not_deleted' })

    return deleteBlog;
}