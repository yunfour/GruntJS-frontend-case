var i = 0;

function timedCount() {
    
    i ++;
    
    postMessage(i);
    
    setTimeout(arguments.callee, 500);
}

timedCount();