var scripts = document.getElementsByTagName('script');

var script_1 = scripts[0],
    script_2 = scripts[1];

for(var k in script_1) {
    
    if(script_1[k] != script_2[k]) {
        console.log(k);
        console.log('1:' + script_1[k]);
        console.log('2:' + script_2[k]);
        console.log('-------------------------------------------');
    }
}

console.log('=======================================================');

for(var i = 0, l = scripts.length, script; i < l; i ++) {
    script = scripts[i];
    
    for(var k in script) {
        console.log(k + ':' + script[k]);
    }
    
    console.log(script.readyState || script.getAttribute('readyState'));
    console.log(script.src);
    
    console.log('-------------------------------------------');
}
