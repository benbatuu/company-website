import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";

export const updateBlogComment = async (blogID: number, commentId: number, comment: string, userID: number) => {
    const isCommentExists = await pc.blogcomment.findUnique({
        where: {
            id: commentId,
            blogid: blogID,
        },
    });

    if (!isCommentExists)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, {
            message: "active_blog_comment_not_found",
        });

    const updatedBlogComment = await pc.blogcomment.update({
        where: { id: commentId, blogid: blogID },
        data: {
            comment: comment,
            updatedby: userID,
            updatedat: new Date(),
        },
    });

    if (!updatedBlogComment)
        throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
            message: "blog_comment_not_updated",
        });

    return updatedBlogComment;
};
