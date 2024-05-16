import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";
import ServiceStatus from "types/enums/servicestatus";

export const createBlogCategory = async (
  name: string,
  description: string,
  featuredImage: string,
  metaID: number,
  userID: number
) => {
  const blogCategoryExists = await pc.blogcategory.findFirst({
    where: { name },
  });

  if (blogCategoryExists)
    throw new HTTPException(HttpStatusCode.BAD_REQUEST, {
      message: "blog_category_already_exists",
    });

  const blogCategory = await pc.blogcategory.create({
    data: {
      name: name,
      description: description,
      featuredimage: featuredImage,
      metaid: metaID,
      createdby: userID,
      createdat: new Date(),
      isactive: ServiceStatus.ACTIVE,
    },
  });

  if (!blogCategory)
    throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
      message: "blog_category_not_created",
    });

  return blogCategory;
};
