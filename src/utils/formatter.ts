
export const createPictureUrl = (index: number): string =>{
    return `https://randomuser.me/api/portraits/women/${index}.jpg`
}

export const formatText = (text: string): string =>{
    return text.charAt(0).toUpperCase() + text.slice(1)
}


