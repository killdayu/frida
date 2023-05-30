function hook_java() {
    Java.perform(function () {
        let MyApp = Java.use("com.gdufs.xman.MyApp");
        MyApp["saveSN"].implementation = function (str) {
            console.log(`MyApp.saveSN is called: str=${str}`);
            this["saveSN"](str);
        };

        let Process = Java.use("android.os.Process");
        Process.killProcess.implementation = function (pid) {
            console.log("Process.killProcess:", pid);
        }
    });
}

function hook_native() {
    Java.perform(function () {
        let base_libmyjni = Module.findBaseAddress("libmyjni.so");
        let n2 = Module.findExportByName("libmyjni.so", "n2");  //thumb指令集的函数
        console.log("base_libmyjni:", base_libmyjni, ", n2 address:", n2);

        Interceptor.attach(n2, {
            onEnter: function (args) {
                console.log("n2 onEnter:", args[0], args[1], args[2]);
            }, onLeave: function (retval) {
                //console.log(retval);
            }
        });
    });
}

function hook_libart() {
    Java.perform(function () {
        let module_libart = Process.findModuleByName("libart.so");
        let symbols_libart = module_libart.enumerateSymbols();

        let addr_GetStringUTFChars = null;
        let addr_FindClass = null;
        let addr_GetStaticFieldID = null;
        let addr_SetStaticIntField = null;


        for (let i = 0; i < symbols_libart.length; i++) {
            let name = symbols_libart[i].name;
            if (name.indexOf("GetStringUTFChars") >= 0 && name.indexOf("CheckJNI") >= 0) {
                addr_GetStringUTFChars = symbols_libart[i].address;
                console.log("addr_GetStringUTFChars address:", addr_GetStringUTFChars);
            } else if (name.indexOf("FindClass") >= 0 && name.indexOf("CheckJNI") >= 0) {
                addr_FindClass = symbols_libart[i].address;
                console.log("addr_FindClass address:", addr_FindClass);
            } else if (name.indexOf("GetStaticFieldID") >= 0 && name.indexOf("CheckJNI") >= 0) {
                addr_GetStaticFieldID = symbols_libart[i].address;
                console.log("addr_GetStaticFieldID address:", addr_GetStaticFieldID);
            } else if (name.indexOf("SetStaticIntField") >= 0 && name.indexOf("CheckJNI") >= 0) {
                addr_SetStaticIntField = symbols_libart[i].address;
                console.log("addr_SetStaticIntField address:", addr_SetStaticIntField);
            }
        }

        if (addr_GetStringUTFChars) {
            Interceptor.attach(addr_GetStringUTFChars, {
                onEnter: function (args) {
                    //console.log("GetStringUTFChars onEnter:", args[0], args[1], args[2]);
                    //console.log('CCCryptorCreate called from:\n' + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n');
                }, onLeave: function (retval) {
                    //console.log("addr_GetStringUTFChars onLeave:", ptr(retval).readCString());
                    if (ptr(retval).readCString().indexOf("dayu") >= 0) {
                        console.log("addr_GetStringUTFChars onLeave:", ptr(retval).readCString());
                    }
                }
            });
        }

        if (addr_FindClass) {
            Interceptor.attach(addr_FindClass, {
                onEnter: function (args) {
                    console.log("addr_FindClass onEnter:", ptr(args[1]).readCString());
                }, onLeave: function (retval) {

                }
            });
        }


        if (addr_GetStaticFieldID) {
            Interceptor.attach(addr_GetStaticFieldID, {
                onEnter: function (args) {
                    console.log("addr_GetStaticFieldID onEnter:", ptr(args[2]).readCString(), ptr(args[3]).readCString());
                }, onLeave: function (retval) {

                }
            });
        }

        if (addr_SetStaticIntField) {
            Interceptor.attach(addr_SetStaticIntField, {
                onEnter: function (args) {
                    console.log("addr_SetStaticIntField onEnter:", args[3]);
                }, onLeave: function (retval) {

                }
            });
        }
    });
}

function hook_libc() {
    Java.perform(function () {
        let addr_strcmp = Module.findExportByName("libc.so", "strcmp");
        if (addr_strcmp) {
            Interceptor.attach(addr_strcmp, {
                onEnter: function (args) {
                    if (ptr(args[1]).readCString() === "EoPAoY62@ElRD") {
                        console.log("strcmp Interceptor:", ptr(args[0]).readCString(), ptr(args[1]).readCString())
                    }
                }, onLeave: function (retval) {

                }
            });
        }

    });

}

function write_file() {
    let file = new File("/sdcard/reg.dat", "r+");
    file.write("EoPAoY62@ElRD");
    file.close();
}

function write_file2() {
    let addr_fopen = Module.findExportByName("libc.so", "fopen");
    let addr_fputs = Module.findExportByName("libc.so", "fputs");
    let addr_fclose = Module.findExportByName("libc.so", "fclose");
    console.log("addr_fopen:", addr_fopen, "addr_fputs:", addr_fputs, "addr_fclose:", addr_fclose);

    let fopen = new NativeFunction(addr_fopen, "pointer", ["pointer", "pointer"]);
    let fputs = new NativeFunction(addr_fputs, "int", ["pointer", "pointer"]);
    let fclose = new NativeFunction(addr_fclose, "int", ["pointer"]);

    let filename = Memory.allocUtf8String("/sdcard/reg.dat");
    let mode = Memory.allocUtf8String("r+");
    let file = fopen(filename, mode);
    let buffer = Memory.allocUtf8String("12312312131312");
    fputs(buffer, file);
    fclose(file);
}

function main() {
    hook_java();
    hook_native();
    hook_libart();
    hook_libc();
}

setImmediate(main);