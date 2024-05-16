import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";
import ServiceStatus from "types/enums/servicestatus";

export const activeBlogComment = async (blogID: number, commentID: number, userID: number) => {
    const blogComment = await pc.blogcomment.findUnique({ where: { id: commentID, blogid: blogID, }, });

    if (!blogComment)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_comment_not_found' });

    if (blogComment.isactive === ServiceStatus.ACTIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_comment_already_active' });

    await pc.blogcomment.update({
        where: { id: commentID, blogid: blogID },
        data: { isactive: ServiceStatus.ACTIVE }
    });

    return blogComment;
}