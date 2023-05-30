from binascii import b2a_hex, a2b_hex

from z3 import *

s = Solver()
r = "0064736C707D6F510020646B73247C4D0068202B4159516700502A214D24675100"
r_result = bytearray(a2b_hex(r))
for i in range(int(len(r_result) / 2)):
    c = r_result[i]
    r_result[i] = r_result[len(r_result) - i - 1]
    r_result[len(r_result) - i - 1] = c

print(b2a_hex(r_result))

x = [BitVec("x%s" % i, 32) for i in range(len(r_result))]
for i in range(len(r_result)):
    s.add(((x[i] >> (i % 8)) ^ x[i]) == r_result[i])
    s.add(x[i] < 127)
    s.add(x[i] >= 32)
if s.check() == sat:
    print(s.model())
    flag = ""
    for i in range(len(r_result)):
        flag += chr(s.model()[x[i]].as_long().real)
    print(flag)

'''
    private String b(String str) {
        char[] charArray = str.toCharArray();
        for (int i = 0; i < charArray.length; i++) {
            charArray[i] = (char) ((charArray[i] >> (i % 8)) ^ charArray[i]);
        }
        for (int i2 = 0; i2 < charArray.length / 2; i2++) {
            char c = charArray[i2];
            charArray[i2] = charArray[(charArray.length - i2) - 1];
            charArray[(charArray.length - i2) - 1] = c;
        }
        return new String(charArray);
    }
'''
