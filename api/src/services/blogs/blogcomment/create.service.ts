import pc from "../../../helpers/prismaclient.singleton";
import HttpStatusCode from "types/enums/httpstatuses";
import { HTTPException } from "hono/http-exception";
import ServiceStatus from "types/enums/servicestatus";

export const createBlogComment = async (
  blogId: number,
  name: string,
  email: string,
  comment: string,
  userId: number
) => {
  const isBlogExists = await pc.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  if (!isBlogExists)
    throw new HTTPException(HttpStatusCode.NOT_FOUND, {
      message: "blog_not_found",
    });

  const blogComment = await pc.blogcomment.create({
    data: {
      blogid: blogId,
      name: name,
      email: email,
      createdby: userId,
      createdat: new Date(),
      comment: comment,
      isactive: ServiceStatus.PASSIVE,
    },
  });

  if (!blogComment)
    throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
      message: "blog_comment_not_created",
    });

  return blogComment;
};
