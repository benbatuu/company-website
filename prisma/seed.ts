import pc from '../src/helpers/prismaclient.singleton';

const permissionsList = [
    {
        id: 1,
        name: 'Ayarlar Sayfası',
        value: 'settings:view',
        group: 'settings',
        description: 'Kullanıcıya ayarlar sayfasını görme yetkisi verir.',
    },
    {
        id: 2,
        name: 'Giriş/Çıkış Yetkisi',
        value: 'entrance:create',
        group: 'entrance',
        description: "Kullanıcıya ofis'e giriş çıkış yetkisi verir.",
    },
    {
        id: 3,
        name: 'Anasayfa',
        value: 'dashboard:view',
        group: 'homepage',
        description: 'Kullanıcıya anasayfayı görme yetkisi verir.',
    },
    {
        id: 4,
        name: 'Kullanıcı Listesi',
        value: 'user:view',
        group: 'user',
        description: 'Kullanıcı listesini görüntüleme yetkisi verir.',
    },
    {
        id: 5,
        name: 'Kullanıcı Oluşturma',
        value: 'user:create',
        group: 'user',
        description: 'Yeni kullanıcı oluşturma yetkisi verir.',
    },
    {
        id: 6,
        name: 'Kullanıcı Güncelleme',
        value: 'user:update',
        group: 'user',
        description: 'Varolan kullanıcı bilgilerini güncelleme yetkisi verir.',
    },
    {
        id: 7,
        name: 'Kullanıcı Arşivleme / Aktifleme',
        value: 'user:changestatus',
        group: 'user',
        description: 'Seçilen kullanıcıyı arşivleme ve aktif etme yetkisi verir.',
    },
    {
        id: 8,
        name: 'Yetki Listesi',
        value: 'permission:view',
        group: 'permission',
        description: 'Yetki listesini görüntüleme yetkisi verir.',
    },
    {
        id: 8,
        name: 'Yetki Oluşturma',
        value: 'permission:create',
        group: 'permission',
        description: 'Yeni yetki oluşturma yetkisi verir.',
    },
    {
        id: 9,
        name: 'Yetki Güncelleme',
        value: 'permission:update',
        group: 'permission',
        description: 'Varolan yetki bilgilerini güncelleme yetkisi verir.',
    },
    {
        id: 10,
        name: 'Rol Listesi',
        value: 'role:view',
        group: 'roles',
        description: 'Rol listesini görüntüleme yetkisi verir.',
    },
    {
        id: 11,
        name: 'Rol Oluşturma',
        value: 'role:create',
        group: 'roles',
        description: 'Yeni rol oluşturma yetkisi verir.',
    },
    {
        id: 12,
        name: 'Rol Güncelleme',
        value: 'role:update',
        group: 'roles',
        description: 'Varolan rolü düzenleme ve güncelleme yetkisi verir.',
    },
    {
        id: 13,
        name: 'Bildirim Listesi',
        value: 'notification:view',
        group: 'notification',
        description: 'Kullanıcıya avanslarla ilgili bildirimleri görme yetkisi verir.',
    },
    {
        id: 14,
        name: 'Blog Yazılarını Görme',
        value: 'blog:view',
        group: 'blog',
        description: 'Kullanıcıya blog yazılarını görme yetkisi verir.'
    },
    {
        id: 15,
        name: 'Blog Yazısı Oluşturma',
        value: 'blog:create',
        group: 'blog',
        description: 'Kullanıcıya blog yazısı oluşturma yetkisi verir.'
    },
    {
        id: 16,
        name: 'Blog Yazısı Güncelleme',
        value: 'blog:update',
        group: 'blog',
        description: 'Kullanıcıya blog yazısı güncelleme yetkisi verir.'
    },
    {
        id: 17,
        name: 'Blog Yazısı Silme',
        value: 'blog:delete',
        group: 'blog',
        description: 'Kullanıcıya blog yazısı silme yetkisi verir.'
    },
    {
        id: 18,
        name: 'Blog yazılarını pasife alma/aktifleme',
        value: 'blog:changestatus',
        group: 'blog',
        description: 'Kullanıcıya blog yazılarını pasife alma ve aktifleme yetkisi verir.'
    },
    {
        id: 19,
        name: 'Blog yorumlarını görme',
        value: 'blogcomment:view',
        group: 'blog',
        description: 'Kullanıcıya blog yazılarına yapılan yorumları görme yetkisi verir.'
    },
    {
        id: 20,
        name: 'Blog yorumu oluşturma',
        value: 'blogcomment:create',
        group: 'blog',
        description: 'Kullanıcıya blog yazılarına yorum yapma yetkisi verir.'
    },
    {
        id: 21,
        name: 'Blog yorumu güncelleme',
        value: 'blogcomment:update',
        group: 'blog',
        description: 'Kullanıcıya blog yorumlarını güncelleme yetkisi verir.'
    },
    {
        id: 22,
        name: 'Blog yorumu silme',
        value: 'blogcomment:delete',
        group: 'blog',
        description: 'Kullanıcıya blog yorumlarını silme yetkisi verir.'
    },
    {
        id: 23,
        name: 'Blog yorumlarını pasife alma/aktifleme',
        value: 'blogcomment:changestatus',
        group: 'blog',
        description: 'Kullanıcıya blog yorumlarını pasife alma ve aktifleme yetkisi verir.'
    },
    {
        id: 24,
        name: 'Blog kategorilerini görme',
        value: 'blogcategory:view',
        group: 'blog',
        description: 'Kullanıcıya blog kategorilerini görme yetkisi verir.'
    },
    {
        id: 25,
        name: 'Blog kategorisi oluşturma',
        value: 'blogcategory:create',
        group: 'blog',
        description: 'Kullanıcıya blog kategorisi oluşturma yetkisi verir.'
    },
    {
        id: 26,
        name: 'Blog kategorisi güncelleme',
        value: 'blogcategory:update',
        group: 'blog',
        description: 'Kullanıcıya blog kategorisi güncelleme yetkisi verir.'
    },
    {
        id: 27,
        name: 'Blog kategorisi silme',
        value: 'blogcategory:delete',
        group: 'blog',
        description: 'Kullanıcıya blog kategorisi silme yetkisi verir.'
    },
    {
        id: 28,
        name: 'Blog kategorilerini pasife alma/aktifleme',
        value: 'blogcategory:changestatus',
        group: 'blog',
        description: 'Kullanıcıya blog kategorilerini pasife alma ve aktifleme yetkisi verir.'
    },
    {
        id: 29,
        name: 'İletişim Formu Görme',
        value: 'contact:view',
        group: 'contact',
        description: 'Kullanıcıya iletişim formunu görme yetkisi verir.'
    },
    {
        id: 30,
        name: 'İletişim Formu Oluşturma',
        value: 'contact:create',
        group: 'contact',
        description: 'Kullanıcıya iletişim formu oluşturma yetkisi verir.'
    },
    {
        id: 31,
        name: 'İletişim Formu Silme',
        value: 'contact:delete',
        group: 'contact',
        description: 'Kullanıcıya iletişim formu silme yetkisi verir.'
    },
    {
        id: 32,
        name: 'İletişim Formu Pasife Alma/Aktifleme',
        value: 'contact:changestatus',
        group: 'contact',
        description: 'Kullanıcıya iletişim formunu pasife alma ve aktifleme yetkisi verir.'
    },
    {
        id: 33,
        name: 'Haber Bülteni Aboneliği Görme',
        value: 'newsletter:view',
        group: 'newsletter',
        description: 'Kullanıcıya haber bülteni aboneliklerini görme yetkisi verir.'
    },
    {
        id: 34,
        name: 'Haber Bülteni Aboneliği Oluşturma',
        value: 'newsletter:create',
        group: 'newsletter',
        description: 'Kullanıcıya haber bülteni aboneliği oluşturma yetkisi verir.'
    },
    {
        id: 35,
        name: 'Haber Bülteni Aboneliği Güncelleme',
        value: 'newsletter:update',
        group: 'newsletter',
        description: 'Kullanıcıya haber bülteni aboneliği güncelleme yetkisi verir.'
    },
    {
        id: 36,
        name: 'Haber Bülteni Aboneliği Silme',
        value: 'newsletter:delete',
        group: 'newsletter',
        description: 'Kullanıcıya haber bülteni aboneliği silme yetkisi verir.'
    },
    {
        id: 37,
        name: 'Meta Tag Görme',
        value: 'metatags:view',
        group: 'metatags',
        description: 'Kullanıcıya meta tagları görme yetkisi verir.'
    },
    {
        id: 38,
        name: 'Meta Tag Oluşturma',
        value: 'metatags:create',
        group: 'metatags',
        description: 'Kullanıcıya meta tagları oluşturma yetkisi verir.'
    },
    {
        id: 39,
        name: 'Meta Tag Güncelleme',
        value: 'metatags:update',
        group: 'metatags',
        description: 'Kullanıcıya meta tagları güncelleme yetkisi verir.'
    },
    {
        id: 40,
        name: 'Offer Görme',
        value: 'offers:view',
        group: 'offers',
        description: 'Kullanıcıya teklifleri görme yetkisi verir.'
    },
    {
        id: 41,
        name: 'Offer Oluşturma',
        value: 'offers:create',
        group: 'offers',
        description: 'Kullanıcıya teklif oluşturma yetkisi verir.'
    },
    {
        id: 42,
        name: 'Offer Güncelleme',
        value: 'offers:update',
        group: 'offers',
        description: 'Kullanıcıya teklif güncelleme yetkisi verir.'
    },
    {
        id: 43,
        name: 'Offer Silme',
        value: 'offers:delete',
        group: 'offers',
        description: 'Kullanıcıya teklif silme yetkisi verir.'
    },
    {
        id: 44,
        name: 'Offer Pasife Alma/Aktifleme',
        value: 'offers:changestatus',
        group: 'offers',
        description: 'Kullanıcıya teklif pasife alma ve aktifleme yetkisi verir.'
    },
    {
        id: 45,
        name: 'Page Görme',
        value: 'pages:view',
        group: 'pages',
        description: 'Kullanıcıya sayfaları görme yetkisi verir.'
    },
    {
        id: 46,
        name: 'Page Oluşturma',
        value: 'pages:create',
        group: 'pages',
        description: 'Kullanıcıya sayfa oluşturma yetkisi verir.'
    },
    {
        id: 47,
        name: 'Page Güncelleme',
        value: 'pages:update',
        group: 'pages',
        description: 'Kullanıcıya sayfa güncelleme yetkisi verir.'
    },
    {
        id: 48,
        name: 'Page Silme',
        value: 'pages:delete',
        group: 'pages',
        description: 'Kullanıcıya sayfa silme yetkisi verir.'
    },
    {
        id: 49,
        name: 'Page Pasife Alma/Aktifleme',
        value: 'pages:changestatus',
        group: 'pages',
        description: 'Kullanıcıya sayfa pasife alma ve aktifleme yetkisi verir.'
    },
    {
        id: 50,
        name: 'Servis Kategorileri Görme',
        value: 'servicecategories:view',
        group: 'servicecategories',
        description: 'Kullanıcıya servis kategorilerini görme yetkisi verir.'
    },
    {
        id: 51,
        name: 'Servis Kategorisi Oluşturma',
        value: 'servicecategories:create',
        group: 'servicecategories',
        description: 'Kullanıcıya servis kategorisi oluşturma yetkisi verir.'
    },
    {
        id: 52,
        name: 'Servis Kategorisi Güncelleme',
        value: 'servicecategories:update',
        group: 'serviscategories',
        description: 'Kullanıcıya servis kategorisi güncelleme yetkisi verir.'
    },
    {
        id: 53,
        name: 'Servis Kategorisi Silme',
        value: 'servicecategories:delete',
        group: 'serviscategories',
        description: 'Kullanıcıya servis kategorisi silme yetkisi verir.'
    },
    {
        id: 54,
        name: 'Servis Kategorisi Pasife Alma/Aktifleme',
        value: 'servicecategories:changestatus',
        group: 'servicecategories',
        description: 'Kullanıcıya servis kategorisi pasife alma ve aktifleme yetkisi verir.'
    },
    {
        id: 55,
        name: 'Servis Görme',
        value: 'services:view',
        group: 'services',
        description: 'Kullanıcıya servisleri görme yetkisi verir.'
    },
    {
        id: 56,
        name: 'Servis Oluşturma',
        value: 'services:create',
        group: 'services',
        description: 'Kullanıcıya servis oluşturma yetkisi verir.'
    },
    {
        id: 57,
        name: 'Servis Güncelleme',
        value: 'services:update',
        group: 'services',
        description: 'Kullanıcıya servis güncelleme yetkisi verir.'
    },
    {
        id: 58,
        name: 'Servis Silme',
        value: 'services:delete',
        group: 'services',
        description: 'Kullanıcıya servis silme yetkisi verir.'
    },
    {
        id: 59,
        name: 'Servis Pasife Alma/Aktifleme',
        value: 'services:changestatus',
        group: 'services',
        description: 'Kullanıcıya servis pasife alma ve aktifleme yetkisi verir.'
    },
];

async function main() {
    await pc.user.create({
        data: {
            firstname: 'Batuhan',
            lastname: 'Küçük',
            email: 'bennbatuu@gmail.com',
            password: '1905Batuhan.',
            phone: '905414725820',
            createdat: new Date(),
            createdby: 1,
            status: 1
        },
    });

    await pc.apiclient.create({
        data: {
            name: 'Test Credentials',
            key: 'test',
            secret: 'test',
            type: 1,
            createdby: 1,
            isactive: true
        },
    });

    await pc.role.create({
        data: {
            name: 'Yönetici',
            createdat: new Date(),
            issystemrole: true,
            createdby: 1
        },
    });

    await pc.userrole.create({
        data: {
            userid: 1,
            roleid: 1,
            createdat: new Date(),
            createdby: 1
        },
    });

    await pc.permission.createMany({
        data: permissionsList.map((n) => {
            return {
                name: n.name,
                value: n.value,
                group: n.group,
                description: n.description,
                createdat: new Date(),
                createdby: 1
            }
        })
    });


}

main()
    .then(async () => { await pc.$disconnect(); })
    .catch(async (e) => {
        console.error(e);
        await pc.$disconnect();
        process.exit(1);
    });