import pc from '../../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const deleteBlogComment = async (commentID: number) => {
    const blogComment = await pc.blogcomment.findUnique({ where: { id: commentID }, });

    if (!blogComment)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_comment_not_found' });

    await pc.blogcomment.delete({ where: { id: commentID }, });

    return blogComment;
};