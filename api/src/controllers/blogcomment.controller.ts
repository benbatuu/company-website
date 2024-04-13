import { env } from 'bun';
import { Hono } from 'hono';
import { verify as jwtverify } from 'hono/jwt';
// Blog Comment Services
import { getSingleBlogComment } from "services/blogs/blogcomment/get.service";
import { getAllBlogComments } from "services/blogs/blogcomment/getall.service";
import { createBlogComment } from "services/blogs/blogcomment/create.service";
import { updateBlogComment } from "services/blogs/blogcomment/update.service";
import { archiveBlogComment } from "services/blogs/blogcomment/archive.service";
import { activeBlogComment } from "services/blogs/blogcomment/active.service";
import { deleteBlogComment } from "services/blogs/blogcomment/delete.service";
// Helpers
import checkPermission from 'helpers/permission.middleware';

const blogCommentController = new Hono();

blogCommentController.get('/', checkPermission(["blogcomment:view"]), async (c) => {
    const allBlogComments = await getAllBlogComments();
    return c.json(allBlogComments);
});

blogCommentController.get("/:blogID/:commentID", checkPermission(["blogcomment:view"]), async (c) => {
    const blogID = c.req.param("blogID");
    const commentID = c.req.param("commentID");
    const singleBlogComment = await getSingleBlogComment(parseInt(blogID), parseInt(commentID));
    return c.json(singleBlogComment);
});

blogCommentController.post("/:blogID", checkPermission(["blogcomment:create"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const blogID = c.req.param("blogID");
    const { name, email, content, } = await c.req.json();
    const blogComment = await createBlogComment(parseInt(blogID), name, email, content, createdby);
    return c.json(blogComment);
});

blogCommentController.put("/:blogID/:commentID", checkPermission(["blogcomment:update"]), async (c) => {
    const blogID = c.req.param("blogID");
    const commentID = c.req.param("commentID");
    const { content } = await c.req.json();
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const blogComment = await updateBlogComment(parseInt(blogID), parseInt(commentID), content, updatedby);
    return c.json(blogComment);
});

blogCommentController.put("/:blogID/:commentID/archive", checkPermission(["blogcomment:changestatus"]), async (c) => {
    const blogID = c.req.param("blogID");
    const commentID = c.req.param("commentID");
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const blogComment = await archiveBlogComment(parseInt(blogID), parseInt(commentID), updatedby);
    return c.json(blogComment);
});

blogCommentController.put("/:blogID/:commentID/activate", checkPermission(["blogcomment:changestatus"]), async (c) => {
    const blogID = c.req.param("blogID");
    const commentID = c.req.param("commentID");
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const blogComment = await activeBlogComment(parseInt(blogID), parseInt(commentID), updatedby);
    return c.json(blogComment);
});

blogCommentController.delete("/:blogID/:commentID", checkPermission(["blogcomment:delete"]), async (c) => {
    const commentID = c.req.param("commentID");
    const blogComment = await deleteBlogComment(parseInt(commentID));
    return c.json(blogComment);
});

export default blogCommentController;