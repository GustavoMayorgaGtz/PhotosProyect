export interface user {
    name: string,
    id: string,
    status: boolean,
    type: number,
    typeEvent: string
}

export interface ImagesCompress {
    idImage: number,
    pathCompress: string,
    border: string,
    category: string,
    orientation: 'landscape'|'portrait'|'equal'
}

export interface category {
    iconsrc: string,
    title: string,
    images?: ImagesCompress[]
}

export interface userCategory {
    id: string,
    category: category[],
    idUser: number,
    name: string,
    type: number
}