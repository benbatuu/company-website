import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";

export const getSingleBlogCategory = async (id: number, status?: number) => {
    if (status) {
        const blogCategory = await pc.blogcategory.findUnique({
            where: {
                id: id,
                isactive: status,
            }
        });

        if (!blogCategory)
            throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'active_blog_category_not_found' });

        return blogCategory;
    }

    const blogCategory = await pc.blogcategory.findUnique({ where: { id } });

    if (!blogCategory)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_category_not_found' });

    return blogCategory;
}