
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.12.1
 * Query Engine version: 79fb5193cf0a8fdbef536e4b4a159cad677ab1b9
 */
Prisma.prismaVersion = {
  client: "5.12.1",
  engine: "79fb5193cf0a8fdbef536e4b4a159cad677ab1b9"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.BlogcommentScalarFieldEnum = {
  id: 'id',
  blogid: 'blogid',
  name: 'name',
  email: 'email',
  comment: 'comment',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby',
  isactive: 'isactive'
};

exports.Prisma.BlogScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  slug: 'slug',
  featuredimage: 'featuredimage',
  blogcategoryid: 'blogcategoryid',
  metaid: 'metaid',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby',
  isactive: 'isactive'
};

exports.Prisma.BlogcategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  featuredimage: 'featuredimage',
  metaid: 'metaid',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby',
  isactive: 'isactive'
};

exports.Prisma.MetaScalarFieldEnum = {
  id: 'id',
  metatitle: 'metatitle',
  metadescription: 'metadescription',
  metakeywords: 'metakeywords',
  metarobots: 'metarobots',
  metahttpequiv: 'metahttpequiv',
  metalanguage: 'metalanguage',
  metaauthor: 'metaauthor',
  metarevisit: 'metarevisit',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby'
};

exports.Prisma.OfferScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  saleprice: 'saleprice',
  salepricecurrency: 'salepricecurrency',
  salepriceperiod: 'salepriceperiod',
  discountprice: 'discountprice',
  discountamount: 'discountamount',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby',
  isactive: 'isactive',
  serviceid: 'serviceid'
};

exports.Prisma.NewsletterScalarFieldEnum = {
  id: 'id',
  email: 'email',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby'
};

exports.Prisma.ContactScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  message: 'message',
  attachment: 'attachment',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby',
  isclosed: 'isclosed',
  servicecategoryid: 'servicecategoryid',
  serviceid: 'serviceid'
};

exports.Prisma.PageScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  content: 'content',
  serviceid: 'serviceid',
  metaid: 'metaid',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby',
  isactive: 'isactive'
};

exports.Prisma.ServicecategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  metaid: 'metaid',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby',
  isactive: 'isactive'
};

exports.Prisma.ServiceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  servicecategoryid: 'servicecategoryid',
  metaid: 'metaid',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby',
  isactive: 'isactive'
};

exports.Prisma.EntranceScalarFieldEnum = {
  id: 'id',
  type: 'type',
  useragent: 'useragent',
  ipaddress: 'ipaddress',
  userid: 'userid',
  createdat: 'createdat'
};

exports.Prisma.ApiclientScalarFieldEnum = {
  id: 'id',
  name: 'name',
  key: 'key',
  secret: 'secret',
  type: 'type',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedat: 'updatedat',
  updatedby: 'updatedby',
  isactive: 'isactive'
};

exports.Prisma.RefreshtokenScalarFieldEnum = {
  id: 'id',
  userid: 'userid',
  token: 'token',
  createdat: 'createdat',
  updatedat: 'updatedat',
  expiresat: 'expiresat'
};

exports.Prisma.RevokedtokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  date: 'date'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdby: 'createdby',
  createdat: 'createdat',
  updatedby: 'updatedby',
  updatedat: 'updatedat',
  issystemrole: 'issystemrole'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  touserid: 'touserid',
  message: 'message',
  url: 'url',
  createdby: 'createdby',
  createdat: 'createdat',
  readedat: 'readedat'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  value: 'value',
  group: 'group',
  description: 'description',
  createdby: 'createdby',
  createdat: 'createdat',
  updatedby: 'updatedby',
  updatedat: 'updatedat'
};

exports.Prisma.RolepermissionScalarFieldEnum = {
  id: 'id',
  roleid: 'roleid',
  permissionid: 'permissionid',
  createdat: 'createdat',
  createdby: 'createdby',
  updatedby: 'updatedby',
  updatedat: 'updatedat'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  firstname: 'firstname',
  lastname: 'lastname',
  phone: 'phone',
  email: 'email',
  password: 'password',
  createdby: 'createdby',
  createdat: 'createdat',
  updatedby: 'updatedby',
  updatedat: 'updatedat',
  status: 'status'
};

exports.Prisma.UserpermissionScalarFieldEnum = {
  id: 'id',
  userid: 'userid',
  permissionid: 'permissionid',
  createdby: 'createdby',
  createdat: 'createdat',
  updatedby: 'updatedby',
  updatedat: 'updatedat'
};

exports.Prisma.UserroleScalarFieldEnum = {
  id: 'id',
  userid: 'userid',
  roleid: 'roleid',
  createdby: 'createdby',
  createdat: 'createdat',
  updatedby: 'updatedby',
  updatedat: 'updatedat'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  blogcomment: 'blogcomment',
  blog: 'blog',
  blogcategory: 'blogcategory',
  meta: 'meta',
  offer: 'offer',
  newsletter: 'newsletter',
  contact: 'contact',
  page: 'page',
  servicecategory: 'servicecategory',
  service: 'service',
  entrance: 'entrance',
  apiclient: 'apiclient',
  refreshtoken: 'refreshtoken',
  revokedtoken: 'revokedtoken',
  role: 'role',
  notification: 'notification',
  permission: 'permission',
  rolepermission: 'rolepermission',
  user: 'user',
  userpermission: 'userpermission',
  userrole: 'userrole'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
