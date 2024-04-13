import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";

export const updateBlogCategory = async (id: number, name: string, description: string, featuredImage: string, metaID: number, userID: number) => {
    const blogCategory = await pc.blogcategory.findUnique({ where: { id } });

    if (!blogCategory)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'blog_category_not_found' });

    return pc.blogcategory.update({
        where: { id },
        data: {
            name: name,
            description: description,
            featuredimage: featuredImage,
            metaid: metaID,
            updatedby: userID,
            updatedat: new Date(),
        },
    });
}