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

const getElemHeight = (elem) => {
    let totalHeight = 0;
    [...elem.children].forEach((child) => {
        totalHeight += child.offsetHeight;
    });
    return totalHeight;
};

const triggerFileDownload = async (url, filename = 'image.jpg') => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const urlToDownload = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlToDownload;
        link.download = filename;
        document.body.append(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(urlToDownload);
    } catch (error) {
        console.log(error);
    }
};

const getStorageItem = (key) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};

const setStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export {
    destructPhotos,
    getDocumentHeight,
    getElemHeight,
    triggerFileDownload,
    getStorageItem,
    setStorageItem,
};
