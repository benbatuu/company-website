import { Hono } from "hono";
import { env } from "bun";
import { verify as jwtverify } from "hono/jwt";
// Blog Services
import { createBlog } from "services/blogs/blog/create.service";
import { getAllBlogs } from "services/blogs/blog/getall.service";
import { getSingleBlog } from "services/blogs/blog/get.service";
import { updateBlog } from "services/blogs/blog/update.service";
import { archiveBlog } from "services/blogs/blog/archive.service";
import { activeBlog } from "services/blogs/blog/active.service";
import { deleteBlog } from "services/blogs/blog/delete.service";
// Blog Category Services
import { getAllBlogCategories } from "services/blogs/blogcategory/getall.service";
import { createBlogCategory } from "services/blogs/blogcategory/create.service";
import { getSingleBlogCategory } from "services/blogs/blogcategory/get.service";
import { updateBlogCategory } from "services/blogs/blogcategory/update.service";
import { archiveBlogCategory } from "services/blogs/blogcategory/archive.service";
import { activeBlogCategory } from "services/blogs/blogcategory/active.service";
import { deleteBlogCategory } from "services/blogs/blogcategory/delete.service";
// Permission Middleware
import checkPermission from "helpers/permission.middleware";

const blogController = new Hono();

// Blog

blogController.get("/", checkPermission(["blog:view"]), async (c) => {
    const allBlogs = await getAllBlogs();
    return c.json(allBlogs);
});

blogController.get("/:id", checkPermission(["blog:view"]), async (c) => {
    const userID = c.req.param("id");
    const singleBlog = await getSingleBlog(parseInt(userID));
    return c.json(singleBlog);
});

blogController.post("/", checkPermission(["blog:create"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const {
        title,
        content,
        featuredimage,
        blogCategoryID,
        metaid,
    } = await c.req.json();
    const blog = await createBlog(
        title,
        content,
        featuredimage,
        blogCategoryID,
        metaid,
        createdby
    );
    return c.json(blog);
});

blogController.put("/:id", checkPermission(["blog:update"]), async (c) => {
    const userID = c.req.param("id");
    const {
        title,
        content,
        featuredimage,
        blogCategoryID,
        metaid,
    } = await c.req.json();
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const blog = await updateBlog(
        parseInt(userID),
        title,
        content,
        featuredimage,
        blogCategoryID,
        metaid,
        updatedby
    );
    return c.json(blog);
});

blogController.put("/:id/archive", checkPermission(["blog:changestatus"]), async (c) => {
    const userID = c.req.param("id");
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const blog = await archiveBlog(parseInt(userID), updatedby);
    return c.json(blog);
}
);

blogController.put("/:id/activate", checkPermission(["blog:changestatus"]), async (c) => {
    const userID = c.req.param("id");
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const blog = await activeBlog(parseInt(userID), updatedby);
    return c.json(blog);
}
);

blogController.delete("/:id", checkPermission(["blog:delete"]), async (c) => {
    const blogID = c.req.param("id");
    const blog = await deleteBlog(parseInt(blogID));
    return c.json(blog);
});

// Blog Comment

// Blog Category

blogController.get("/categories", checkPermission(["blogcategory:view"]), async (c) => {
    const allBlogCategories = await getAllBlogCategories();
    return c.json(allBlogCategories);
});

blogController.get("/categories/:id", checkPermission(["blogcategory:view"]), async (c) => {
    const body = await c.req.json();
    if (body.status) {
        const allBlogCategories = await getAllBlogCategories(body.status);
        return c.json(allBlogCategories);
    }
    const userID = c.req.param("id");
    const singleBlogCategory = await getSingleBlogCategory(parseInt(userID));
    return c.json(singleBlogCategory);
});

blogController.post("/categories", checkPermission(["blogcategory:create"]), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const { name, description, featuredImage, metaID } = await c.req.json();
    const blogCategory = await createBlogCategory(name, description, featuredImage, metaID, createdby);
    return c.json(blogCategory);
});

blogController.put("/categories/:id", checkPermission(["blogcategory:update"]), async (c) => {
    const categoryID = c.req.param("id");
    const { name, description, featuredImage, metaID } = await c.req.json();
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const blogCategory = await updateBlogCategory(parseInt(categoryID), name, description, featuredImage, metaID, updatedby);
    return c.json(blogCategory);
});

blogController.put("/categories/:id/archive", checkPermission(["blogcategory:changestatus"]), async (c) => {
    const userID = c.req.param("id");
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const blogCategory = await archiveBlogCategory(parseInt(userID), updatedby);
    return c.json(blogCategory);
});

blogController.put("/categories/:id/activate", checkPermission(["blogcategory:changestatus"]), async (c) => {
    const categoryID = c.req.param("id");
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(" ")[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const blogCategory = await activeBlogCategory(parseInt(categoryID), updatedby);
    return c.json(blogCategory);
});

blogController.delete("/categories/:id", checkPermission(["blogcategory:delete"]), async (c) => {
    const categoryID = c.req.param("id");
    const blogCategory = await deleteBlogCategory(parseInt(categoryID));
    return c.json(blogCategory);
});

export default blogController;
