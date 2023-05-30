function hook_login() {
    Java.perform(function () {
        let LoginActivity = Java.use("com.github.lastingyang.androiddemo.Activity.LoginActivity");
        LoginActivity["a"].overload('java.lang.String', 'java.lang.String').implementation = function (str, str2) {
            console.log(`LoginActivity.a is called: str=${str}, str2=${str2}`);
            let result = this["a"](str, str2);
            console.log(`LoginActivity.a result=${result}`);
            return result;
        };
    });
}

function hook_no1() {
    Java.perform(function () {
        let FridaActivity1 = Java.use("com.github.lastingyang.androiddemo.Activity.FridaActivity1");
        FridaActivity1["onCheck"].implementation = function () {
            console.log(`FridaActivity1.onCheck is called`);
            this["onCheck"]();
        };
        FridaActivity1["a"].implementation = function (bArr) {
            console.log(`FridaActivity1.a is called: bArr=${bArr}`);
            let result = this["a"](bArr);
            console.log(`FridaActivity1.a result=${result}`);
            result = "R4jSLLLLLLLLLLOrLE7/5B+Z6fsl65yj6BgC6YWz66gO6g2t65Pk6a+P65NK44NNROl0wNOLLLL="
            return result;
        };
    });
}

function hook_no2() {
    Java.perform(function () {
        //调用静态函数
        let FridaActivity2 = Java.use("com.github.lastingyang.androiddemo.Activity.FridaActivity2");
        let static_bool_var = FridaActivity2.static_bool_var.value;
        console.log("static_bool_var", static_bool_var);
        FridaActivity2.setStatic_bool_var();
        console.log("static_bool_var", static_bool_var);

        //调用非静态函数
        Java.choose("com.github.lastingyang.androiddemo.Activity.FridaActivity2", {
            onMatch: function (instance) {
                console.log("instance", instance);
                console.log("bool_var", instance.bool_var);
                instance.setBool_var();
                console.log("bool_var", instance.bool_var);
            }, onComplete() {

            }
        })
    });
}

function hook_no3() {
    Java.perform(function () {

        let FridaActivity3 = Java.use("com.github.lastingyang.androiddemo.Activity.FridaActivity3");
        //静态成员赋值
        let static_bool_var = FridaActivity3.static_bool_var.value;
        console.log("static_bool_var", static_bool_var);
        static_bool_var = true;
        console.log("static_bool_var", static_bool_var);

        //非静态成员赋值
        Java.choose("com.github.lastingyang.androiddemo.Activity.FridaActivity3", {
            onMatch: function (instance) {
                console.log("instance", instance);
                console.log("instance.bool_var", instance.bool_var);
                console.log("instance._same_name_bool_var", instance._same_name_bool_var);
                instance.bool_var.value = true;
                instance._same_name_bool_var.value = true;
                console.log("instance.bool_var", instance.bool_var);
                console.log("instance._same_name_bool_var", instance._same_name_bool_var);
            }, onComplete() {
            }
        });
        FridaActivity3["onCheck"].implementation = function () {
            console.log(`FridaActivity3.onCheck is called`);
            console.log(this.static_bool_var);
            this.static_bool_var.value = true;
            console.log(this.bool_var);
            console.log(this._same_name_bool_var);
            this["onCheck"]();
        };
    });
}

function hook_no4() {
    Java.perform(function () {
        let InnerClasses = Java.use("com.github.lastingyang.androiddemo.Activity.FridaActivity4$InnerClasses");
        InnerClasses["check1"].implementation = function () {
            console.log(`InnerClasses.check1 is called`);
            return true;
        };

        InnerClasses["check2"].implementation = function () {
            console.log(`InnerClasses.check2 is called`);
            return true;
        };

        InnerClasses["check3"].implementation = function () {
            console.log(`InnerClasses.check3 is called`);
            return true;
        };

        InnerClasses["check4"].implementation = function () {
            console.log(`InnerClasses.check4 is called`);
            return true;
        };

        InnerClasses["check5"].implementation = function () {
            console.log(`InnerClasses.check5 is called`);
            return true;
        };

        InnerClasses["check6"].implementation = function () {
            console.log(`InnerClasses.check6 is called`);
            return true;
        };

        let FridaActivity4 = Java.use("com.github.lastingyang.androiddemo.Activity.FridaActivity4");
        FridaActivity4["onCheck"].implementation = function () {
            console.log(`FridaActivity4.onCheck is called`);
            this["onCheck"]();
        };
    });
}

function hook_no5() {
    Java.perform(function () {
        Java.enumerateClassLoaders({
            onMatch: function (loader) {
                try {
                    if (loader.findClass("com.example.androiddemo.Dynamic.DynamicCheck")) {
                        Java.classFactory.loader = loader;
                        console.log(loader);
                    }
                } catch (error){
                }
            }, onComplete() {
            }
        });
        let DynamicCheck = Java.use("com.example.androiddemo.Dynamic.DynamicCheck");
        DynamicCheck["check"].implementation = function (){
            console.log(`CheckInterface.check is called`);
            let result = this["check"]();
            console.log(`CheckInterface.check result=${result}`);
            return true;
        }
    });
}

function hook_no6(){
    Java.perform(function (){
        let FridaActivity6 = Java.use("com.github.lastingyang.androiddemo.Activity.FridaActivity6");
        FridaActivity6["onCheck"].implementation = function () {
            console.log(`FridaActivity6.onCheck is called`);
            this["onCheck"]();
        };
        let Frida6Class0 = Java.use("com.github.lastingyang.androiddemo.Activity.Frida6.Frida6Class0");
        Frida6Class0["check"].implementation = function () {
            console.log(`Frida6Class0.check is called`);
            let result = this["check"]();
            console.log(`Frida6Class0.check result=${result}`);
            return true;
        };
        let Frida6Class1 = Java.use("com.github.lastingyang.androiddemo.Activity.Frida6.Frida6Class1");
        Frida6Class1["check"].implementation = function () {
            console.log(`Frida6Class1.check is called`);
            let result = this["check"]();
            console.log(`Frida6Class1.check result=${result}`);
            return true;
        };
        let Frida6Class2 = Java.use("com.github.lastingyang.androiddemo.Activity.Frida6.Frida6Class2");
        Frida6Class2["check"].implementation = function () {
            console.log(`Frida6Class2.check is called`);
            let result = this["check"]();
            console.log(`Frida6Class2.check result=${result}`);
            return true;
        };
    });
}

function main() {
    //hook_login();
    //hook_no1();
    //hook_no2();
    //hook_no3();
    //hook_no4();
    //hook_no5();
    hook_no6();
}

setImmediate(main);