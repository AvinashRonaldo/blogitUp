export const slugifyTitle = async(title : string) : Promise<string> => {
    const lowerTitle = title.trim().toLowerCase();
    const slugedTitle = lowerTitle.split(" ").join("-");
    return slugedTitle
}

export const convertDateToString = async(curdate : Date) => {
    const d = new Date(curdate)
    return d.toLocaleDateString()
}
