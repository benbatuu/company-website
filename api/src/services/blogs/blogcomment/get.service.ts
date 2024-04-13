import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";

export const getSingleBlogComment = async (blogID: number, commentID: number, status?: number) => {
    if (status) {
        const blogComment = await pc.blogcomment.findUnique({
            where: {
                id: commentID,
                isactive: status,
            }
        });

        if (!blogComment)
            throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'active_blog_comment_not_found' });

        return blogComment;
    }

    const blogComment = await pc.blogcomment.findUnique({
        where: {
            id: commentID,
            blogid: blogID,
        }
    });

    if (!blogComment)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_comment_not_found' });

    return blogComment;
}