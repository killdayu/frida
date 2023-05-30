import javax.xml.bind.DatatypeConverter;

public class Main {
    public static void main(String[] args) {
            String p = "V@]EAASB\u0012WZF\u0012e,a$7(&am2(3.\u0003";
            char[] charArray = p.toCharArray();
            for (int i = 0; i < charArray.length / 2; i++) {
                char c = charArray[i];
                charArray[i] = (char) (charArray[(charArray.length - i) - 1] ^ 'A');
                charArray[(charArray.length - i) - 1] = (char) (c ^ '2');
            }
            System.out.println(charArray);

            String r = "\u0000dslp}oQ\u0000 dks$|M\u0000h +AYQg\u0000P*!M$gQ\u0000";
            byte[] r1 = r.getBytes();
            System.out.println(DatatypeConverter.printHexBinary(r1));
    }
}