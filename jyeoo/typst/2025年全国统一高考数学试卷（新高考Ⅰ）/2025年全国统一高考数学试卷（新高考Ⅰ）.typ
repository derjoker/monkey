#import "/conf/exam.typ": *
#show: exam-rules
#title[2025年全国统一高考数学试卷(新高考Ⅰ)]

= 选择题: 本大题共8小题, 每小题5分, 共计40分. 每小题给出的四个选项中, 只有一个选项是正确的. 请把正确的选项填涂在答题卡相应的位置上. 

#example[
// https://www.jyeoo.com/math2/ques/detail/7dhMmcuEeQMfXRRSdQDA8YbirVsvDse7fWf9aX4rWYHwKuQPv9J8Ii
(5分) $(1+5 i)i$ 的虚部为 #parentheses
#choices(
  ([$-1$], [$0$], [$1$], [$6$]),
  colNum: 4
)

#solution[
令 $z=(1+5 i)i$ ,则 $z=5 i^(2)+i=-5+i$ ,

所以 $z$ 的虚部为 $1$ . 

故选: $C$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/4x75A4Q6aifOqKu5TuU5HVfnug3DwkZs2T0apeWxnYGjSbH3veM3Rg
(5分) 设全集 $U={x|x$ 是小于 $9$ 的正整数 $}$ , 集合 $A={1, 3, 5}$ , 则 $∁_(U)A$ 中元素个数为 #parentheses
#choices(
  ([$2$], [$3$], [$5$], [$8$]),
  colNum: 4
)

#solution[
根据题意, $C_(U)A={2, 4, 6, 7, 8}$ , 

所以 $C_(U)A$ 的元素个数为 $5$ . 

故选: $C$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8Wq7M4N18eykSc0UgbxqCi312zM1lfY11paxzcBSooVuS3IdQ5WPOC
(5分) 若双曲线 $C$ 的虚轴长为实轴长的 $sqrt(7 )$ 倍, 则 $C$ 的离心率为 #parentheses
#choices(
  ([$sqrt(2 )$], [$2$], [$sqrt(7 )$], [$2 sqrt(2 )$]),
  colNum: 2
)

#solution[
根据题意可得 $2 b= sqrt(7 ) times 2 a$ ,

所以 $(b )/(a ) = sqrt(7 )$ , 

所以双曲线 $C$ 的离心率为 $(c )/(a ) = sqrt(1 + ( (b )/(a ) ) ^(2 ) ) = sqrt(1 + 7 ) = 2 sqrt(2 )$ . 

故选: $D$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8LcUH4sM58pjrJkML5lmIt2D8VaE4qSlcMbEx8KOFsd6eMRUJ6bbMG
(5分) 若点 $(a,0)(a>0)$ 是函数 $y=2 tan(x- ( pi )/(3 ) )$ 的图象的一个对称中心, 则 $a$ 的最小值为 #parentheses
#choices(
  ([$( pi )/(4 )$], [$( pi )/(2 )$], [$( pi )/(3 )$], [$(4 pi )/(3 )$]),
  colNum: 1
)

#solution[
由已知, $a- ( pi )/(3 ) = (k )/(2 ) pi$ , $k in Z$ , 所以 $a= (k )/(2 ) pi + ( pi )/(3 )$ , $k in Z$ , 

因为 $a>0$ , 所以取 $k=0$ 时, 得 $a$ 的最小值为 $60 degree = ( pi )/(3 )$ . 

故选: $C$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/666yl2rV8lNmn5M7OSzhJKfYJPTZRDOVSy6zWOHxwcG7dszLZ7M6me
(5分) 设 $f(x)$ 是定义在 $R$ 上且周期为 $2$ 的偶函数, 当 $2 <= x <= 3$ 时, $f(x)=5-2 x$ ,则 $f(- (3 )/(4 ) )=$ #parentheses
#choices(
  ([$- (1 )/(2 )$], [$- (1 )/(4 )$], [$(1 )/(4 )$], [$(1 )/(2 )$]),
  colNum: 2
)

#solution[
根据题意可得 $f(- (3 )/(4 ) )=f( (3 )/(4 ) )=f( (3 )/(4 ) +2)=f( (11 )/(4 ) )=5-2 times (11 )/(4 ) = - (1 )/(2 )$ . 

故选: $A$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/5ZlrY0L88C8LnWXxxXt6Y6abBmk8jHhC4O79llEhrZWAaIJ533g4Wm
#grid(columns: (1fr, 25%), gutter: 1em, [(5分) 帆船比赛中, 运动员可借助风力计测定风速的大小和方向, 测出的结果在航海学中称为视风风速, 视风风速对应的向量是真风风速对应的向量与船行风速对应的向量之和, 其中船行风速对应的向量与船速对应的向量大小相等, 方向相反. 如表给出了部分风力等级, 名称与风速大小的对应关系. 已知某帆船运动员在某时刻测得的视风风速对应的向量与船速对应的向量如图 $($ 风速的大小和向量的大小相同 $,$ 单位 $m/s)$ , 则真风为 #parentheses 


#table(
 columns: 3,
 align: center + horizon,
 [等级], [风速大小 $m/s$], [名称], [$2$], [$1.1$ ～ $3.3$], [轻风], [$3$], [$3.4$ ～ $5.4$], [微风], [$4$], [$5.5$ ～ $7.9$], [和风], [$5$], [$8.0$ ～ $10.1$], [劲风]
)], [#align(center + top, image("images/605fdbb8.png", width: 100%))])
#choices(
  ([轻风], [微风], [和风], [劲风]),
  colNum: 4
)

#solution[
如图: 视风风速对应向量的坐标为 $v _(1 ) = ( - 3 , - 1 )$ , 

 #image("images/50cf3bd0.png", width: 25%) 

船速对应向量的坐标为 $v _(2 ) =(1, 3)$ , 

所以船行风速对应的向量坐标为 $- v _(2 ) =(-1, -3)$ , 

设真风风速对应向量为 $v$ , 则 $v - v _(2 ) = v _(1 )$ , 

所以 $v = v _(1 ) + v _(2 ) =(-2, 2)$ , 

所以 $| v | = sqrt(( - 2 ) ^(2 ) + 2 ^(2 ) ) =2 sqrt(2 ) approx 2.828 in (1.1, 3.3)$ , 

故真风为轻风. 

故选: $A$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/7WhBqfqicH9UAfNoS2WvaU0uTRQteE42ks2LXSilSMSolLmaC0SAvg
(5分) 若圆 $x^(2)+(y+2)^(2)=r^(2)(r>0)$ 上到直线 $y= sqrt(3 ) x+2$ 的距离为 $1$ 的点有且仅有 $2$ 个, 则 $r$ 的取值范围是 #parentheses
#choices(
  ([$(0, 1)$], [$(1, 3)$], [$(3, + infinity )$], [$(0, + infinity )$]),
  colNum: 2
)

#solution[
圆 $x^(2)+(y+2)^(2)=r^(2)(r>0)$ 的圆心 $(0, -2)$ , 半径为 $r$ ,

圆心到直线 $y= sqrt(3 ) x+2$ 的距离 $d= (| 2 + 2 | )/(sqrt(1 + 3 ) ) =2$ , 

圆 $x^(2)+(y+2)^(2)=r^(2)(r>0)$ 上到直线 $y= sqrt(3 ) x+2$ 的距离为 $1$ 的点有且仅有 $2$ 个, 

可得 $d-1<r<d+1$ , 即 $r in (1, 3)$ . 

故选: $B$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/4qvT30aNf3Ww0JExlJNnje6FyQFVOA9px02vRw5ZVWvthZDIRdIxA8
(5分) 若实数 $x,y,z$ 满足 $2+log_(2)x=3+log_(3)y=5+log_(5)z$ ,则 $x,y,z$ 的大小关系不可能是 #parentheses
#choices(
  ([$x>y>z$], [$x>z>y$], [$y>x>z$], [$y>z>x$]),
  colNum: 2
)

#solution[
令 $x=2$ , 则 $3=2+log_(2)2=3+log_(3)y=5+log_(5)z$ ,

可得 $y=1$ , $z= (1 )/(25 )$ , 

所以 $x>y>z.A$ 可能正确; 

当 $z=1$ 时, $y=9$ , $x=8$ , 所以 $y>x>z$ ,所以 $C$ 可能正确; 

 $z=125$ 时, $y=243$ , 此时 $x=64$ , 满足 $y>z>x$ ,所以 $D$ 可能正确. 

故选: $B$ .
]
]

= 选择题: 本题共3小题, 每小题6分, 共18分. 在每小题给出的选项中, 有多项符合题目要求. 全部选对的得6分, 部分选对的得部分分, 有选错的得0分. 

#example[
// https://www.jyeoo.com/math2/ques/detail/7JHkL8gwaG8lC0SUjSCFfYaS2KNcAjYSIb1h7ThpRieDKjcIO7C2fg
(6分) 在正三棱柱 $A B C-A_(1)B_(1)C_(1)$ 中, $D$ 为 $B C$ 中点, 则 #parentheses
#choices(
  ([$A D tack.t A_(1)C$], [$B C tack.t$ 平面 $A A_(1)D$], [$C C_(1) parallel$ 平面 $A A_(1)D$], [$A D parallel A_(1)B_(1)$]),
  colNum: 1
)

#solution[
#grid(columns: (1fr, 25%), gutter: 1em, [在正三棱柱 $A B C-A_(1)B_(1)C_(1)$ 中, $D$ 为 $B C$ 中点, 

对于 $A$ , 取 $B_(1)C_(1)$ 中点 $D_(1)$ , 连接 $A_(1)D_(1)$ , $C D_(1)$ , 

因为 $A_(1)D_(1) tack.t C D_(1)$ , $A_(1)D_(1) parallel A D$ , 所以 $A_(1)D_(1)$ 与 $A_(1)C$ 不垂直, 即 $A D$ 与 $A_(1)C$ 不垂直, 故 $A$ 错误; 

对于 $B$ , $A D tack.t B C$ , $A A_(1) tack.t B C$ , $A D inter A A_(1)=A$ , 

 $therefore B C tack.t$ 平面 $A A_(1)D$ , 故 $B$ 正确; 

对于 $C$ , $because C C_(1) parallel A A_(1)$ , $C C_(1)⊄$ 平面 $A A_(1)D$ , $A A_(1) subset$ 平面 $A A_(1)D$ , $therefore C C_(1) parallel$ 平面 $A A_(1)D$ , 故 $C$ 正确; 

对于 $D$ , $because A B inter A D=A$ , $A B parallel A_(1)B_(1)$ , 

 $therefore A D$ 与 $A_(1)B_(1)$ 不平行, 故 $D$ 错误. 

故选: $B C$ . 
], [#align(center + top, image("images/82dcaaeb.png", width: 100%))])
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/7DrrHeQL9GhqFCBvUaSwKj3SDsK15eyuPgbONeDee2Iq9qTzU52IU4
(6分) 设抛物线 $C$ : $y^(2)=6 x$ 的焦点为 $F$ , 过 $F$ 的直线交 $C$ 于 $A$ , $B$ , 过 $F$ 且垂直于 $A B$ 的直线交准线 $l$ : $x=- (3 )/(2 )$ 于 $E$ , 过点 $A$ 作准线 $l$ 的垂线, 垂足为 $D$ , 则 #parentheses
#choices(
  ([$|A D|=|A F|$], [$|A E|=|A B|$], [$|A B| >= 6$], [$|A E| dot.op |B E| >= 18$]),
  colNum: 1
)

#solution[
由题意可得 $F ( (3 )/(2 ) , 0 )$ , 

由抛物线的定义知 $|A D|=|A F|$ , 所以 $A$ 正确; 

由通径最短, 可得 $|A B| >= 2 p=6$ , 所以 $C$ 正确; 

设 $A B : x = m y + (3 )/(2 )$ , $A(x_(1)$ , $y_(1))$ , $B(x_(2)$ , $y_(2))$ , 

由 $cases(x = m y + (3 )/(2 ), y ^(2 ) = 6 x)$ , 

 #image("images/71e6c56a.png", width: 25%) 

消 $x$ 可得 $y^(2)-6 m y-9=0$ , 

 $y_(1)+y_(2)=6 m,y_(1)y_(2)=-9$ , 

所以 $x _(1 ) + x _(2 ) = m ( y _(1 ) + y _(2 ) ) + 3 = 6 m ^(2 ) + 3$ , 

所以 $| A B | = x _(1 ) + (3 )/(2 ) + x _(2 ) + (3 )/(2 ) = 6 m ^(2 ) + 6$ , 

当 $m=0$ 时, $E ( - (3 )/(2 ) , 0 )$ , $|A B|=2 p=6$ , $|A E|= sqrt(A F ^(2 ) + E F ^(2 ) ) =3 sqrt(2 )$ , 

此时 $|A B|=6$ , $|A E| != |A B|$ , 所以 $B$ 不正确; 

此时 $| A E | = | B E | = 3 sqrt(2 ) , | A E | dot.op | B E | = 18$ , 

当 $m != 0$ 时, $E F : x = - (1 )/(m ) y + (3 )/(2 )$ , $E ( - (3 )/(2 ) , 3 m )$ , 

则 $|E F|= sqrt(9 + 9 m ^(2 ) )$ , 

所以 $S _( triangle A E B ) = (1 )/(2 ) | A E | dot.op | B E | sin angle A E B = (1 )/(2 ) | A B | dot.op | E F | = (1 )/(2 ) ( 6 m ^(2 ) + 6 ) sqrt(9 + 9 m ^(2 ) ) > 9$ , 

 $| A E | dot.op | B E | > (18 )/(sin angle A E B ) > 18$ , 

综上 $|A E| dot.op |B E| >= 18$ , 所以 $D$ 正确. 

故选: $A C D$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/4mbAyetj9EaYMXU8edKbQv1oWaWQkeOzID18gYrYwaCE1RYQh5YBQe
(6分) 已知 $triangle A B C$ 的面积为 $(1 )/(4 )$ , 若 $cos 2 A+cos 2 B+2 sin C=2$ , $cos A cos B sin C= (1 )/(4 )$ , 则 #parentheses
#choices(
  ([$sin C=sin^(2)A+sin^(2)B$], [$A B= sqrt(2 )$], [$sin A+sin B= (sqrt(6 ) )/(2 )$], [$A C^(2)+B C^(2)=3$]),
  colNum: 1
)

#solution[
因为 $cos 2 A+cos 2 B+2 sin C=1-2 sin^(2)A+1-2 sin^(2)B+2 sin C=2$ , 

 $therefore sin^(2)A+sin^(2)B=sin C$ , 故 $A$ 正确; 

由 $sin^(2)A+sin^(2)B=sin A cos B+cos A sin B$ , $therefore sin A(sin A-cos B)+sin B(sin B-cos A)=0$ , 

 $because cos A cos B sin C= (1 )/(4 ) >0$ , $therefore A$ , $B$ 为锐角, 

若 $A + B > ( pi )/(2 )$ , 则 $cases(A > ( pi )/(2 ) - B, B > ( pi )/(2 ) - A)$ , 

 $therefore sin A>cos B$ , $sin B>cos A$ , $sin A(sin A-cos B)+sin B(sin B-cos A)>0$ , $therefore$ 矛盾, 舍去, 

同理, $A + B < ( pi )/(2 )$ 也矛盾, 

 $therefore A + B = ( pi )/(2 )$ , $therefore B = ( pi )/(2 ) - A$ , $C = ( pi )/(2 )$ , 

由 $cos A cos B sin C= (1 )/(4 )$ , 

可得 $sin A=cos B$ , $sin C=1$ , 可得 $sin A cos A = (1 )/(4 ) => (1 )/(2 ) sin 2 A = (1 )/(4 )$ , $sin 2 A = (1 )/(2 )$ , 

 $S_( triangle A B C)= (1 )/(2 ) a b sin C= (1 )/(2 ) a b= (1 )/(4 )$ , $a b= (1 )/(2 )$ , 

 $a=c sin A$ , $b=c cos A$ , 

 $therefore a b= (1 )/(2 ) =c sin A dot.op c cos A=c^(2)sin A cos A= (1 )/(4 ) c^(2)$ , 

 $therefore c^(2)=2$ , 即 $A B= sqrt(2 )$ , 故 $B$ 正确; 

 $because C = ( pi )/(2 )$ , $therefore sin A+sin B=sin A+cos A$ , $(sin A+cos A)^(2)=1+2 sin A cos A= (3 )/(2 )$ , 

因为 $sin A+cos A>0$ , 所以 $sin A+cos A= (sqrt(6 ) )/(2 )$ , 故 $C$ 正确; 

 $A C^(2)+B C^(2)=A B^(2)=2$ , 故 $D$ 错误. 

故选: $A B C$ .
]
]

= 填空题: 本大题共3小题, 每小题5分, 共计15分. 

#example[
// https://www.jyeoo.com/math2/ques/detail/83Ubc1B40hjOUJYsWuNnMG53EPetvvU9egdHFPOeDpKHW6kF2fDuW8
(5分) 若直线 $y=2 x+5$ 是曲线 $y=e^(x)+x+a$ 的切线, 则 $a=$ #blank .

#solution[
根据题意, $y'=e^(x)+1$ , 令 $y'=e^(x)+1=2$ , 则 $x=0$ , 

在切线 $y=2 x+5$ 中, 当 $x=0$ 时, $y=5$ , 

所以切点坐标为 $(0, 5)$ , 

将 $(0, 5)$ 代入曲线 $y=e^(x)+x+a$ 中, 得 $5=1+a$ ,解得 $a=4$ . 

故答案为: $4$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/87LiyaC23MkJTYmpIhAk0o19nIdVWtQJMg4I3fnA5g3wN4hvj6tHvs
(5分) 若一个正项等比数列的前 $4$ 项和为 $4$ , 前 $8$ 项和为 $68$ , 则该等比数列的公比为 #blank .

#solution[
根据题意可得 $a_(1)+a_(2)+a_(3)+a_(4)=4$ , $a_(5)+a_(6)+a_(7)+a_(8)=68-4=64$ , 

所以 $a_(5)+a_(6)+a_(7)+a_(8)=(a_(1)+a_(2)+a_(3)+a_(4)) times q^(4)=4 times q^(4)=64$ , 

解得 $q=2(q=-2$ 舍 $)$ . 

故答案为: $2$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/7z62reLXctY5FfIFNdDyond64L7cqnmDhy5cYWUiaH5uhGiMu14bNw
(5分) 一个箱子里有 $5$ 个相同的球, 分别以 $1∼5$ 标号, 若每次取一颗, 有放回地取三次, 记至少被取出一次的球的个数为 $X$ , 则数学期望 $E(X)=$ #blank .

#solution[
$X$ 的可能取值为 $1$ , $2$ , $3$ , 

 $P(X=1)= (5 )/(5 times 5 times 5 ) = (1 )/(25 )$ , 

 $P(X=2)= (C _(5 )^(2 ) C _(2 )^(1 ) C _(3 )^(1 ) )/(5 times 5 times 5 ) = (12 )/(25 )$ , 

 $P(X=3)= (A _(5 )^(3 ) )/(5 times 5 times 5 ) = (12 )/(25 )$ , 

 $E ( X ) = (1 )/(25 ) + (24 )/(25 ) + (36 )/(25 ) = (61 )/(25 )$ . 

故答案为: $(61 )/(25 )$ .
]
]

= 解答题: 本题共5小题, 共77分. 解答应写出文字说明, 证明过程或演算步骤. 

#example[
// https://www.jyeoo.com/math2/ques/detail/6gLHi8jEafvF3CZGJTOJ6v0Dz4gjruFXNM2ip4OBfCOpaXApE7qbEe
(13分) 为研究某疾病与超声波检查结果的关系, 从做过超声波检查的人群中随机调查了 $1000$ 人, 得到如下列联表: 


#table(
 columns: 4,
 align: center + horizon,
 [超声波检查结果

组别], [正常], [不正常], [合计], [患该疾病], [$20$], [$180$], [$200$], [未患该疾病], [$780$], [$20$], [$800$], [合计], [$800$], [$200$], [$1000$]
)
(1) 记超声波检查结果不正常者患该疾病的概率为 $P$ , 求 $P$ 的估计值; 

(2) 根据小概率值 $alpha =0.001$ 的独立性检验, 分析超声波检查结果是否与患该疾病有关. 

附: $χ^(2)= (n ( a d - b c ) ^(2 ) )/(( a + b ) ( c + d ) ( a + c ) ( b + d ) )$ 


#table(
 columns: 4,
 align: center + horizon,
 [$P(χ^(2) >= k)$], [$0.050$], [$0.010$], [$0.001$], [$k$], [$3.841$], [$6.635$], [$10.828$]
)

#solution[
(1)由题知, 样本中超声波检查结果不正常者患该疾病的概率为 $(180 )/(200 ) = (9 )/(10 )$ , 

由样本估计总体可得超声波检查结果不正常者患该疾病的概率 $P= (9 )/(10 )$ ; 

(2) 零假设 $H_(0)$ 为: 超声波检查结果与患该疾病无关. 

代入 $2 times 2$ 列联表中的数据可得: $χ^(2)= (1000 ( 20 times 20 - 180 times 780 ) ^(2 ) )/(800 times 200 times 200 times 800 ) = (6125 )/(8 ) =765.625>10.828$ , 

根据小概率值 $alpha =0.001$ 的独立性检验, 我们推断 $H_(0)$ 不成立, 即认为超声波检查结果与患该疾病有关, 

该推断犯错误的概率不超过 $0.001$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/8WudNcyXfTSmrYa3JsmqwJ6HT0o9ZwwgQh9Ay4ZdrYLJJwFjm7vr7Y
(15分) 设数列 ${a_(n)}$ 满足 $a_(1)=3$ , $(a _(n + 1 ) )/(n ) = (a _(n ) )/(n + 1 ) + (1 )/(n ( n + 1 ) )$ . 

(1) 证明: ${n a_(n)}$ 为等差数列; 

(2) 设 $f(x)=a_(1)x+a_(2)x^(2)+⋯+a_(m)x^(m)$ , 求 $f'(-2)$ .

#solution[
(1)证明: 因为 $(a _(n + 1 ) )/(n ) = (a _(n ) )/(n + 1 ) + (1 )/(n ( n + 1 ) )$ , 

所以 $(n+1)a_(n+1)=n a_(n)+1$ , 即 $(n+1)a_(n+1)-n a_(n)=1$ , 

因为 $a_(1)=3$ , 所以数列 ${n a_(n)}$ 是首项为 $3$ , 公差为 $1$ 的等差数列; 

(2) 由(1)知, $n a_(n)=3+n-1=n+2$ , 

因为 $f(x)=a_(1)x+a_(2)x^(2)+⋯+a_(m)x^(m)$ , 

所以 $f ' ( x ) = a _(1 ) + 2 a _(2 ) x + ... + m a _(m ) x ^(m - 1 ) =3+4 x+5 x^(2)+...+(m+1)x^(m-2)+(m+2)x^(m-1)$ , 

所以 $f'(-2)=3+4 times (-2)+5 times (-2)^(2)+...+(m+1)(-2)^(m-2)+(m+2)(-2)^(m-1)$ , ①

 $-2 f'(-2)=3 times (-2)+4 times (-2)^(2)+5 times (-2)^(3)+...+(m+1)(-2)^(m-1)+(m+2)(-2)^(m)$ , ②

① $-$ ②得: $3 f'(-2)=3+(-2)^(1)+(-2)^(2)+(-2)^(3)+...+(-2)^(m-1)-(m+2)(-2)^(m) = 3 + (- 2 [ 1 - ( - 2 ) ^(m - 1 ) ] )/(1 - ( - 2 ) ) -(m+2)(-2)^(m)= (7 )/(3 ) - (3 m + 7 )/(3 ) dot.op ( - 2 ) ^(m )$ , 

所以 $f ' ( - 2 ) = (7 )/(9 ) - (3 m + 7 )/(9 ) dot.op ( - 2 ) ^(m )$ , $m in N*$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/7OYOFd3248e22gsaj4qdu99KlLY8Fb5MbI3pn3pGRsA6nYRg958AGe
#grid(columns: (1fr, 25%), gutter: 1em, [(15分) 如图所示的四棱锥 $P-A B C D$ 中, $P A tack.t$ 平面 $A B C D$ , $B C parallel A D$ , $A B tack.t A D$ . 

(1) 证明: 平面 $P A B tack.t$ 平面 $P A D$ ; 

(2) 若 $P A=A B= sqrt(2 )$ , $A D= sqrt(3 ) +1$ , $B C=2$ , $P$ , $B$ , $C$ , $D$ 在同一个球面上, 设该球面的球心为 $O$ . 

 $(i)$ 证明: $O$ 在平面 $A B C D$ 上; 

 $(i i)$ 求直线 $A C$ 与直线 $P O$ 所成角的余弦值.], [#align(center + top, image("images/3122cee4.png", width: 100%))])

#solution[
(1)证明: $because P A tack.t$ 平面 $A B C D$ , $A B subset$ 平面 $A B C D$ , 

 $therefore P A tack.t A B$ , 

 $because A B tack.t A D$ , $A D inter P A=A$ , $A D$ , $P A subset$ 平面 $P A D$ , 

 $therefore A B tack.t$ 平面 $P A D$ , 

 $because A B subset$ 平面 $P A B$ , 

 $therefore$ 平面 $P A B tack.t$ 平面 $P A D$ . 

(2) $(i)$ 证明: 由题意, $A B$ , $A D$ , $A P$ 两两垂直, 分别以 $A B$ , $A D$ , $A P$ 为 $x,y,z$ 轴, 建立空间直角坐标系 $A-x y z$ ,

 #image("images/2ffaf95c.png", width: 25%) 

则 $B ( sqrt(2 ) , 0 , 0 )$ , $C ( sqrt(2 ) , 2 , 0 )$ , $D ( 0 , sqrt(3 ) + 1 , 0 )$ , $P ( 0 , 0 , sqrt(2 ) )$ , 

设球心 $O(x,y,z)$ , 半径 $R$ , 

则 $cases(O P = R, O B = R, O C = R, O D = R)$ , 即 $cases(sqrt(x ^(2 ) + y ^(2 ) + ( z - sqrt(2 ) ) ^(2 ) ) = R, sqrt(( x - sqrt(2 ) ) ^(2 ) + y ^(2 ) + z ^(2 ) ) = R, sqrt(( x - sqrt(2 ) ) ^(2 ) + ( y - 2 ) ^(2 ) + z ^(2 ) ) = R, sqrt(x ^(2 ) + ( y - sqrt(3 ) - 1 ) ^(2 ) + z ^(2 ) ) = R)$ , 解得 $cases(x = 0, y = 1, z = 0, R = sqrt(3 ))$ , 

 $therefore O(0, 1, 0)$ , $therefore O in$ 平面 $A B C D$ . 

 $(i i)$ 由 $(i)$ 得 $A C = ( sqrt(2 ) , 2 , 0 )$ , $P O = ( 0 , 1 , - sqrt(2 ) )$ , 

设直线 $A C$ 与直线 $P O$ 所成角为 $theta$ , 

则 $cos theta = | cos < A C , P O > | = (| A C dot.op P O | )/(| A C | dot.op | P O | ) = (2 )/(sqrt(6 ) times sqrt(3 ) ) = (sqrt(2 ) )/(3 )$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/4rqJU14A5JHtmXW2bgxVlJ58JdTGYlf6Qg51aF9rcieYpwPZh87n3g
(17分) 已知椭圆 $C$ : $(x ^(2 ) )/(a ^(2 ) ) + (y ^(2 ) )/(b ^(2 ) ) =1(a>b>0)$ 的离心率为 $(2 sqrt(2 ) )/(3 )$ , 椭圆下顶点为 $A$ , 右顶点为 $B$ , $|A B|= sqrt(10 )$ . 

(1) 求椭圆的标准方程; 

(2) 已知动点 $P$ 不在 $y$ 轴上, 点 $R$ 在射线 $A P$ 上, 且满足 $|A R| dot.op |A P|=3$ . 

 $(i)$ 设 $P(m,n)$ , 求点 $R$ 的坐标 $($ 用 $m,n$ 表示 $)$ ; 

 $(i i)$ 设 $O$ 为坐标原点, $Q$ 是 $C$ 上的动点, 直线 $O R$ 的斜率是直线 $O P$ 的斜率的 $3$ 倍, 求 $|P Q|$ 的最大值.

#solution[
(1) 由题意知, $A(0, -b)$ , $B(a,0)$ , 所以 $|A B|= sqrt(a ^(2 ) + b ^(2 ) ) = sqrt(10 )$ , 所以 $a^(2)+b^(2)=10$ ; 

又因为 $e= (c )/(a ) = (2 sqrt(2 ) )/(3 )$ , 所以 $c= (2 sqrt(2 ) )/(3 ) a$ ,所以 $c^(2)=a^(2)-b^(2)= (8 )/(9 ) a^(2)$ , 所以 $a^(2)=9 b^(2)$ ; 

所以 $b^(2)=1$ , $a^(2)=9$ , 椭圆 $C$ : $(x ^(2 ) )/(9 ) +y^(2)=1$ ; 

(2) $(i)$ 设点 $P(m,n)$ , $R(x,y)$ , 由题意知, $A(0, -1)$ , $| A P | dot.op | A R |=3$ , $A P =(m,n+1)$ , $A R =(x,y+1)$ , 其中 $m != 0$ ; 

所以 $A P dot.op A R =3$ , 即 $m x+(n+1)(y+1)=3$ ①, 

又因为 $R$ 在 $A P$ 上, 所以 $y= (n + 1 )/(m ) x-1$ , 即 $(n+1)x-m y=m$ ②; 

由①②联立求解得 $cases(x = (3 m )/(m ^(2 ) + ( n + 1 ) ^(2 ) ), y = (- m ^(2 ) - n ^(2 ) + n + 2 )/(m ^(2 ) + ( n + 1 ) ^(2 ) ))$ , 

所以点 $R$ 的坐标为 $( (3 m )/(m ^(2 ) + ( n + 1 ) ^(2 ) )$ , $(- m ^(2 ) - n ^(2 ) + n + 2 )/(m ^(2 ) + ( n + 1 ) ^(2 ) ) )$ ; 

 $(i i)$ 方法一, 直线 $O R$ 的斜率为 $k_(1)= (- m ^(2 ) - n ^(2 ) + n + 2 )/(3 m )$ , 直线 $O P$ 的斜率为 $k_(2)= (n )/(m )$ , 

若 $k_(1)=3 k_(2)$ , 则 $(- m ^(2 ) - n ^(2 ) + n + 2 )/(3 m ) = (3 n )/(m )$ , 即 $m^(2)+(n+4)^(2)=18$ , 

所以点 $P$ 在以 $(0, -4)$ 为圆心, $3 sqrt(2 )$ 为半径的圆上, 又 $Q$ 为椭圆 $x^(2)+9 y^(2)=9$ 上一点, 

设 $Q(x', y')$ , 则 $x'^(2)+9 y'^(2)=9$ , 

所以 $|P Q|$ 长度为 $sqrt(x ' ^(2 ) + ( y ' + 4 ) ^(2 ) ) +3 sqrt(2 ) = sqrt(9 - 9 y ' ^(2 ) + ( y ' + 4 ) ^(2 ) ) +3 sqrt(2 ) = sqrt(- 8 ( y '- (1 )/(2 ) ) ^(2 ) + 27 ) +3 sqrt(2 )$ , 

因为 $-1 <= y' <= 1$ , 所以 $y'= (1 )/(2 )$ 时, $|P Q|$ 的长度取得最大值为 $3 sqrt(3 ) +3 sqrt(2 )$ . 

方法二, 点 $P$ 所在的圆心为 $M(0, -4)$ , 半径为 $3 sqrt(2 )$ ; 

椭圆 $(x ^(2 ) )/(9 ) +y^(2)=1$ 上的点 $Q$ 设为 $(3 cos theta , sin theta )$ , $theta in [0, 2 pi )$ ; 

则 $|M Q|= sqrt(9 cos ^(2 ) theta + ( sin theta + 4 ) ^(2 ) ) = sqrt(- 8 sin ^(2 ) theta + 8 sin theta + 25 ) = sqrt(- 8 ( sin theta - (1 )/(2 ) ) ^(2 ) + 27 )$ , 

所以 $sin theta = (1 )/(2 )$ 时, $|M Q|$ 取得最大值为 $3 sqrt(3 )$ , 此时 $|P Q|$ 取得最大值是 $3 sqrt(3 ) +3 sqrt(2 )$ .
]
]

#example[
// https://www.jyeoo.com/math2/ques/detail/7jxal4mH5cqJuartfbYCn811g0RVeclq3YewJXbIDMHquiFLY7gzfk
(17分) 设函数 $f(x)=5 cos x-cos 5 x$ .

(1) 求 $f(x)$ 在 $[0, ( pi )/(4 ) ]$ 的最大值; 

(2) 给定 $theta in (0, pi )$ , $a$ 为给定实数, 证明: 存在 $y in [a- theta , a+ theta ]$ , 使得 $cos y <= cos theta$ ; 

(3) 若存在 $phi$ 使得对任意 $x$ ,都有 $5 cos x-cos(5 x+ phi ) <= b$ ,求 $b$ 的最小值.

#solution[
(1) 解: 由已知得: $f'(x)=-5 sin x+5 sin 5 x=5[sin(3 x+2 x)-sin(3 x-2 x)] =5(sin 3 x dot.op cos 2 x+cos 3 x dot.op sin 2 x-sin 3 x dot.op cos 2 x+cos 3 x dot.op sin 2 x) =10 cos 3 x dot.op sin 2 x$ ,

因为 $x in [ 0 , ( pi )/(4 ) ]$ , 所以 $2 x in [ 0 , ( pi )/(2 ) ]$ , $3 x in [ 0 , (3 pi )/(4 ) ]$ , 

所以 $sin 2 x >= 0$ , 故只需判断 $cos 3 x$ 的符号即可, 由 $cos 3 x=0$ , 解得 $x = ( pi )/(6 )$ , 

所以当 $x in ( 0 , ( pi )/(6 ) )$ 时, $f'(x)>0$ , 当 $x in ( ( pi )/(6 ) , ( pi )/(4 ) )$ 时, $f'(x)<0$ , 

所以 $f(x)$ 在 $x in ( 0 , ( pi )/(6 ) )$ 单调递增, 在 $x in ( ( pi )/(6 ) , ( pi )/(4 ) )$ 单调递减, 

所以 $f ( x ) _(max ) = f ( ( pi )/(6 ) ) = 3 sqrt(3 )$ ; 

(2) 证明: 若 $theta in ( 0 , ( pi )/(2 ) ]$ , 则 $( cos y ) _(min ) <= (cos ( a - theta ) + cos ( a + theta ) )/(2 ) = cos a cos theta <= cos theta$ , 

若 $theta in ( ( pi )/(2 ) , pi )$ , 不妨 $a in [0, 2 pi )$ , 

①若 $pi in (a- theta , a+ theta )$ , 则 $(cos y)_(min)=-1 <= cos theta$ ; 

②若 $a+ theta <= pi$ , 此时 $a + theta , theta in ( ( pi )/(2 ) , pi )$ , 所以 $cos(a+ theta )<cos theta$ , 

令 $y=a+ theta$ , 可知存在 $y in [a- theta , a+ theta ]$ , 使得 $cos y <= cos theta$ ; 

③若 $a- theta >= pi$ , 此时 $pi <a- theta <2 pi - theta < (3 pi )/(2 )$ , 所以 $cos(a- theta )<cos(2 pi - theta )=cos theta$ , 

令 $y=a- theta$ , 可知存在 $y in [a- theta , a+ theta ]$ , 使得 $cos y <= cos theta$ ; 

综上, 存在 $y in [a- theta , a+ theta ]$ , 使得 $cos y <= cos theta$ , 证毕. 

法二: 因为 $cos y <= cos theta$ , 

 #image("images/fc2d02f6.png", width: 25%) 

所以需要满足 $2 k pi + theta <= y <= 2 k pi +2 pi - theta$ , 

又因为 $y in [a- theta , a+ theta ]$ , 

所以需满足 $[a- theta , a+ theta ] inter [2 k pi + theta , 2 k pi +2 pi - theta ] != emptyset$ , 

 #image("images/9cf8f83a.png", width: 25%) 

据图分析, $[a- theta , a+ theta ] inter [2 k pi + theta , 2 k pi +2 pi - theta ] != emptyset$ 显然成立, 

所以存在 $y in [a- theta , a+ theta ]$ , 使得 $cos y <= cos theta$ ; 

(3) 解: 令 $h(x)=5 cos x-cos(5 x+ phi )$ , $h'(x)=-5 sin x+5 sin(5 x+ phi )$ , 

由于 $h(x)$ 周期为 $2 pi$ , 不妨设 $x in [- pi , pi ]$ , $phi in [- pi , pi ]$ , 

因为 $h(x)$ 连续且处处可导, 所以 $h(x)$ 最大值在根值点处取得, 

令 $h'(x)=0$ , $sin(5 x+ phi )=sin x$ ,所以 $5 x+ phi =x+2 k_(1) pi$ 或 $5 x+ phi = pi -x+2 k_(2) pi$ , 

所以 $x = - ( phi )/(4 ) + (k _(1 ) pi )/(2 )$ 或 $x = ( pi )/(6 ) - ( phi )/(6 ) + (k _(2 ) pi )/(3 ) ( k _(1 ) , k _(2 ) in Z )$ , 

当 $x = - ( phi )/(4 ) + (k _(1 ) pi )/(2 )$ 时, $h ( x ) = 5 cos x - cos x = 4 cos x = 4 cos ( - ( phi )/(4 ) + (k _(1 ) )/(2 ) pi )$ , 

当 $x = ( pi )/(6 ) - ( phi )/(6 ) + (k _(2 ) pi )/(3 )$ , $h ( x ) = 5 cos x - cos ( pi - x + 2 k _(2 ) pi ) = 6 cos x = 6 cos ( ( pi )/(6 ) - ( phi )/(6 ) + (k _(2 ) )/(3 ) pi )$ , 

所以 $h(x)_(max)=max{4 cos(- ( phi )/(4 ) + (k _(1 ) )/(2 ) pi )$ , $6 cos( ( pi )/(6 ) - ( phi )/(6 ) + (k _(2 ) )/(3 ) pi )}$ , 

显然 $4 cos ( - ( phi )/(4 ) + (k _(1 ) )/(2 ) pi ) <= 4 , 记 q ( phi ) = 6 cos ( ( pi )/(6 ) - ( phi )/(6 ) + (k _(2 ) )/(3 ) pi )$ , 

取值情况最多有 $6$ 种, 相当于 $p(x)=6 cos x$ 图象上以 $A ( ( pi )/(6 ) - ( phi )/(6 ) , p ( ( pi )/(6 ) - ( phi )/(6 ) ) )$ 为起点, 横坐标以 $( pi )/(3 )$ 为跨度, 往后总共取 $6$ 个点, 

当 $phi$ 取不同的值时 $q(x)$ 的最大值中的最小值为 $phi =0$ 时, $q(x)$ 的最大值是 $3 sqrt(3 )$ , $b$ 的最小值等价于 $phi$ 的不同取值时 $q(x)$ 最大值中的最小值, 

由 $p(x)$ 图象可知, $phi =0$ 时, $q( phi )$ 取最小值 $3 sqrt(3 ) , 3 sqrt(3 ) > 4$ , 

所以 $b >= 5 cos x-cos(5 x+ phi )$ , 所以 $b >= q ( phi ) _(min ) = 3 sqrt(3 )$ , 

此时 $h ( x ) <= 3 sqrt(3 )$ 恒成立, 且 $x =± ( pi )/(6 )$ 时取等号, 所以 $b$ 的最小值为 $3 sqrt(3 )$ . 

法二: $g(x)=5 cos x-cos(5 x+ phi )$ , $g(x)_(max)=h( phi )$ , 故只需 $h( phi ) <= b$ 成立, 

只要 $h( phi )_(min) <= b$ 成立, 不妨令 $phi in [0, 2 pi ]$ , 

 $g'(x)=-5 sin x+5 sin(5 x+ phi )=0$ , 

 $5 x+ phi =x+2 k pi$ 或 $5 x+ phi = pi -x+2 k pi$ , $k in Z$ , 

 $x= (k pi )/(2 ) - ( phi )/(4 )$ 或 $x= (k pi )/(3 ) + ( pi - phi )/(6 )$ ; 

当 $x= (k pi )/(2 ) - ( phi )/(4 )$ 时, $g( (k pi )/(2 ) - ( phi )/(4 ) )=4 cos( (k pi )/(2 ) - ( phi )/(4 ) )$ , ①

当 $x= (k pi )/(3 ) + ( pi - phi )/(6 )$ 时, $g( (k pi )/(3 ) + ( pi - phi )/(6 ) )=6 cos( (k pi )/(3 ) + ( pi - phi )/(6 ) )$ , ②

① $- ( phi )/(4 ) < ( pi )/(2 ) - ( phi )/(4 ) < pi - ( phi )/(4 ) < (3 pi )/(2 ) - ( phi )/(4 )$ , 分别对应 $x_(1)<x_(2)<x_(3)<x_(4)$ , 

 $g( (k pi )/(2 ) - ( phi )/(4 ) )_(max)=max{4 cos ( phi )/(4 )$ , $4 sin ( phi )/(4 ) }$ , #image("images/0a9781ac.png", width: 25%) 

② $k=0$ , $1$ , $2$ , $3$ , $4$ , $5$ , 

 $( pi - phi )/(6 ) < ( pi )/(3 ) + ( pi - phi )/(6 ) < (2 pi )/(3 ) + ( pi - phi )/(6 ) < pi + ( pi - phi )/(6 ) < (4 pi )/(3 ) + ( pi - phi )/(6 ) < (5 pi )/(3 ) + ( pi - phi )/(6 )$ , 分别对应 $x_(1)<x_(2)<x_(3)<x_(4)<x_(5)<x_(6)$ , 

 $x_(6)-x_(1)= (5 pi )/(3 )$ , $- ( pi )/(6 ) <x_(1) < ( pi )/(6 )$ , $(3 pi )/(2 ) <x_(6) < (11 pi )/(6 )$ , 

 #image("images/6c16d41c.png", width: 25%) 

根据图象可得在 $x_(1)$ 处取得最大值, 

 $g( (k pi )/(3 ) + ( pi - phi )/(6 ) )_(max)=g( ( pi - phi )/(6 ) )=6 cos ( pi - phi )/(6 )$ , 

 $6 cos ( pi - phi )/(6 ) <= b,3 sqrt(3 ) <= b,b_(min)=3 sqrt(3 )$ .
]
]

