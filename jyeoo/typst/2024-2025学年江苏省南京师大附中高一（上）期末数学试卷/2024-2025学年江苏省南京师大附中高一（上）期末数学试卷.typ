#import "/conf/exam.typ": *
#show: exam-rules
#title[2024-2025学年江苏省南京师大附中高一(上)期末数学试卷]

= 单选题

#example[
// https://www.jyeoo.com/math2/ques/detail/7clnf1o0678vPtm1OJgfO16Emb4rWOlsK4buxATDIgozvxrHC0DTpw
已知集合 $A={x|(x+2)(x-1)<0}$ , $B={x|log_(3)x<1}$ , 则 $A inter B=$ #parentheses
#choices(
  ([${x|-2<x<3}$], [${x|-2<x<0}$], [${x|0<x<1}$], [${x|1<x<3}$]),
  colNum: 2
)

#solution[
由 $log_(3)x<1$ , 解得 $0<x<3$ , 则 $B={x|0<x<3}$ , 

由 $(x+2)(x-1)<0$ , 解得 $-2<x<1$ , 则 $A={x|-2<x<1}$ , 

所以 $A inter B={x|0<x<1}$ . 

故选: $C$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/89O1i4ZV29zGSHnGGjulkm2u2qB4zwt6Mm96sbP9FLQZ9ZTZj7ffEG
命题 "$∃x in R$ , $e^(x)<x+1$" 的否定为 #parentheses
#choices(
  ([$∃x in R$ , $e^(x) >= x+1$], [$∀x in R$ , $e^(x)>x+1$], [$∃x in R$ , $e^(x)>x+1$], [$∀x in R$ , $e^(x) >= x+1$]),
  colNum: 1
)

#solution[
命题 "$∃x in R$ , $e^(x)<x+1$" 的否定为: "$∀x in R$ , $e^(x) >= x+1$". 

故选: $D$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/74wLt5Rd9nIEf7Qb3lAhAJ511bftf8ljY73T7cDT4XqoPgOEv4bG8e
"$alpha = (2 pi )/(3 ) + 2 k pi , k in Z$" 是 "$cos alpha = - (1 )/(2 )$" 的 #parentheses
#choices(
  ([充分不必要条件], [必要不充分条件], [充要条件], [既不充分也不必要条件]),
  colNum: 2
)

#solution[
若 $alpha = (2 pi )/(3 ) + 2 k pi , k in Z$ , 则 $cos alpha = cos ( (2 pi )/(3 ) + 2 k pi ) = cos (2 pi )/(3 ) = - (1 )/(2 )$ , 

若 $cos alpha = - (1 )/(2 )$ , 则 $alpha = (2 pi )/(3 ) +2 k pi$ 或 $alpha = (4 pi )/(3 ) +2 k pi$ , $k in Z$ , 

所以 "$alpha = (2 pi )/(3 ) + 2 k pi , k in Z$" 是 "$cos alpha = - (1 )/(2 )$" 的充分不必要条件. 

故选: $A$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/4lad33dqbSXTDjrKn0AwXe4vWX2zA5OLSD1NtxosJ4FYkvpOaabfKi
已知角 $alpha$ 的始边与 $x$ 轴非负半轴重合, 终边经过点 $P(1, x)$ , 且 $sin alpha = (sqrt(3 ) )/(2 )$ , 则 $x=$ #parentheses
#choices(
  ([$± sqrt(3 )$], [$sqrt(3 )$], [$(sqrt(3 ) )/(3 )$], [$(sqrt(3 ) )/(2 )$]),
  colNum: 1
)

#solution[
由题意可得 $sin alpha = (x )/(sqrt(1 ^(2 ) + x ^(2 ) ) ) = (sqrt(3 ) )/(2 ) ( x > 0 )$ , 化简得 $x^(2)=3$ , 

因为 $x>0$ , 

所以 $x = sqrt(3 )$ . 

故选: $B$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/7mggs4qR2bqZCzgK3WqEjceeY4m9CzfDrHcciikVpSS6CWQ213Bw8m
已知点 $( 3 , (1 )/(3 ) )$ 在幂函数 $f(x)=x^( alpha )$ 的图象上, 设 $a = f ( l o g _(2 ) (1 )/(5 ) ) , b = f ( sin 50 degree ) , c = f ( 2 ^(- sqrt(3 ) ) )$ , 则 $a,b,c$ 的大小关系为 #parentheses
#choices(
  ([$a>b>c$], [$b>c>a$], [$c>a>b$], [$c>b>a$]),
  colNum: 2
)

#solution[
$because$ 点 $(3, (1 )/(3 ) )$ 在幂函数 $f(x)=x^( alpha )$ 的图象上, 

 $therefore 3^( alpha )= (1 )/(3 )$ , 解得 $alpha =-1$ , $therefore f(x)=x^(-1)= (1 )/(x )$ , 

 $therefore f(x)$ 在 $(0, + infinity )$ 上单调递减, 

 $because log_(2) (1 )/(5 ) =-log_(2)5<0$ , $therefore a=f(log_(2) (1 )/(5 ) )<0$ , 

 $because sin 50 degree >sin 45 degree = (sqrt(2 ) )/(2 ) = (1 )/(sqrt(2 ) ) = 2 ^(- (1 )/(2 ) ) > (2 ^(- sqrt(3 ) ) ) >0$ , 

 $therefore c>b>0>a$ ,即 $c>b>a$ .

故选: $D$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8clC11WD3R4Z42E2aO32Zeawb29vdLAbUW92btUrMhdp4N5yA8cGw4
将函数 $f ( x ) = sin ( 2 x + ( pi )/(3 ) )$ 的图象上各点的横坐标变为原来的 $2$ 倍, 再将得到的图象向右平移 $( pi )/(3 )$ 个单位长度, 所得图象的解析式为 #parentheses
#choices(
  ([$y=-sin 4 x$], [$y=sin x$], [$y = sin ( x - ( pi )/(3 ) )$], [$y = sin ( 4 x - ( pi )/(3 ) )$]),
  colNum: 1
)

#solution[
把 $f(x)=sin(2 x+ ( pi )/(3 ) )$ 的图象上各点的横坐标变为原来的 $2$ 倍, 得 $y=sin(x+ ( pi )/(3 ) )$ , 

再将得到的图象向右平移 $( pi )/(3 )$ 个单位长度, 得 $y=sin[(x- ( pi )/(3 ) )+ ( pi )/(3 ) ]=sin x$ .

故选: $B$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/99Wk19Vi4wKHcdksJhxZoyfqf9Hl1ptECybqn0n9HvZmC5Ep9bc7SS
已知函数 $f ( x ) = cases(| ln x | "," x > 0, x ^(2 ) + 4 x + 1 "," x <= 0)$ , $g(x)=f(x)-a$ ,若函数 $g(x)$ 有四个零点, 则 $a$ 的取值范围 #parentheses
#choices(
  ([$(0, 1)$], [$(0, 2]$], [$[0, 1]$], [$(0, 1]$]),
  colNum: 2
)

#solution[
$f(x)$ 图象如图, $x=0$ 时, $f(0)=1$ , 

当 $0<a <= 1$ 时, 符合要求, 

故选: $D$ . 

 #image("images/8b663d4c.png", width: 25%)
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/6tFJQbgXdPiSLUY2crLEIW1b0FAiLZCfer5SRgfjRj7NLAlSRePGu8
设 $f(x)$ 是定义在 $R$ 上的函数, 若 $f(x)+sin x$ 是偶函数, $f(x)+cos x$ 是奇函数, 则 $f ( ( pi )/(4 ) )$ 的值为 #parentheses
#choices(
  ([$- sqrt(2 )$], [$sqrt(2 )$], [$- 2 sqrt(2 )$], [$2 sqrt(2 )$]),
  colNum: 2
)

#solution[
由 $f(x)+sin x$ 是偶函数, 可得 $f(-x)-sin x=f(x)+sin x$ ①, 

由 $f(x)+cos x$ 是奇函数, 可得 $f(-x)+cos x=-f(x)-cos x$ ②, 

① $-$ ②得 $-sin x-cos x=2 f(x)+sin x+cos x$ ,

则 $f(x)=-sin x-cos x$ ,

则 $f ( ( pi )/(4 ) ) = - sin ( pi )/(4 ) - cos ( pi )/(4 ) = - (sqrt(2 ) )/(2 ) - (sqrt(2 ) )/(2 ) = - sqrt(2 )$ . 

故选: $A$ .
]
]

= 多选题

#example[
// https://www.jyeoo.com/math2/ques/detail/7ZlrA02I7Upa8akV0JYKUY2Z7bZFu2MWJXch70eRXpogArz3s8HE6S
设 $a,b$ 为实数, 若 $10^(a)=5$ , $10^(b)=20$ , 则 #parentheses
#choices(
  ([$a+b=2$], [$b-a>lg 5$], [$a b<2(lg 5)^(2)$], [$l o g _(25 ) 8 = (3 b - 3 )/(2 a )$]),
  colNum: 1
)

#solution[
$because 10^(a)=5$ , $10^(b)=20$ , $therefore a=lg 5$ , $b=lg 20$ , 

对于 $A$ , $a+b=lg 5+lg 20=lg(5 times 20)=lg 100=lg 10^(2)=2 lg 10=2$ , 故 $A$ 正确; 

对于 $B$ , $b-a=lg 20-lg 5=lg (20 )/(5 ) =lg 4<lg 5$ , 故 $B$ 错误; 

对于 $C$ , $a b=lg 20 dot.op lg 5<lg 25 dot.op lg 5=lg 5^(2) dot.op lg 5=2(lg 5)^(2)$ , 故 $C$ 正确; 

对于 $D$ , $log_(25)8= (lg 8 )/(lg 25 ) = (3 lg 2 )/(2 lg 5 ) = (3 ( lg 20 - lg 10 ) )/(2 lg 5 ) = (3 ( b - 1 ) )/(2 a ) = (3 b - 3 )/(2 a )$ , 故 $D$ 正确. 

故选: $A C D$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/6EPE0bRY48weeKZLvjuC3M8iSBi48Q2r2B976Pd4NLxOYddUi8FNSK
已知函数 $f ( x ) = (sin x + 1 )/(sin x - 2 )$ , 则 #parentheses
#choices(
  ([$f(x)$ 的定义域为 $R$], [$f(x)$ 的图象关于点 $( - ( pi )/(2 ) , 0 )$ 中心对称], [$f(x)$ 的值域为 $[-2, 0]$], [$f(x)$ 在区间 $( ( pi )/(4 ) , ( pi )/(2 ) )$ 上单调递增]),
  colNum: 1
)

#solution[
选项 $A$ , 易知 $sin x in [ - 1 , 1 ]$ , 所以对 $∀ x in R$ , $sin x - 2 != 0$ , 即 $f ( x ) = (sin x + 1 )/(sin x - 2 )$ 的定义域为 $R$ , 故选项 $A$ 正确, 

选项 $B$ , 因为 $f ( - pi ) = (sin ( - pi ) + 1 )/(sin ( - pi ) - 2 ) = - (1 )/(2 )$ , $f ( 0 ) = (sin 0 + 1 )/(sin 0 - 2 ) = - (1 )/(2 ) = f ( - pi ) != 0$ , 

可知 $f(x)$ 的图象不关于点 $( - ( pi )/(2 ) , 0 )$ 中心对称, 所以选项 $B$ 错误, 

选项 $C$ , 因为 $f ( x ) = 1 + (3 )/(sin x - 2 )$ , 

又 $sin x in [ - 1 , 1 ]$ , 所以 $sin x - 2 in [ - 3 , - 1 ]$ , 则 $(3 )/(sin x - 2 ) in [ - 3 , - 1 ]$ , 得到 $f(x) in [-2, 0]$ , 所以选项 $C$ 正确, 

选项 $D$ , 令 $t=sin x$ ,则 $y = 1 + (3 )/(t - 2 )$ , 易知 $t=sin x$ 在区间 $( ( pi )/(4 ) , ( pi )/(2 ) )$ 上单调递增, 且 $t = sin x in ( (sqrt(2 ) )/(2 ) , 1 )$ , 

又 $y = 1 + (3 )/(x - 2 )$ 在区间 $( (sqrt(2 ) )/(2 ) , 1 )$ 上单调递减, 所以 $f(x)$ 在区间 $( ( pi )/(4 ) , ( pi )/(2 ) )$ 上单调递减, 故选项 $D$ 错误, 

故选: $A C$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8JYaWdanextAnoyNFkYu7P9OEEfS2u3qiP5ZNUWGzQ7awTuTtaGh6G
已知定义在 $R$ 上的函数 $f(x)$ 满足: $f ( 1 ) = (1 )/(4 ) , f ( x + y ) + f ( x - y ) = 4 f ( x ) f ( y )$ , 则 #parentheses
#choices(
  ([$f ( 0 ) = (1 )/(2 )$], [$f(x)$ 为偶函数], [$f(x)$ 的图象关于直线 $x=2$ 对称], [$f(x+6)=f(x)$]),
  colNum: 1
)

#solution[
令 $x=1$ , $y=0$ , $f(1)+f(1)=4 f(1)f(0)$ , 

因为 $f(1)= (1 )/(4 )$ , 所以 $f ( 0 ) = (1 )/(2 )$ , 故 $A$ 正确; 

令 $x=0$ , 得 $f(y)+f(-y)=2 f(y) => f(-y)=f(y)$ , 故 $B$ 正确

令 $x=y=1$ , 得 $f ( 2 ) = - (1 )/(4 )$ .再令 $x=2$ , $y=1$ 得 $f ( 3 ) = - (1 )/(2 ) != f ( 1 )$ , 故 $C$ 错误; 

令 $y=1$ , 得 $f(x+1)+f(x-1)=f(x)$ , 可得 $f(x+2)+f(x)=f(x+1)$ , 

两式相加可得 $f(x+2)+f(x-1)=0$ , 则 $f(x+5)+f(x+2)=0$ , 

所以 $f(x+5)=f(x-1)$ , 

所以 $f(x+6)=f(x)$ , 故 $D$ 正确. 

故选: $A B D$ .
]
]

= 填空题

#example[
// https://www.jyeoo.com/math2/ques/detail/8trgm9iNevvygMKG0xYPfc2GDasxln0Zb22A1mc4TE8Pgn5Zu7pwO0
#grid(columns: (1fr, 25%), gutter: 1em, [如图, 弦 $A B$ 将圆 $O$ 分割成两个弓形区域. 已知圆 $O$ 的半径为 $2 sqrt(3 ) c m , angle A O B = (2 pi )/(3 )$ , 则图中面积较小的弓形区域的面积为 #blank $c m^(2)$ .], [#align(center + top, image("images/0cc4a7f3.png", width: 100%))])

#solution[
如图, 取 $A B$ 中点 $D$ , 易知 $O D tack.t A B$ , 

由题意可知 $| O A | = | O B | = 2 sqrt(3 )$ , $angle A O B = (2 pi )/(3 )$ , 

所以 $|O D|=|O A|cos ( pi )/(3 ) = sqrt(3 )$ , $|A B|=2|A O|sin ( pi )/(3 ) =6$ , 

故 $S _( triangle A O B ) = (1 )/(2 ) | A B | dot.op | O D | = (1 )/(2 ) times 6 times sqrt(3 ) = 3 sqrt(3 )$ , 

又劣弧所在扇形的面积为 $S = (1 )/(2 ) alpha R ^(2 ) = (1 )/(2 ) times (2 pi )/(3 ) times ( 2 sqrt(3 ) ) ^(2 ) = 4 pi$ , 

所以图中面积较小的弓形区域的面积为 $4 pi - 3 sqrt(3 )$ . 

 #image("images/46a37fed.png", width: 25%) 

故答案为: $4 pi - 3 sqrt(3 )$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/7E4N29HKfuysGxWSYrcTNDdlbTuiD3nyvq9HGwfUe6E19FFov8jBqK
设 $m$ 为实数, 若函数 $f(x)=sin pi x$ 在区间 $( (2 )/(3 ) , m ]$ 上既有最大值, 又有最小值, 则 $m$ 的最小值为 #blank .

#solution[
函数 $f(x)=sin pi x$ 在区间 $( (2 )/(3 ) , m ]$ 上既有最大值, 又有最小值, 由 $x in ( (2 )/(3 ) , m ]$ , 所以 $pi x in ( (2 pi )/(3 ) , m pi ]$ , 

依题意可得 $m pi >= (7 pi )/(3 )$ , 解得 $m >= (7 )/(3 )$ , 所以 $m$ 的最小值为 $(7 )/(3 )$ . 

故答案为: $(7 )/(3 )$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/6muTG2050TOuYIjOgoL3Ml44bngImrmElc9l0GhjzVEIY8NIU8Uyhs
设 $t$ 为实数, 已知函数 $f ( x ) = ln ( x + sqrt(x ^(2 ) + 1 ) ) , g ( x ) = 4 ^(x ) + t dot.op 2 ^(x )$ , 若存在实数 $a,b$ 同时满足 $f(a)+f(b)=0$ 和 $g(a)+g(b)=0$ , 则实数 $t$ 的取值范围是 #blank .

#solution[
$f ( x ) = ln ( x + sqrt(x ^(2 ) + 1 ) )$ , 所以 $f ( - x ) = ln ( - x + sqrt(x ^(2 ) + 1 ) )$ , 

所以 $f(-x)+f(x)= ln ( x + sqrt(x ^(2 ) + 1 ) ) dot.op ( - x + sqrt(x ^(2 ) + 1 ) ) = ln 1 = 0$ , 

所以 $f(x)$ 为奇函数, 所以 $a+b=0$ , 

 $g(a)+g(b)=4^(a)+t dot.op 2^(a)+4^(-a)+t dot.op 2^(-a)=0$ , 即 $4^(a)+4^(-a)+t(2^(a)+2^(-a))=0$ , 

令 $s=2^(a)+2^(-a) >= 2$ , 

 $t = - (4 ^(a ) + 4 ^(- a ) )/(2 ^(a ) + 2 ^(- a ) ) = - (s ^(2 ) - 2 )/(s ) = - s + (2 )/(s )$ , 

 $t = - s + (2 )/(s )$ 在 $[2, + infinity )$ 上为减函数, 所以 $t in (- infinity , -1]$ . 

故答案为: $(- infinity , -1]$ .
]
]

= 解答题

#example[
// https://www.jyeoo.com/math2/ques/detail/9AGEi3V00DhdVh5WxoYY7H8LAojFoNRAkF277xOIo7zng0zl8dCKPY
已知 $f ( alpha ) = (sin ( pi - alpha ) + cos ( 2 pi + alpha ) )/(sin ( - alpha ) + sin ( ( pi )/(2 ) + alpha ) )$ . 

(1) 若 $f( alpha )=-2$ , 求 $tan alpha$ 的值; 

(2) 若 $sin alpha - cos alpha = (1 )/(2 )$ , 且 $0 < alpha < ( pi )/(2 )$ , 求 $f( alpha )$ 的值.

#solution[
由已知可得 $f ( alpha ) = (sin alpha + cos alpha )/(- sin alpha + cos alpha ) = (tan alpha + 1 )/(1 - tan alpha )$ , 

(1) $f( alpha )= (tan alpha + 1 )/(1 - tan alpha ) = - 2$ , 解得 $tan alpha =3$ ; 

(2) $because sin alpha - cos alpha = (1 )/(2 )$ , 

 $therefore ( sin alpha - cos alpha ) ^(2 ) = s i n ^(2 ) alpha + c o s ^(2 ) alpha - 2 sin alpha dot.op cos alpha = (1 )/(4 )$ , 

 $therefore 2 sin alpha dot.op cos alpha = (3 )/(4 )$ , 

 $because 0 < alpha < ( pi )/(2 )$ , 

 $therefore sin alpha + cos alpha = sqrt(s i n ^(2 ) alpha + c o s ^(2 ) alpha + 2 sin alpha dot.op cos alpha ) = (sqrt(7 ) )/(2 )$ , 

所以 $f ( alpha ) = (sin alpha + cos alpha )/(- sin alpha + cos alpha ) = ((sqrt(7 ) )/(2 ) )/(2 ) = - sqrt(7 )$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/7zFWU7841kfPqaZqV20WItebfDjfGTZyCeeNBBTXCQywapoFwcX0sq
#grid(columns: (1fr, 25%), gutter: 1em, [已知函数 $f(x)=A sin( omega x+ phi )(A>0, omega >0, 0< phi < pi )$ 的部分图象如图所示. 

(1) 求 $f(x)$ 的解析式; 

(2) 求 $f(x)$ 在 $[0, pi ]$ 上的单调增区间; 

(3) 若 $f ( ( alpha )/(2 ) ) = (4 )/(3 )$ , 求 $s i n ^(2 ) ( alpha + ( pi )/(6 ) ) + sin ( alpha - ( pi )/(3 ) )$ 的值.], [#align(center + top, image("images/58012392.png", width: 100%))])

#solution[
(1)由图可知 $A=2$ , 可得 $(T )/(4 ) = ( pi )/(6 ) - ( - ( pi )/(12 ) ) = ( pi )/(4 )$ , 

所以 $T = pi = (2 pi )/( omega )$ , 可得 $omega =2$ , 

由 $f ( - ( pi )/(12 ) ) = 2 sin ( - ( pi )/(6 ) + phi ) = 2$ , 得 $sin ( - ( pi )/(6 ) + phi ) = 1$ , 

则 $- ( pi )/(6 ) + phi = 2 k pi + ( pi )/(2 ) , phi = 2 k pi + (2 pi )/(3 ) , k in Z$ , 

由于 $0< phi < pi$ , 

所以 $phi = (2 pi )/(3 )$ , 

可得 $f ( x ) = 2 sin ( 2 x + (2 pi )/(3 ) )$ ; 

(2) 由于 $- ( pi )/(2 ) + 2 k pi <= 2 x + (2 pi )/(3 ) <= ( pi )/(2 ) + 2 k pi => - (7 pi )/(12 ) + k pi <= x <= - ( pi )/(12 ) + k pi , k in Z$ , 

要使 $x in [0, pi ]$ , 则令 $k=1$ , 可得 $(5 pi )/(12 ) <= x <= (7 pi )/(12 )$ , 

所以 $f(x)$ 在 $[0, pi ]$ 上的单调增区间是 $[ (5 pi )/(12 ) , (11 pi )/(12 ) ]$ ; 

(3) 由题意可得 $f ( ( alpha )/(2 ) ) = 2 sin ( alpha + (2 pi )/(3 ) ) = (4 )/(3 )$ , 可得 $sin ( alpha + (2 pi )/(3 ) ) = (2 )/(3 )$ , 

所以 $s i n ^(2 ) ( alpha + ( pi )/(6 ) ) + sin ( alpha - ( pi )/(3 ) ) = s i n ^(2 ) ( alpha + (2 pi )/(3 ) - ( pi )/(2 ) ) + sin ( alpha + (2 pi )/(3 ) - pi ) = 1 - s i n ^(2 ) ( alpha + (2 pi )/(3 ) ) - sin ( alpha + (2 pi )/(3 ) ) =1-( (2 )/(3 ) )^(2)- (2 )/(3 ) = - (1 )/(9 )$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/6GG0Vc1uaHiDKHaOOpDTzu45oWBBSzxqmc3MH1mLiSiXBE0wp9WArI
设定义在 $R$ 上的奇函数 $f(x)$ 和偶函数 $g(x)$ , 满足 $f ( x ) + g ( x ) = (2 )/(3 ^(x ) )$ . 

(1) $f(1)$ , $g(1)$ 的值; 

(2) 用函数单调性的定义证明: $f(x)$ 在 $R$ 上单调递减; 

(3) 解关于 $x$ 的不等式 $f(x^(2)-9)+f(2 x+6)>0$ .

#solution[
(1)依题意, 定义在 $R$ 上的奇函数 $f(x)$ 和偶函数 $g(x)$ , 

则 $cases(f ( x ) + g ( x ) = (2 )/(3 ^(x ) ), f ( - x ) + g ( - x ) = (2 )/(3 ^(- x ) )) , cases(f ( x ) + g ( x ) = (2 )/(3 ^(x ) ), - f ( x ) + g ( x ) = 2 dot.op 3 ^(x ))$ , 

解得 $g ( x ) = 3 ^(x ) + (1 )/(3 ^(x ) ) , f ( x ) = (1 )/(3 ^(x ) ) - 3 ^(x )$ , 

所以 $f ( 1 ) = (1 )/(3 ) - 3 = - (8 )/(3 ) , g ( 1 ) = 3 + (1 )/(3 ) = (10 )/(3 )$ . 

(2) 由(1)得 $f ( x ) = (1 )/(3 ^(x ) ) - 3 ^(x )$ , 任取 $x_(1)<x_(2)$ , 所以 $3 ^(x _(2 ) ) > 3 ^(x _(1 ) ) , 3 ^(x _(2 ) ) - 3 ^(x _(1 ) ) > 0$ , 



所以 $f ( x _(1 ) ) - f ( x _(2 ) ) = (1 )/(3 ^(x _(1 ) ) ) - 3 ^(x _(1 ) ) - (1 )/(3 ^(x _(2 ) ) ) + 3 ^(x _(2 ) ) = 3 ^(x _(2 ) ) - 3 ^(x _(1 ) ) + (3 ^(x _(2 ) ) - 3 ^(x _(1 ) ) )/(3 ^(x _(1 ) ) 3 ^(x _(2 ) ) ) = ( 3 ^(x _(2 ) ) - 3 ^(x _(1 ) ) ) ( 1 + (1 )/(3 ^(x _(1 ) ) 3 ^(x _(2 ) ) ) ) >0$ , 

所以 $f(x_(1))-f(x_(2))>0$ , $f(x_(1))>f(x_(2))$ , 

所以 $f(x)$ 在 $R$ 上单调递减. 

(3) 由 $f(x^(2)-9)+f(2 x+6)>0$ , 得 $f(x^(2)-9)>-f(2 x+6)=f(-2 x-6)$ , 

由(2)得 $f(x)$ 在 $R$ 上单调递减, 

所以 $x^(2)-9<-2 x-6$ , 解得 $-3<x<1$ , 所以不等式的解集为 $(-3, 1)$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8a3vB8BddzQOtdn4YaUz5r7gxEVJE82hVpcTRiTLFjj1YnBiU4zamO
设 $a$ 为实数, 已知函数 $f(x)=x^(2)-x|x-a|-2 a$ .

(1) 若 $f(x)$ 是 $R$ 上的单调函数, 求 $a$ 的取值范围; 

(2) 已知 $a=1$ . 

①求 $f(x)$ 的最小值; 

②设函数 $g(x)=|f(x)|(x >= 1)$ . 若区间 $[m,n] subset.eq [1, + infinity )$ , 且对任意 $x_(1) in [m,n]$ , 都存在 $x_(2) in [m,n]$ , 使得 $g(x_(1)) dot.op g(x_(2))=1$ 成立, 求 $4 m+n$ 的最小值.

#solution[
$(1) because f ( x ) = cases(2 x ^(2 ) - a x - 2 a "," x < a, a x - 2 a "," x >= a)$ 是 $R$ 上的单调函数, 

 $therefore y=2 x^(2)-a x-2 a$ 在 $(- infinity , a)$ 上是单调函数, 

 $therefore y=2 x^(2)-a x-2 a$ 在 $(- infinity , a)$ 上是单调递减函数, 

 $therefore f(x)$ 在 $R$ 上单调递减, $therefore cases(a <= (a )/(4 ), a < 0)$ , 解得 $a<0$ . 

 $therefore a$ 的取值范围是 $(- infinity , 0)$ . 

(2) 当 $a=1$ 时, $f ( x ) = cases(2 x ^(2 ) - x - 2 "," x < 1, x - 2 "," x >= 1)$ , 

① $x<1$ 时, $f ( x ) _(min ) = f ( (1 )/(4 ) ) = - (17 )/(8 )$ ; $x >= 1$ 时, $f(x)_(min)=f(1)=-1$ , 

 $because - (17 )/(8 ) < - 1$ , 

 $therefore f(x)$ 的最小值为 $- (17 )/(8 )$ ; 

②由题 $g(x)=|x-2|$ , $x >= 1$ , 且 $g(x) != 0$ , $therefore 2 in.not [m,n]$ , 

又 $x in [1, 2)$ 时, $g(x) in (0, 1]$ , $(1 )/(g ( x ) ) in [1, + infinity )$ , 

 $therefore$ 对任意 $x_(1) in (1, 2)$ , 不存在 $x_(2) in [1, 2)$ , 使得 $g(x_(1))g(x_(2))=1$ , 不符合题意, 

 $therefore 2<m<n$ ,

 $therefore g ( x ) in [ m - 2 , n - 2 ] , (1 )/(g ( x ) ) in [ (1 )/(n - 2 ) , (1 )/(m - 2 ) ]$ , 

 $because$ 对任意 $x_(1) in [m,n]$ , 都存在 $x_(2) in [m,n]$ , 使得 $g(x_(1)) dot.op g(x_(2))=1$ 成立, 

 $therefore cases(m - 2 >= (1 )/(n - 2 ), n - 2 <= (1 )/(m - 2 ))$ , 故 $(m-2)(n-2)=1$ , 

 $therefore 4 m + n = 4 ( m - 2 ) + ( n - 2 ) + 10 >= 2 sqrt(4 ) + 10 = 14$ , 

当且仅当 $4(m-2)=n-2$ , 即 $m = (5 )/(2 ) , n = 4$ 时取等号, 

 $therefore 4 m+n$ 的最小值为 $14$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/6X4tQ4AD0GZXFyqnd70hXu3VEVZE8ytHUv8xc1IjXvfPXe1GE0Gu6C
若函数 $f(x)$ 和 $g(x)$ 的零点相同, 则称 $f(x)$ 和 $g(x)$ 是 "$Z$ 函数对". 

(1) 已知 $x in [0, + infinity )$ , 判断 $f(x)=2^(x)+x-2$ 与 $g ( x ) = cos x - (1 )/(2 ) x$ 是否为 "$Z$ 函数对", 并说明理由; 

(2) 设 $a>0$ , $f(x)=a sin x$ ,若 $f(x)$ 与 $f(f(x))$ 为 "$Z$ 函数对", 求 $a$ 的取值范围; 

(3) 已知 $m,n$ 是实数, 若函数 $f _(1 ) ( x ) = x e ^(x ) - 1$ 与 $g _(1 ) ( x ) = x + (m ^(2 ) )/(x ) - 2 m$ 为 "$Z$ 函数对", 函数 $f _(2 ) ( x ) = ln x - (e )/(x ) - 1$ 与 $g _(2 ) ( x ) = ( x - n ) ^(3 )$ 为 "$Z$ 函数对", 求 $m n$ 的值.

#solution[
(1)不是, 理由如下: 

因为 $y=2^(x)$ 与 $y=x-2$ 在 $R$ 上单调递增, 

所以函数 $f(x)=2^(x)+x-2$ 是实数集上的增函数, 

因为 $f(0)f(1)=(-1) times 1<0$ , 

所以函数 $f(x)$ 在 $(0, 1)$ 上有唯一零点, 

当 $x in (0, 1)$ 时, 函数 $g ( x ) = cos x - (1 )/(2 ) x$ 是单调递减函数, 

 $g ( 0 ) g ( 1 ) = 1 times ( cos 1 - (1 )/(2 ) ) = cos 1 - (1 )/(2 ) > cos ( pi )/(3 ) - (1 )/(2 )$ , 

即 $g(0)g(1)>0$ , 

所以函数 $g ( x ) = cos x - (1 )/(2 ) x$ 在 $(0, 1)$ 上没有零点, 不符合题中定义, 

所以 $f(x)$ 和 $g(x)$ 不是 "$Z$ 函数对"; 

(2) 由 $f(x)=0$ , 得 $x=k pi$ , $k in Z$ , 

 $f(f(k pi ))=f(0)=0$ , 

所以 $f(x)$ 的零点是 $f(f(x))$ 的零点, 

由 $f(f(x))=0$ , 得 $x=k pi$ , $k in Z$ , 

当 $x=k pi$ 时, $0=k pi$ , 

所以 $k=0$ , $x=0$ 为 $f(x)$ 的零点, 

而当 $x != k pi$ 时, 必须使得 $x=k pi$ 无解, 

否则 $f(f(x))$ 的一些零点不能使得 $f(x)=0$ , 

所以 $x=| (k pi )/(a ) |>1$ 对 $∀k in Z$ , $k != 0$ 成立, 

所以 $( pi )/(a ) >1$ , 得 $a< pi$ , 

此时 $f(f(x))$ 的零点也全是 $f(x)$ 的零点, 

综上 $a in (0, pi )$ ; 

(3) 由 $g _(1 ) ( x ) = x + (m ^(2 ) )/(x ) - 2 m = 0$ , 解得 $x=m$ ,

因为函数 $f _(1 ) ( x ) = x e ^(x ) - 1$ 与 $g _(1 ) ( x ) = x + (m ^(2 ) )/(x ) - 2 m$ 为 "$Z$ 函数对", 

所以 $f _(1 ) ( m ) = m e ^(m ) - 1 = 0$ , 

即 $m e^(m)=1$ , $e^(m)= (1 )/(m )$ , 

取对得 $m=ln (1 )/(m ) =-ln m$ ,

所以 $ln m+m=0$ , 

由 $g _(2 ) ( x ) = ( x - n ) ^(3 ) = 0$ , 解得 $x=n$ ,

因为函数 $f _(2 ) ( x ) = ln x - (e )/(x ) - 1$ 与 $g _(2 ) ( x ) = ( x - n ) ^(3 )$ 为 "$Z$ 函数对", 

所以有 $f _(2 ) ( n ) = ln n - (e )/(n ) - 1 = 0$ , 

即 $ln (n )/(e ) - (e )/(n ) = 0$ , $(e )/(n ) + ln (e )/(n ) = 0$ , 

因为 $y=ln x+x$ 在 $(0, + infinity )$ 上单调递增, 

所以 $m = (e )/(n )$ , 

即 $m n=e$ .
]
]

