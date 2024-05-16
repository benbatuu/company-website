-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "blogs";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "contacts";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "metatags";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "offers";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pages";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "services";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "transactions";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "users";

-- CreateTable
CREATE TABLE "blogs"."blogcomment" (
    "id" SERIAL NOT NULL,
    "blogid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "isactive" INTEGER NOT NULL,

    CONSTRAINT "blogcomment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs"."blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "featuredimage" TEXT NOT NULL,
    "blogcategoryid" INTEGER NOT NULL,
    "metaid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "isactive" INTEGER NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs"."blogcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "featuredimage" TEXT NOT NULL,
    "metaid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "isactive" INTEGER NOT NULL,

    CONSTRAINT "blogcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metatags"."meta" (
    "id" SERIAL NOT NULL,
    "metatitle" TEXT NOT NULL,
    "metadescription" TEXT NOT NULL,
    "metakeywords" TEXT NOT NULL,
    "metarobots" TEXT NOT NULL,
    "metahttpequiv" TEXT NOT NULL,
    "metalanguage" TEXT NOT NULL,
    "metaauthor" TEXT NOT NULL,
    "metarevisit" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,

    CONSTRAINT "meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers"."offer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "saleprice" DOUBLE PRECISION NOT NULL,
    "salepricecurrency" TEXT NOT NULL,
    "salepriceperiod" TIMESTAMP(3) NOT NULL,
    "discountprice" DOUBLE PRECISION NOT NULL,
    "discountamount" DOUBLE PRECISION NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "isactive" INTEGER NOT NULL,
    "serviceid" INTEGER NOT NULL,

    CONSTRAINT "offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts"."newsletter" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,

    CONSTRAINT "newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts"."contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "attachment" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "isclosed" INTEGER NOT NULL,
    "servicecategoryid" INTEGER NOT NULL,
    "serviceid" INTEGER NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages"."page" (
    "id" SERIAL NOT NULL,
    "metaid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "isactive" INTEGER NOT NULL,
    "serviceid" INTEGER NOT NULL,

    CONSTRAINT "page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services"."servicecategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metaid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "isactive" INTEGER NOT NULL,

    CONSTRAINT "servicecategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services"."service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "servicecategoryid" INTEGER NOT NULL,
    "metaid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "isactive" INTEGER NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions"."entrance" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "useragent" TEXT NOT NULL,
    "ipaddress" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entrance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."apiclient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedat" TIMESTAMP(3),
    "updatedby" INTEGER,
    "isactive" BOOLEAN NOT NULL,

    CONSTRAINT "apiclient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."refreshtoken" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3),
    "expiresat" TIMESTAMP(3),

    CONSTRAINT "refreshtoken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."revokedtoken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "revokedtoken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),
    "issystemrole" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."notification" (
    "id" SERIAL NOT NULL,
    "touserid" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readedat" TIMESTAMP(3),

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."rolepermission" (
    "id" SERIAL NOT NULL,
    "roleid" INTEGER NOT NULL,
    "permissionid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdby" INTEGER NOT NULL,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),

    CONSTRAINT "rolepermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."user" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."userpermission" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "permissionid" INTEGER NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),

    CONSTRAINT "userpermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"."userrole" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "roleid" INTEGER NOT NULL,
    "createdby" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedby" INTEGER,
    "updatedat" TIMESTAMP(3),

    CONSTRAINT "userrole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apiclient_key_key" ON "users"."apiclient"("key");

-- CreateIndex
CREATE UNIQUE INDEX "apiclient_secret_key" ON "users"."apiclient"("secret");

-- CreateIndex
CREATE UNIQUE INDEX "revokedtoken_token_key" ON "users"."revokedtoken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "permission_value_key" ON "users"."permission"("value");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "users"."user"("email");

-- AddForeignKey
ALTER TABLE "blogs"."blogcomment" ADD CONSTRAINT "blogcomment_blogid_fkey" FOREIGN KEY ("blogid") REFERENCES "blogs"."blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs"."blog" ADD CONSTRAINT "blog_blogcategoryid_fkey" FOREIGN KEY ("blogcategoryid") REFERENCES "blogs"."blogcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs"."blog" ADD CONSTRAINT "blog_metaid_fkey" FOREIGN KEY ("metaid") REFERENCES "metatags"."meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs"."blogcategory" ADD CONSTRAINT "blogcategory_metaid_fkey" FOREIGN KEY ("metaid") REFERENCES "metatags"."meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers"."offer" ADD CONSTRAINT "offer_serviceid_fkey" FOREIGN KEY ("serviceid") REFERENCES "services"."service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers"."offer" ADD CONSTRAINT "offer_id_fkey" FOREIGN KEY ("id") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts"."contact" ADD CONSTRAINT "contact_servicecategoryid_fkey" FOREIGN KEY ("servicecategoryid") REFERENCES "services"."servicecategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts"."contact" ADD CONSTRAINT "contact_serviceid_fkey" FOREIGN KEY ("serviceid") REFERENCES "services"."service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts"."contact" ADD CONSTRAINT "contact_id_fkey" FOREIGN KEY ("id") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages"."page" ADD CONSTRAINT "page_serviceid_fkey" FOREIGN KEY ("serviceid") REFERENCES "services"."service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages"."page" ADD CONSTRAINT "page_id_fkey" FOREIGN KEY ("id") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages"."page" ADD CONSTRAINT "page_metaid_fkey" FOREIGN KEY ("metaid") REFERENCES "metatags"."meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services"."servicecategory" ADD CONSTRAINT "servicecategory_id_fkey" FOREIGN KEY ("id") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services"."servicecategory" ADD CONSTRAINT "servicecategory_metaid_fkey" FOREIGN KEY ("metaid") REFERENCES "metatags"."meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services"."service" ADD CONSTRAINT "service_servicecategoryid_fkey" FOREIGN KEY ("servicecategoryid") REFERENCES "services"."servicecategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services"."service" ADD CONSTRAINT "service_id_fkey" FOREIGN KEY ("id") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services"."service" ADD CONSTRAINT "service_metaid_fkey" FOREIGN KEY ("metaid") REFERENCES "metatags"."meta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."apiclient" ADD CONSTRAINT "apiclient_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."apiclient" ADD CONSTRAINT "apiclient_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."refreshtoken" ADD CONSTRAINT "refreshtoken_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."role" ADD CONSTRAINT "role_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."role" ADD CONSTRAINT "role_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."notification" ADD CONSTRAINT "notification_touserid_fkey" FOREIGN KEY ("touserid") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."permission" ADD CONSTRAINT "permission_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."permission" ADD CONSTRAINT "permission_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."rolepermission" ADD CONSTRAINT "rolepermission_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."rolepermission" ADD CONSTRAINT "rolepermission_permissionid_fkey" FOREIGN KEY ("permissionid") REFERENCES "users"."permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."rolepermission" ADD CONSTRAINT "rolepermission_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "users"."role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."rolepermission" ADD CONSTRAINT "rolepermission_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."user" ADD CONSTRAINT "user_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."user" ADD CONSTRAINT "user_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userpermission" ADD CONSTRAINT "userpermission_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userpermission" ADD CONSTRAINT "userpermission_permissionid_fkey" FOREIGN KEY ("permissionid") REFERENCES "users"."permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userpermission" ADD CONSTRAINT "userpermission_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userpermission" ADD CONSTRAINT "userpermission_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userrole" ADD CONSTRAINT "userrole_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userrole" ADD CONSTRAINT "userrole_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "users"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userrole" ADD CONSTRAINT "userrole_updatedby_fkey" FOREIGN KEY ("updatedby") REFERENCES "users"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."userrole" ADD CONSTRAINT "userrole_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
