const destructPhotos = (photos) => {
    return photos.map((photo) => {
        const {
            id,
            alt_description,
            user: {
                name: userName,
                profile_image: { large: userImage },
                links: { html: linkToUser },
            },
            urls: { regular: image },
            links: { html: linkToImage },
        } = photo;
        return { id, alt_description, userName, userImage, linkToUser, image, linkToImage };
    });
};

const getDocumentHeight = () => {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );
};

export { destructPhotos, getDocumentHeight };
