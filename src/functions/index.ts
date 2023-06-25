export function setCategoryImage(IdArray: number[]): string[] {
    const images: string[] = [];
    IdArray.forEach((i) => {
        switch (i) {
            case 0: {
                images.push("./assets/copas.png");
                break;
            }
            case 1: {
                images.push("./assets/anillos.png");

                break;
            }
            case 2: {
                images.push("./assets/iglesia.png");
                break;
            }
            case 3: {
                images.push("./assets/app.png");
                break;
            }
            case 4: {
                images.push("./assets/party.png");

                break;
            }
            case 5: {
                images.push("./assets/party1.png");
                break;
            }
            case 6: {
                images.push("./assets/party2.png");
                break;
            }
            case 7: {
                images.push("./assets/circulo-azul.png");
                break;
            }
            case 8: {
                images.push("./assets/circulo-rosa.png");
                break;
            }
            case 9: {
                images.push("./assets/cruz.png");
                break;
            }
        }
    })
    return images;
}

export function createCategorys(typeEvent: string) {
    let response: string[] = [];
    switch (typeEvent) {
        case 'Boda': {
            response = [
                "Sesion casual",
                "Getting ready",
                "Sesion formal",
                "Civil",
                "Ceremonia religiosa",
                "Fiesta",
                "Cabina 360"
            ]
            break;
        }
        case 'XV': {
            response = [
                "Sesion casual",
                "Getting ready",
                "Sesion formal",
                "Ceremonia religiosa",
                "Fiesta",
                "Cabina 360"
            ]
            break;
        }
        case 'Bautizo': {
            response = [
                "Sesion casual",
                "Ceremonia religiosa",
                "Fiesta"
            ]
            break;
        }
        case 'Sesion Casual': {
            response = [
                "Fotos"
            ]
            break;
        }
    }
    return response;

}