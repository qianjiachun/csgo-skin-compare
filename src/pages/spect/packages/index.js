import Compare2D from "./Compare2D"
import Compare3D from "./Compare3D"

function initPkg(mode) {
    // mode: "2d", "3d"
    switch (mode) {
        case "2d":
            Compare2D.init();
            break;
        case "3d":
            Compare3D.init();
            break;
        default:
            Compare2D.init();
            break;
    }
    
}

export {
    initPkg
}