import pc from 'helpers/prismaclient.singleton';

export const profileService = async (id: number) => {
    const userProfile = await pc.user.findFirst({
        where: { id: id },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
            status: true,
            createdat: true,
            updatedat: true,
        },
    });

    return { data: userProfile, message: 'user_profile_successfully_listed' };
};
