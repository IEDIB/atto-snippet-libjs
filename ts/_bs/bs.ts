/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Bootstrap utils
*/
//Requires jQuery
import { waitForRequire } from "../_shared/utilsShared";
   //wait for requirejs
   waitForRequire(() => { 
    //wait for jquery
    requirejs(['jquery'], function(){ 
        //wait for document ready
        $(function(){
            //@ts-ignore
            $('[data-toggle="popover"][data-trigger="hover"]').popover({
                trigger: "hover"
            });
        });                        
    })                    
}, 15);