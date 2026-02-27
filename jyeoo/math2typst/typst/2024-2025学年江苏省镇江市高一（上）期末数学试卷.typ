#import "/conf/exam.typ": *
#show: exam-rules
#title[2024-2025学年江苏省镇江市高一(上)期末数学试卷]

= 选择题: 本题共8小题, 每小题5分, 共40分.在每小题给出的四个选项中, 只有一项是符合题目要求的. 

#example[
// https://www.jyeoo.com/math2/ques/detail/5ClqZa9aetomvIqj84wgaRaEstG4RIw09ecoWCFOzF0wVHZXI2rJ4a
(5分) 已知集合 $U={x|1 <= x <= 6, x in NN}$ , 集合 $A={1, 2, 3, 4}$ , 集合 $B={1, 3, 5}$ , 则 $A inter ∁_(U)B=$ #parentheses
#choices(
  ([${2, 4}$], [${2, 6}$], [${3, 4}$], [${3, 6}$]),
  colNum: 2
)

#solution[
$U={x|1 <= x <= 6, x in NN}={1, 2, 3, 4, 5, 6}$ , $B={1, 3, 5}$ , 所以 $∁_(U)B={2, 4, 6}$ , 

又 $A={1, 2, 3, 4}$ , 所以 $A inter ∁_(U)B={2, 4}$ . 

故选: $A$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/6MRQl5N4fba6Ykl5zqgK3m5Sbwd75sy4eL8Mnd02VlkV7kA85dZAPI
(5分) 以原点为圆心的单位圆上一点 $P$ 从 $(1, 0)$ 出发, 沿逆时针方向运动 $(2 pi )/(3 )$ 弧长到达点 $Q$ , 则点 $Q$ 的坐标为 #parentheses
#choices(
  ([$(- (sqrt(3 ) )/(2 ) , - (1 )/(2 ) )$], [$( - (1 )/(2 ) , - (sqrt(3 ) )/(2 ) )$], [$( - (sqrt(3 ) )/(2 ) , (1 )/(2 ) )$], [$(- (1 )/(2 ) , (sqrt(3 ) )/(2 ) )$]),
  colNum: 1
)

#solution[
设 $Q(x,y)$ , 

由任意角的三角函数定义, 可得 $x=cos (2 pi )/(3 ) =- (1 )/(2 )$ , $y=sin (2 pi )/(3 ) = (sqrt(3 ) )/(2 )$ . 

 $therefore$ 点 $Q$ 的坐标为 $( - (1 )/(2 )$ , $(sqrt(3 ) )/(2 ) )$ . 

故选: $D$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8pDM62VN4d1fqqhT8TAfk93MgBenRoOXOr0wWCVCa2fIXW0in4HLm4
(5分) 已知 $A>0$ , $B>0$ , 则 "$lg A>lg B$" 是 "$sin A>sin B$" 的 #parentheses
#choices(
  ([充分且不必要条件], [必要且不充分条件], [充要条件], [既不充分也不必要条件]),
  colNum: 2
)

#solution[
充分性: 因为对数函数 $y=lg x$ 在 $(0, + infinity )$ 上单调递增, 且 $1 g A>1 g B$ , 所以 $A>B$ . , 

但正弦函数在 $(0, + infinity )$ 上不单调, 无法保证 $A>B$ 一定能推出 $sin A>sin B$ , 故充分性不成立; 

必要性: 因为正弦函数不单调, 所以即使 $sin A>sin B$ , 也不能保证 $A>B$ , 进而无法保证 $1 g A>1 g B$ , 必要性不成立, 

因此, "$lg A>lg B$" 既不是 "$sin A>sin B$" 的充分条件, 也不是必要条件. 

故选: $D$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/84sjyeqC4tMNdvM77eVOnW2Mn4d8mem0ZM6wjNy8U62esHwQya65RI
(5分) 已知函数 $f(x)=ln x+x-5$ 的零点在区间 $(n,n+1)(n in NN)$ 内, 则 $n=$ #parentheses
#choices(
  ([$1$], [$2$], [$3$], [$4$]),
  colNum: 4
)

#solution[
因为 $f(x)=ln x+x-5$ , $x>0$ , 

又因为 $y=ln x$ 与 $y=x-5$ 在 $(0, + infinity )$ 上均单调递增, 

所以 $f(x)=ln x+x-5$ 在 $(0, + infinity )$ 上单调递增, 

又因为 $f(3)=ln 3-2<0$ , $f(4)=ln 4-1>0$ , 

所以函数有唯一零点, 在 $(3, 4)$ 内, 

所以 $n=3$ . 

故选: $C$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8nOnScbb70rZAv1u5YUVMWdvIepLb7EJXwc8g42TyGHDb5S89eBxxI
(5分) 求值: $cos 2025 degree =$ #parentheses
#choices(
  ([$- (sqrt(2 ) )/(2 )$], [$- (1 )/(2 )$], [$(1 )/(2 )$], [$(sqrt(2 ) )/(2 )$]),
  colNum: 1
)

#solution[
$cos 2025 degree =cos(360 degree times 6-135 degree )=cos 135 degree =-cos 45 degree =- (sqrt(2 ) )/(2 )$ . 

故选: $A$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/5vJgo8ij8z5xN0jvU3T7nH4hkwhdpLyYx36OKieUxcwBzp68l8kevI
(5分) 《九章算术》中有这样的一个问题: "今有宛田, 下周三十步, 径十六步. 问为田几何?" 意思是说: 现有一块扇形田, 弧长 $30$ 步, 扇形所在圆的直径为 $16$ 步, 则这块扇形田的面积 $($ 单位 $:$ 平方步 $)$ 是 #parentheses
#choices(
  ([$100$], [$110$], [$120$], [$130$]),
  colNum: 4
)

#solution[
由题意可得扇形的半径为 $8$ , 

则扇形面积为 $S= (1 )/(2 ) l r = (1 )/(2 ) times 30 times 8 =120$ . 

故选: $C$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/5M65Q7n39N6ijqKxDkEg0Y4CSqUl67VqLb6nlPJrR7CCk6zsL7699E
(5分) 已知函数 $f ( x ) = cases(3 x - 1 "," x < 1, 2 x ^(2 ) "," x >= 1)$ 则不等式 $f(x^(2)+x-2)>f(x-1)$ 的解集是 #parentheses
#choices(
  ([$(-1, 1)$], [$(- infinity , -1) union (1, + infinity )$], [$(-2, 1)$], [$(-1, 2)$]),
  colNum: 1
)

#solution[
易知函数在 $R$ 上单调递增, 

所以不等式 $f(x^(2)+x-2)>f(x-1)$ , 

等价于不等式 $x^(2)+x-2>x-1$ , 

即 $x^(2)-1>0$ , 

解得 $x>1$ 或 $x<-1$ . 

故选: $B$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/6i7bw84PeZoHq9cuwHwcf8etiHA8on3F1y6jNYc3P9BBJ31hM7PXxw
#grid(columns: (1fr, 25%), gutter: 1em, [(5分) 如图, 摩天轮的半径为 $40 m$ ,摩天轮的中心点 $O$ 距地面的高度为 $50 m$ ,摩天轮做匀速转动, 每 $36 min$ 转一圈, 摩天轮上点 $P$ 的起始位置在最低点处. 则在摩天轮转动的一圈内, 点 $P$ 距离地面超过 $70 m$ 的时长为 #parentheses], [#align(center + top, image("dumb.png", width: 100%))])
#choices(
  ([$10 min$], [$12 min$], [$14 min$], [$16 min$]),
  colNum: 2
)

#solution[
设函数 $y=A sin( omega x+ phi )+B$ , 则 $A=40$ , $B=50$ , $T=36$ , 所以 $omega = (2 pi )/(T ) = ( pi )/(18 )$ , 

 $x=0$ 时, $y=40 sin phi +50=10$ , 解得 $sin phi =-1$ , 所以 $phi =- ( pi )/(2 ) +2 k pi$ , $k in ZZ$ ; 

所以 $y=40 sin( ( pi )/(18 ) x- ( pi )/(2 ) )+50$ , 令 $y >= 70$ , 得 $sin( ( pi )/(18 ) x- ( pi )/(2 ) ) >= (1 )/(2 )$ , 

即 $cos( ( pi )/(18 ) x) <= - (1 )/(2 )$ , 解得 $(2 pi )/(3 ) <= ( pi )/(18 ) x <= (4 pi )/(3 )$ , 

即 $12 <= x <= 24$ , 所以点 $P$ 距离地面超过 $70 m$ 的时长为 $24-12=12(min)$ . 

故选: $B$ .
]
]

= 选择题: 本题共3小题, 每小题6分, 共18分.在每小题给出的选项中, 有多项符合题目要求.全部选对的得6分, 部分选对的得部分分, 有选错的得0分. 

#example[
// https://www.jyeoo.com/math2/ques/detail/8xPHB1rQ6hYilaX4bG8sgB8Dk2S5AcALh8a1pNkXKbHVjIyS28fKoy
(多选) (6分) 下列命题为真命题的是 #parentheses
#choices(
  ([若 $a>b>0$ , 则 $a c^(2)>b c^(2)$], [若 $a>b>0$ , 则 $a^(2)>b^(2)$], [若 $a<b<0$ , 则 $a^(2)<a b<b^(2)$], [若 $a<b<0$ , 则 $(1 )/(a ) > (1 )/(b )$]),
  colNum: 1
)

#solution[
$a>b>0$ , 当 $c=0$ 时, $a c^(2)>b c^(2)$ 不成立, $A$ 错, 

 $a>b>0$ , 则 $a+b>0$ , $a-b>0$ , $a^(2)-b^(2)=(a-b)(a+b)>0$ , $B$ 对, 

 $a<b<0$ , $a=-2$ , $b=-1$ , $a^(2)=4$ , $b^(2)=1$ , $a^(2)>b^(2)$ , $C$ 错, 

 $a<b<0$ , $a b>0$ , $b-a>0$ , $(1 )/(a ) - (1 )/(b ) = (b - a )/(a b ) >0$ , $D$ 对. 

故选: $B D$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8RVVt5c18d9Z4606dRZ6DF0bdDO5PyrO5U45L3Kep5APTUXK5d7n5k
(多选) (6分) 下列函数最小值为 $2$ 的有 #parentheses
#choices(
  ([$f ( x ) = sin x + (1 )/(sin x )$], [$f(x)=x^(2024)+x^(-2024)$], [$f(x)=a^(x)+a^(-x)(a>0,$ 且 $a != 1)$], [$f(x)=x^(3)-3 x(x >= 2)$]),
  colNum: 1
)

#solution[
$A$ 中, 当 $sin x<0$ 时, $f(x)$ 无最小值, 所以 $A$ 不正确; 

 $B$ 中, 令 $t=x^(2024)>0$ , 所以 $y=t+ (1 )/(t ) >= 2 sqrt(t dot.op (1 )/(t ) ) =2$ , 当且仅当 $t= (1 )/(t )$ , 即 $t=1$ 时, 取等号, 

即 $x^(2024)=1$ , 即 $x= plus.minus 1$ 时取等号, 所以 $f(x)$ 的最小值为 $2$ , 所以 $B$ 正确; 

 $C$ 中, 因为 $a^(x)>0$ , 可得 $f(x)=a^(x)+ (1 )/(a ^(x ) ) >= 2 sqrt(a ^(x ) dot.op a ^(- x ) ) =2$ , 当且仅当 $a^(x)=a^(-x)$ , 即 $x=1$ 时取等号, 所以 $C$ 正确; 

 $D$ 中, $f(x)=x^(3)-3 x=x(x^(2)-3)$ , $x >= 2$ , 因为 $x^(2)-3 >= 1$ , 所以当 $x=2$ 时, $f(x)_(min)=2(2^(2)-3)=2$ , 所以 $D$ 正确. 

故选: $B C D$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8qoT42OS2xtrCnwSxcPIhd4fWahcBiR4Ax6Za3mL7qXG2D9jh4qawq
(多选) (6分) 已知函数 $f(x)=x^(2)-a x+1(2 <= a <= 3)$ 的两个零点为 $x_(1)$ , $x_(2)(x_(1) <= x_(2))$ , 则 #parentheses
#choices(
  ([当 $x in [-1, 1]$ 时, $f(x)$ 的取值范围为 $[2-a,2+a]$], [$x _(1 ) in [ (3 - sqrt(5 ) )/(2 ) , 1 ]$], [当且仅当 $x >= (3 + sqrt(5 ) )/(2 )$ 时, $f(x) >= 0$ 恒成立], [$(2 x _(2 ) - a )/(a x _(1 ) - x _(1 )^(2 ) ) in [ 0 , sqrt(5 ) ]$]),
  colNum: 1
)

#solution[
因为 $2 <= a <= 3$ , 

所以 $1 <= (a )/(2 ) <= (3 )/(2 )$ , 

又因为 $f(x)=x^(2)-a x+1$ , 开口向上, 对称轴为 $x= (a )/(2 ) in [1, (3 )/(2 ) ]$ , 

对于 $A$ , 当 $x in [-1, 1]$ 时, 函数单调递减, 

所以 $f(x) in [2-a,2+a]$ , 故 $A$ 正确; 

对于 $B$ , 当 $Delta =a^(2)-4=0$ , 即 $a=2$ 时, 

 $f(x)=x^(2)-2 x+1$ , 解得 $x_(1)=x_(2)=1$ , 

当 $Delta =a^(2)-4>0$ , 即 $2<a <= 3$ 时, 

 $x_(1)+x_(2)=a,x_(1)x_(2)=1$ , 

所以 $x_(1)+ (1 )/(x _(1 ) ) =a$ ,

当 $a=3$ 时, 

则有 $x_(1)+ (1 )/(x _(1 ) ) =3$ , 

解得 $x_(1)= (3 - sqrt(5 ) )/(2 )$ 或 $x_(1)= (3 + sqrt(5 ) )/(2 )$ 

因为 $x_(1)<x_(2)$ , 

所以 $x_(1)= (3 - sqrt(5 ) )/(2 )$ , 

综上, $x_(1) in [ (3 - sqrt(5 ) )/(2 )$ , $1]$ , 故 $B$ 正确; 

对于 $C$ , 由 $B$ 可知 $x_(1) in [ (3 - sqrt(5 ) )/(2 )$ , $1]$ , $x_(2) in [1, (3 + sqrt(5 ) )/(2 ) ]$ , 

所以当 $x <= (3 - sqrt(5 ) )/(2 )$ 或 $x >= (3 + sqrt(5 ) )/(2 )$ 时, $f(x) >= 0$ 恒成立, 故 $C$ 错误; 

对于 $D$ , 由题意可知 $a x_(1)- x _(1 )^(2 ) =1$ , 

所以 $(2 x _(2 ) - a )/(a x _(1 ) - x _(1 )^(2 ) ) =2 x_(2)-a$ ,

又因为 $x _(2 )^(2 ) -a x_(2)+1=0$ , 

所以 $a=x_(2)+ (1 )/(x _(2 ) )$ , 

所以 $2 x_(2)-a=x_(2)- (1 )/(x _(2 ) )$ , 

又因为 $x_(2) in [1, (3 + sqrt(5 ) )/(2 ) ]$ , 

函数 $y=x- (1 )/(x )$ 在 $[1, (3 + sqrt(5 ) )/(2 ) ]$ 上单调递增, 

所以 $y=x- (1 )/(x ) in [0, sqrt(5 ) ]$ , 

即 $x_(2)- (1 )/(x _(2 ) ) in [0, sqrt(5 ) ]$ , 故 $D$ 正确. 

故选: $A B D$ .
]
]

= 填空题: 本题共3小题, 每小题5分, 共15分. 

#example[
// https://www.jyeoo.com/math2/ques/detail/6z0dEdHUdIEpvQKg4t4vslbUIs4nGA5KxvbZ27VxduUkFGtm1592IK
(5分) 计算 $(lg 2)^(2)+lg 2 dot.op lg 50+lg 25=$ #blank .

#solution[
原式 $=2 lg 5+lg 2 dot.op (1+lg 5)+(lg 2)^(2)=2 lg 5+lg 2(1+lg 5+lg 2) =2 lg 5+2 lg 2=2$ ; 

故答案为 $2$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8dGxy8uQ77CxcyinQufgcm6GmXbZEOlsR31jLD6AB8LYxZa6q5dltg
(5分) 请写出一个同时满足以下性质①②的非常数函数 $f(x)=$ #blank . 

① $f(-x)-f(x)=0$ , ② $f(x+ pi )-f(x)=0$ .

#solution[
根据条件① $f(-x)-f(x)=0$ , 可知函数 $f(x)$ 是偶函数, 

根据条件② $f(x+ pi )-f(x)=0$ , 可知函数 $f(x)$ 的周期是 $pi$ , 

余弦函数 $y=cos x$ 是偶函数, 周期是 $2 pi$ , 不满足周期是 $pi$ , 

 $y=cos(2 x)$ 满足周期是 $pi$ , 

所以满足性质①②的一个非常数函数可以是 $f(x)=cos(2 x)$ . 

故答案为: $cos(2 x)($ 答案不唯一 $)$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8fGLP1iX55bJBgSzuJ4Oet8FXy1wcaQFO4bbyuUAEeJc6ex8x1g2ee
(5分) 已知函数 $f(x)=tan(x+ theta )$ , $theta in ( 0 , ( pi )/(2 ) )$ . 甲: 当 $x in ( 0 , ( pi )/(4 ) )$ 时, 函数 $f(x)$ 单调递减; 乙: 函数 $f(x)$ 的图象关于直线 $x = ( pi )/(3 )$ 对称; 丙: 函数 $y=f(x)$ 图象的一个对称中心为 $( ( pi )/(6 ) , 0 )$ . 甲, 乙, 丙三人对函数 $f(x)$ 的论述中有且只有一人正确, 则 $theta =$ #blank .

#solution[
由正切函数型函数的单调性和对称轴可知, 只有丙同学的论述正确, 

所以 $( pi )/(6 ) + theta = (k pi )/(2 )$ , $k in ZZ$ , 又因为 $theta in (0, ( pi )/(2 ) )$ , 可得 $theta = ( pi )/(3 )$ . 

故答案为: $( pi )/(3 )$ .
]
]

= 解答题: 本题共5小题, 共77分.解答应写出文字说明, 证明过程或演算步骤. 

#example[
// https://www.jyeoo.com/math2/ques/detail/8cf8V1hJ35qJTrQJ1xvKPP1UUNTUBNBiFuaHDzS1z4FjMRUaQ0sKHY
(13分) 已知 $alpha$ 是第三象限角, 且 $tan alpha =2$ . 

(1) 求 $sin alpha$ 的值; 

(2) 求 $(2 sin ( pi - alpha ) cos ( - 2 pi - alpha ) )/(s i n ^(2 ) ( (3 pi )/(2 ) + alpha ) - s i n ^(2 ) ( - alpha ) )$ 的值.

#solution[
(1)因为 $alpha$ 是第三象限角, 且 $tan alpha = (sin alpha )/(cos alpha ) =2$ , 

所以 $cos alpha = (1 )/(2 ) sin alpha$ , 

可得 $sin^(2) alpha +cos^(2) alpha =sin^(2) alpha + (1 )/(4 ) sin^(2) alpha = (5 )/(4 ) sin^(2) alpha =1$ , 

解得 $sin alpha =- (2 sqrt(5 ) )/(5 )$ 或 $(2 sqrt(5 ) )/(5 ) ($ 舍去 $)$ ; 

(2) $(2 sin ( pi - alpha ) cos ( - 2 pi - alpha ) )/(s i n ^(2 ) ( (3 pi )/(2 ) + alpha ) - s i n ^(2 ) ( - alpha ) ) = (2 sin alpha cos alpha )/(c o s ^(2 ) alpha - s i n ^(2 ) alpha ) = (2 tan alpha )/(1 - t a n ^(2 ) alpha ) = (2 times 2 )/(1 - 2 ^(2 ) ) =- (4 )/(3 )$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/4z8Bl4ng8a9w55TIIbKQgM3Zu6NwcBCX2x5yo9ZPNSuGRfeHM8ZaW8
(15分) (1)已知 $a>0$ , $b>0$ , 且 $a+b=a b$ ,求 $a+b$ 的最小值; 

(2) 已知 $a>0$ , $b>0$ , 证明: $(a )/(sqrt(b ) ) + (b )/(sqrt(a ) ) >= sqrt(a ) + sqrt(b )$ .

#solution[
(1) 解: $a>0$ , $b>0$ , 且 $a+b=a b <= ( (a + b )/(2 ) )^(2)$ , 解得 $a+b >= 4$ , 

可得 $a+b$ 的最小值为 $4$ ; 

(2) 证明: $(a )/(sqrt(b ) ) + (b )/(sqrt(a ) ) -( sqrt(a ) + sqrt(b ) )= (( sqrt(a ) ) ^(3 ) + ( sqrt(b ) ) ^(3 ) )/(sqrt(a b ) ) -( sqrt(a ) + sqrt(b ) )= (( sqrt(a ) + sqrt(b ) ) ( a + b - sqrt(a b ) ) )/(sqrt(a b ) ) -( sqrt(a ) + sqrt(b ) ) = (( sqrt(a ) + sqrt(b ) ) ( a + b - 2 sqrt(a b ) ) )/(sqrt(a b ) ) = (( sqrt(a ) + sqrt(b ) ) ( sqrt(a ) - sqrt(b ) ) ^(2 ) )/(sqrt(a b ) )$ , 

因为 $a>0$ , $b>0$ , 可得 $sqrt(a ) + sqrt(b ) >0$ , $sqrt(a b ) >0$ , $( sqrt(a ) - sqrt(b ) )^(2) >= 0$ , 

所以 $(( sqrt(a ) + sqrt(b ) ) ( sqrt(a ) - sqrt(b ) ) ^(2 ) )/(sqrt(a b ) ) >= 0$ , 

所以: $(a )/(sqrt(b ) ) + (b )/(sqrt(a ) ) >= ( sqrt(a ) + sqrt(b ) )$ . 

即证得结论.
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/91yIz1WSewRPc2bcCrnZWIbdLumyMibxDp3EZQSVuX9z1kjP0eeOa8
#grid(columns: (1fr, 25%), gutter: 1em, [(15分) 如图, 互相垂直的两条小路 $A M$ , $A N$ 旁有一长方形花坛 $A B C D$ , 其中 $A B=30 m,A D=20 m$ .现欲经过点 $C$ 修一条直路 $l,l$ 交小路 $A M$ , $A N$ 分别为点 $P$ , $Q$ . 计划准备将长方形花坛 $A B C D$ 其扩建成一个更大的三角形花坛 $A P Q$ . 要求 $A P$ 的长不小于 $40 m$ 且不大于 $90 m$ .记三角形花园 $A P Q$ 的面积为 $S m^(2)$ . 

(1) 设 $D Q=x m$ ,试用 $x$ 表示 $A P$ , 并求 $x$ 的取值范围; 

(2) 当 $D Q$ 的长度是多少时, $S$ 取最小值?最小值是多少?], [#align(center + top, image("dumb.png", width: 100%))])

#solution[
(1)由题意可得: $triangle D C Q∽ triangle B P C$ , 

即 $(Q D )/(D C ) = (B C )/(B P )$ , 

即 $(x )/(30 ) = (20 )/(B P )$ , 

则 $B P = (600 )/(x )$ , 

则 $A P=A B+B P= 30 + (600 )/(x )$ , 

又 $40 <= 30 + (600 )/(x ) <= 90$ , 

则 $10 <= x <= 60$ , 

即 $A P= 30 + (600 )/(x )$ , $10 <= x <= 60$ ; 

(2) 由(1)可得: $S = (1 )/(2 ) B P dot.op A Q = (1 )/(2 ) ( 30 + (600 )/(x ) ) ( 20 + x ) = (15 ( x + 20 ) ^(2 ) )/(x ) >= (15 dot.op ( 2 sqrt(20 x ) ) ^(2 ) )/(x ) =1200$ , 

当且仅当 $x=20$ 时取等号, 

即当 $D Q$ 的长度是 $20 m$ 时, $S$ 取最小值, 且最小值是 $1200 m^(2)$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/9B6zT3OseW0aTRjqk6VyTgfPFZXRHpTluDahxJ6cegUwSrONDe4nSa
(17分) 给出以下三个条件: ①函数 $y=f(x)$ 图象的两条相邻对称轴之间的距离为 $( pi )/(2 )$ ; ② $f ( - ( pi )/(6 ) ) = 0$ ; ③对任意的 $x in RR$ , $f ( x ) <= f ( ( pi )/(12 ) )$ . 请从这三个条件中任选一个将下面的题目补充完整, 并解答该题. 

已知函数 $f ( x ) = sin ( omega x + ( pi )/(3 ) ) ( 0 < omega < 3 )$ , 且满足 #blank . 

(1) 求 $omega$ 的值; 并用 "五点法" 作出函数 $y=f(x)$ 在一个周期内的图象; 

(2) 将函数 $f(x)$ 的图象向右平移 $( pi )/(3 )$ 个单位后, 再将此时图象上各点的纵坐标不变, 横坐标变为原来的 $2$ 倍, 得到函数 $y=g(x)$ 的图象, 若关于 $x$ 的方程 $g(x)-k=0$ , 在区间 $[0, pi ]$ 上有且只有一个实数解, 求实数 $k$ 的取值范围.

#solution[
(1)若选①: 函数 $y=f(x)$ 图象的两条相邻对称轴之间的距离为 $( pi )/(2 )$ , 

可得 $(T )/(2 ) = ( pi )/(2 )$ , 可得 $T= pi = (2 pi )/( omega )$ , 可得 $omega =2$ ; 

若选②: $f ( - ( pi )/(6 ) ) = 0$ , 可得 $omega dot.op (- ( pi )/(6 ) )+ ( pi )/(3 ) =k pi$ , $k in ZZ$ , 而 $0< omega <3$ , 解得 $omega =2$ ; 

若选③: 对任意的 $x in RR$ , $f ( x ) <= f ( ( pi )/(12 ) )$ , 可得 $f( ( pi )/(12 ) )=sin( ( pi )/(12 ) omega + ( pi )/(3 ) )$ , 

则 $( pi )/(12 ) omega + ( pi )/(3 ) = ( pi )/(2 ) +2 k pi$ , $k in ZZ$ , 而 $0< omega <3$ , 解得 $omega =2$ ; 
#table(
 columns: 6,
 align: center + horizon,
 [$2 x+ ( pi )/(3 )$], [$0$], [$( pi )/(2 )$], [$pi$], [$(3 pi )/(2 )$], [$2 pi$], [$x$], [$- ( pi )/(6 )$], [$( pi )/(12 )$], [$( pi )/(3 )$], [$(7 pi )/(12 )$], [$(5 pi )/(6 )$], [$f(x)$], [$0$], [$1$], [$0$], [$-1$], [$0$]
)
如图所示: 

 #image("dumb.png", width: 25%) 

(2) 将函数 $f(x)$ 的图象向右平移 $( pi )/(3 )$ 个单位后, 可得 $y=sin[2(x- ( pi )/(3 ) )+ ( pi )/(3 ) ]=sin(2 x- ( pi )/(3 ) )$ , 

再将此时图象上各点的纵坐标不变, 横坐标变为原来的 $2$ 倍, 得到函数 $y=g(x)$ 的图象, 可得 $g(x)=sin(x- ( pi )/(3 ) )$ , 

因为关于 $x$ 的方程 $g(x)-k=0$ , 可得 $g(x)=k$ ,

因为 $x in [0, pi ]$ , 可得 $x- ( pi )/(3 ) in [- ( pi )/(3 )$ , $(2 pi )/(3 ) ]$ , 

因为关于 $x$ 的方程 $g(x)-k=0$ , 在区间 $[0, pi ]$ 上有且只有一个实数解, 

当 $x- ( pi )/(3 ) in [- ( pi )/(3 )$ , $( pi )/(3 ) )$ 时, 即 $g(x)=sin(x- ( pi )/(3 ) ) in [- (sqrt(3 ) )/(2 )$ , $(sqrt(3 ) )/(2 ) )$ , 且函数 $g(x)$ 单调递增, 当 $x- ( pi )/(3 ) = ( pi )/(2 )$ 时, $g(x)=1$ , 

当 $in [ ( pi )/(3 )$ , $(2 pi )/(3 ) ]$ , 且 $x- ( pi )/(3 ) != ( pi )/(2 )$ 时, $g(x)=k$ 有两个交点, 

综上所述: $k$ 的取值范围为 ${k|- (sqrt(3 ) )/(2 ) <= k< (sqrt(3 ) )/(2 )$ 或 $k=1}$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/7P15y3Ms98PG47dEjfAHxA6zXgLvdQM5RU2NbHLUMB6wNVCZ27iDnE
(17分) 著名的 "悬链线拱桥问题" 与数学中的双曲函数相关. 函数 $f(x)= (e ^(x ) - e ^(- x ) )/(2 )$ 叫做双曲正弦函数, 函数 $g(x)= (e ^(x ) + e ^(- x ) )/(2 )$ 叫做双曲余弦函数, 其中 $e approx 2.71828$ …是自然对数的底数. 

(1) 下列两个命题中至少有一个为真命题, 并证明其中的一个真命题: 

① $[g(x)]^(2)+[f(x)]^(2)=1$ ; ② $g(2 x)=[g(x)]^(2)+[f(x)]^(2)$ ; 

(2) 证明: 函数 $F(x)=ln x+sin ( pi )/(6 ) x$ 在 $(0, + infinity )$ 上有且仅有一个零点 $x_(0)$ , 且 $f ( sin ( pi )/(6 ) x _(0 ) ) < (3 )/(4 )$ .

#solution[
(1)经判断①不是真命题, ②是真命题; 

证明: 将 $f ( x ) = (e ^(x ) - e ^(- x ) )/(2 )$ 和 $g ( x ) = (e ^(x ) + e ^(- x ) )/(2 )$ , 

代入可得 $[ g ( x ) ] ^(2 ) + [ f ( x ) ] ^(2 ) = (e ^(2 x ) + e ^(- 2 x ) + 2 )/(4 ) + (e ^(2 x ) + e ^(- 2 x ) - 2 )/(4 ) = (e ^(2 x ) + e ^(- 2 x ) )/(2 ) = g ( 2 x )$ ; 

(2) 证明: ①当 $x in (0, 3]$ 时, $( pi )/(6 ) x in ( 0 , ( pi )/(2 ) ]$ , 

所以 $F ( x ) = ln x + sin ( pi )/(6 ) x$ 在 $(0, 3]$ 内单调递增, 

又 $F ( (1 )/(2 ) ) = sin ( pi )/(12 ) - ln 2$ , 

由于 $sin ( pi )/(12 ) < sin ( pi )/(6 ) = (1 )/(2 )$ , 而 $ln 2 > ln sqrt(e ) = (1 )/(2 )$ , 

所以 $F ( (1 )/(2 ) ) < 0$ , 又 $F ( 1 ) = (1 )/(2 ) > 0$ , 

所以由零点存在定理得 $F(x)$ 在 $(0, 3]$ 内有唯一零点 $x_(0)$ , 使得 $F(x_(0))=0$ ; 

②当 $x in (3, + infinity )$ 时, $ln x > 1 , - 1 <= sin ( pi )/(6 ) x <= 1$ , $F ( x ) = ln x + sin ( pi )/(6 ) x > 0$ 恒成立, 

则 $F(x)$ 在 $(3, + infinity )$ 上无零点. 

综上, $F(x)$ 在 $(0, + infinity )$ 上有且仅有一个零点 $x_(0)$ , 

 由①知 $x_(0) in ( (1 )/(2 )$ , $1)$ , 且 $F ( x _(0 ) ) = ln x _(0 ) + sin ( pi )/(6 ) x _(0 ) = 0$ , 

则 $sin ( pi )/(6 ) x _(0 ) = - ln x _(0 )$ , $f ( sin ( pi )/(6 ) x _(0 ) ) = f ( - ln x _(0 ) ) = (1 )/(2 ) ( (1 )/(x _(0 ) ) - x _(0 ) )$ , 

因为函数 $h ( x _(0 ) ) = (1 )/(2 ) ( (1 )/(x _(0 ) ) - x _(0 ) )$ 在 $( (1 )/(2 ) , 1 )$ 上单调递减, 

得 $(1 )/(2 ) ( (1 )/(x _(0 ) ) - x _(0 ) ) < h ( (1 )/(2 ) ) = (3 )/(4 )$ , 

 所以 $f ( sin ( pi )/(6 ) x _(0 ) ) < (3 )/(4 )$ .
]
]

