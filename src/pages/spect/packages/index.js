import Compare2D from "./Compare2D"

function initPkg(mode) {
    // mode: "2d", "3d"
    switch (mode) {
        case "2d":
            Compare2D.init();
            break;
        case "3d":
            // Compare2D.init();
            break;
        default:
            Compare2D.init();
            break;
    }
    
}

export {
    initPkg
}