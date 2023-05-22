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

[1 2 3] - ngang
[4 5 6] - ngang
[7 8 9] - ngang
---------------
n=1
[n+len*0+0 n+len*0+1 n+len*0+2]
[n+len*1+0 n+len*1+1 n+len*1+2]
[n+len*2+0 n+len*2+1 n+len*2+2]
---------------
n=1
i=0
[n+len*i+0 n+len*i+1 n+len*i+2]
i=1
[n+len*i+0 n+len*i+1 n+len*i+2]
i=2
[n+len*i+0 n+len*i+1 n+len*i+2]
---------------
n=1
0 <= i <= 2 (len-1) <=> 0 <= i < len
0 <= j < len
n + len*i + j



len=3
1 4 7 - doc
2 5 8 - doc
3 6 9 - doc
n=1
[n+len*0+0 n+len*1+0 n+len*2+0]
[n+len*0+1 n+len*1+1 n+len*2+1]
[n+len*0+2 n+len*1+2 n+len*2+2]
---------------
i=0
 	n+len*0+i 
	n+len*1+i 
	n+len*2+i
i=1
 	n+len*0+i 
	n+len*1+i 
	n+len*2+i
i=2
 	n+len*0+i 
	n+len*1+i 
	n+len*2+i
---------------
i=0
	j = 0
	n+len*j+i 
	j = 1
	n+len*j+i 
 	j = 1
	n+len*j+i
i=1
	j = 0
	n+len*j+i 
	j = 1
	n+len*j+i 
 	j = 1
	n+len*j+i
i=2
	j = 0
	n+len*j+i 
	j = 1
	n+len*j+i 
 	j = 1
	n+len*j+i







1 5 9 - cheo 1 len=3
1 6 11 16 		len=4
n=1
n+(len+1)*0 n+(len+1)*1 n+(len+1)*2
n+(len+1)*0 n+(len+1)*1 n+(len+1)*2 n+(len+1)*3 


3 5 7 - cheo 2
4 7 10 13
n = len
n+(len-1)*0 n+(len-1)*1 n+(len-1)*2
n+(len-1)*0 n+(len-1)*1 n+(len-1)*2 n+(len-1)*3


1 2 3 4
5 6 7 8
9 0 1 2
3 4 5 6
 

 
