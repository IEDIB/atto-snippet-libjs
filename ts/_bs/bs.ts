/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Bootstrap utils
*/
//Requires jQuery
import { onJQueryReady } from "../_shared/utilsShared";
onJQueryReady( () => {
    //@ts-ignore
    $('[data-toggle="popover"][data-trigger="hover"]').popover({
        trigger: "hover"
    });
});
