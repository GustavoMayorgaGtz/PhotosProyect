export interface user {
    name: string,
    id: string,
    status: boolean,
    type: number
}

export interface ImagesCompress {
    idImage: number,
    pathCompress: string,
    border: string,
    category: category,
    orientation: 'landscape'|'portrait'|'equal'
}

export interface category {
    idCategory: number,
    iconInteger: number,
    title: string
}

export interface userCategory {
    id: string,
    category: category[],
    idUser: number,
    name: string,
    type: number
}