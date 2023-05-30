from z3 import *

s = Solver()
a = [BitVec('a%d' % i, 32) for i in range(0, 5)]
b = [BitVec('b%d' % i, 32) for i in range(0, 5)]
c = [BitVec('c%d' % i, 32) for i in range(0, 5)]

result_a = [ord(c) for c in "LN^dl"]
result_b = [0x20, 0x35, 0x2D, 0x16, 0x61]
result_c = [0x41, 0x46, 0x42, 0x6F, 0x7D]

for i in range(4):
    s.add(((2 * a[i]) ^ 0x80) == result_a[i])
    s.add(a[i] < 127)
    s.add(a[i] >= 32)
s.add(a[4] == result_a[4])

for i in range(4):
    s.add(b[i] ^ result_a[i] == result_b[i])
    s.add(b[i] < 127)
    s.add(b[i] >= 32)
s.add(b[4] == result_b[4])

for i in range(4):
    s.add(c[i] ^ result_b[i] == result_c[i])
    s.add(b[i] < 127)
    s.add(b[i] >= 32)
s.add(c[4] == result_c[4])

str_a = ""
str_b = ""
str_c = ""
flag = ""

if s.check() == sat:
    print(s.model())
    for i in range(5):
        str_a += chr(s.model()[a[i]].as_long())
        str_b += chr(s.model()[b[i]].as_long())
        str_c += chr(s.model()[c[i]].as_long())
    print(str_a)
    print(str_b)
    print(str_c)
else:
    print("unsat")

for i in range(5):
    flag += str_a[i] + str_b[i] + str_c[i]
print(flag)