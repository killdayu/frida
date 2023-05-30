function hook_open_app() {
    Java.perform(function () {
        let MainActivity = Java.use("com.tlamb96.kgbmessenger.MainActivity");
        let System = Java.use("java.lang.System");
        System.getProperty.overload('java.lang.String').implementation = function (parameter) {
            console.log("parameter", parameter);
            let result = this.getProperty(parameter);
            console.log("result", result);
            return "Russia";
        };
        System.getenv.overload('java.lang.String').implementation = function (parameter) {
            console.log("parameter", parameter);
            let result = this.getenv(parameter);
            console.log("result", result);
            return "RkxBR3s1N0VSTDFOR180UkNIM1J9Cg==";
        };
    });
}

/*
username:codenameduchess
password:md5(84e343a0486ff05530df6c705c8bb4)(084e0343a0486ff05530df6c705c8bb4)(guest)
*/

//hook构造函数
function hook_init_message() {
    Java.perform(function () {
        let a = Java.use("com.tlamb96.kgbmessenger.b.a");
        a.$init.implementation = function (i, str, str2, z) {
            console.log("a.$init:", i, str, str2, z);
            let result = this.$init(i, str, str2, z);
            console.log(`a.a result=${result}`);
            //打印调用栈,回溯到onSendMessage
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));
            return result;
        };
    });
}

//函数a逆向，python写着有点问题，java复制过去改下变量就行了。
/*
public class Main {
    public static void main(String[] args) {
        String p = "V@]EAASB\u0012WZF\u0012e,a$7(&am2(3.\u0003";
        char[] charArray = p.toCharArray();
        for (int i = 0; i < charArray.length / 2; i++) {
            char c = charArray[i];
            charArray[i] = (char) (charArray[(charArray.length - i) - 1] ^ 'A');
            charArray[(charArray.length - i) - 1] = (char) (c ^ '2');
        }
        System.out.println(charArray);  //Boris, give me the password
    }
}
*/

//String to hex
/*
import javax.xml.bind.DatatypeConverter;

public class Main {
    public static void main(String[] args) {
        String r = "\u0000dslp}oQ\u0000 dks$|M\u0000h +AYQg\u0000P*!M$gQ\u0000";
        byte[] r1 = r.getBytes();
        System.out.println(DatatypeConverter.printHexBinary(r1));
    }
}
*/



function main() {
    hook_open_app();
    hook_init_message();
}

setImmediate(main);