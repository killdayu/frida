JNI调用，直接看so。

# Function

## Java_com_example_test_ctf03_JNI_getResult

```c
bool __fastcall Java_com_example_test_ctf03_JNI_getResult(JNIEnv *env, jobject obj, jstring str)
{
  int v3; // r4
  const char *_str; // r8
  char *a; // r6
  char *b; // r4
  char *c; // r5
  int i; // r0
  int j; // r0

  v3 = 0;
  _str = (*env)->GetStringUTFChars(env, str, 0);
  if ( strlen(_str) == 15 )
  {
    a = (char *)malloc(1u);
    b = (char *)malloc(1u);
    c = (char *)malloc(1u);
    Init(a, b, c, _str, 15);
    if ( !First(a) )
      return 0;
    for ( i = 0; i != 4; ++i )
      b[i] ^= a[i];
    if ( !strcmp(b, a5) )
    {
      for ( j = 0; j != 4; ++j )
        c[j] ^= b[j];
      return strcmp(c, "AFBo}") == 0;
    }
    else
    {
      return 0;
    }
  }
  return v3;
}
```

## Init

```c
char *__fastcall Init(char *a, char *b, char *c, const char *str, int num15)
{
  int v5; // r5
  int v6; // r10
  int v7; // r6

  if ( num15 < 1 )
  {
    v6 = 0;
  }
  else
  {
    v5 = 0;
    v6 = 0;
    do
    {
      v7 = v5 % 3;
      if ( v5 % 3 == 2 )
      {
        c[v5 / 3u] = str[v5];
      }
      else if ( v7 == 1 )
      {
        b[v5 / 3u] = str[v5];
      }
      else if ( !v7 )
      {
        ++v6;
        a[v5 / 3u] = str[v5];
      }
      ++v5;
    }
    while ( num15 != v5 );
  }
  a[v6] = 0;
  b[v6] = 0;
  c[v6] = 0;
  return a;
}
```

## First

```c
bool __fastcall First(char *a)
{
  int i; // r1

  for ( i = 0; i != 4; ++i )
    a[i] = (2 * a[i]) ^ 0x80;
  return strcmp(a, "LN^dl") == 0;
}
```

# 求解

z3 约束库

```python
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
```

