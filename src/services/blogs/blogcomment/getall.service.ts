import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";

export const getAllBlogComments = async () => {
    const blogComments = await pc.blogcomment.findMany();

    if (!blogComments)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_comments_not_found' });

    return blogComments;
}