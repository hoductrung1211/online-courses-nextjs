# Formulas
## In a row formula
[1 2 3] - ngang \
[4 5 6] - ngang \
[7 8 9] - ngang  

n=1 \
[n+len*0+0 n+len*0+1 n+len*0+2] \
[n+len*1+0 n+len*1+1 n+len*1+2] \
[n+len*2+0 n+len*2+1 n+len*2+2]

n=1 \
i=0 \
[n+len*i+0 n+len*i+1 n+len*i+2] \
i=1 \
[n+len*i+0 n+len*i+1 n+len*i+2] \
i=2 \
[n+len*i+0 n+len*i+1 n+len*i+2] 

n=1 \
0 <= i <= 2 (len-1) <=> 0 <= i < len \
0 <= j < len \
```n + len*i + j```