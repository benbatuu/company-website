import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";
import ServiceStatus from "types/enums/servicestatus";

export const deleteBlogCategory = async (id: number) => {
    const isBlogCategoryExists = await pc.blogcategory.findUnique({ where: { id } });

    if (!isBlogCategoryExists)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_category_not_found' });

    return pc.blogcategory.delete({ where: { id } });
}