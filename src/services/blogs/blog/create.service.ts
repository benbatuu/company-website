import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";
import ServiceStatus from "types/enums/servicestatus";
import { slugify } from "helpers/helpers";

export const createBlog = async (
  title: string,
  content: object,
  featuredimage: string,
  blogCategoryID: number,
  metaid: number,
  userID: number
) => {
  const isExistBlog = await pc.blog.findFirst({ where: { title: title } });
  const isExistBlogCategory = await pc.blogcategory.findFirst({ where: { id: blogCategoryID } });

  if (isExistBlog)
    throw new HTTPException(HttpStatusCode.BAD_REQUEST, {
      message: "blog_already_exist",
    });

  if (!isExistBlogCategory)
    throw new HTTPException(HttpStatusCode.BAD_REQUEST, {
      message: "blog_category_not_exist",
    });

  const blog = await pc.blog.create({
    data: {
      title: title,
      content: content.toString(),
      featuredimage: featuredimage,
      slug: slugify(title, "-"),
      blogcategoryid: blogCategoryID,
      metaid: metaid,
      createdat: new Date(),
      createdby: userID,
      isactive: ServiceStatus.ACTIVE,
    },
  });

  if (!blog)
    throw new HTTPException(HttpStatusCode.BAD_REQUEST, {
      message: "blog_not_created",
    });

  return blog;
};
