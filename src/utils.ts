export const fetchData = async(url: string) =>{
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export const createPictureUrl = (index: number): string =>{
    return `https://randomuser.me/api/portraits/women/${index}.jpg`
}