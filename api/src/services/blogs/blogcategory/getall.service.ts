import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";

export const getAllBlogCategories = async (status?: number) => {
    if (status) {
        const blogCategories = await pc.blogcategory.findMany({
            where: {
                isactive: status,
            }
        });

        if (!blogCategories)
            throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'active_blog_categories_not_found' });

        return blogCategories;
    }

    const blogCategories = await pc.blogcategory.findMany();

    if (!blogCategories)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_categories_not_found' });

    return blogCategories;
}