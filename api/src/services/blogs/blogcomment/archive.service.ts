import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";
import ServiceStatus from "types/enums/servicestatus";

export const archiveBlogComment = async (blogID: number, commentID: number, userID: number) => {
    const blogComment = await pc.blogcomment.findUnique({ where: { id: commentID, blogid: blogID }, });

    if (!blogComment)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_comment_not_found' });

    if (blogComment.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'blog_comment_already_archived' });

    await pc.blogcomment.update({
        where: { id: commentID, blogid: blogID },
        data: {
            updatedby: userID,
            updatedat: new Date(),
            isactive: ServiceStatus.PASSIVE
        }
    });

    return blogComment;
}