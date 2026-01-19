# Math Textbook Formatting Specification (v2)

This document outlines the formatting standards for math textbooks containing mixed Chinese, English, numbers, and formulas.

## 规范化

### 修复

使用 `typst compile` 编译文件并修复问题

### 标题

- 将 <Label> 之前的行设为标题
- 讲次或者模块作为一级标题
- 将青铜、白银、黄金、铂金识别为第 4 级别标题, 即使原本不是标题
- 其余设为三级标题
- 标题前后都有空行
- 删除 <Label>
- 知识点睛, 实战演练, 真题速递, 拓展提升
    - 改标题为加粗文本，并确保上下有空行

- 识别选择题选项, 拆成 4 行
    - 注意, 原文件不规范, 选项可能分成多行, 单个选项也可能是断开的

<!-- ## 处理步骤

### 后处理

- 将四级标题包装到 `#bronze-block`, `#silver-block`, `#gold-block`, `#platinum-block` 中
- 将真题速递和拓展提升改成加粗文本，并确保上下有空行 -->

## Punctuation (标点符号)

All punctuation must be **half-width (半角)**.

*   **Comma**: `,` (Followed by a space)
    *   *Incorrect*: `，`
*   **Period**: `.` (Followed by a space)
    *   *Incorrect*: `。`
*   **Colon**: `:` (Followed by a space)
    *   *Incorrect*: `：`
*   **Semicolon**: `;` (Followed by a space)
    *   *Incorrect*: `；`
*   **Parentheses**: `(` and `)`
    *   *Incorrect*: `（` and `）`
    *   Space before `(` usually required unless immediately following a function name.
*   **Question Mark**: `?`
    *   *Incorrect*: `？`
*   **Exclamation Mark**: `!`
    *   *Incorrect*: `！`

**Note**: When using half-width punctuation in Chinese text, ensure there is a **space** after the punctuation mark, just as in English, to maintain readability.

## Spacing (空格规范)

Proper spacing is crucial for readability in mixed-language documents.

### Mixed Content Separation
*   **Chinese & English**: Add a space.
    *   *Example*: `This is a 数学 book.`
*   **Chinese & Numbers**: Add a space.
    *   *Example*: `There are 50 students.` (共有 50 名学生)
*   **Chinese & Formulas**: Add a space.
    *   *Example*: `If $x > 0$, then...` (若 $x > 0$, 则...)
*   **No Space**:
    *   Between numbers and `%` or degrees `°`.
        *   *Example*: `50%`, `90°`

### Punctuation Spacing
*   **After Punctuation**: Add a single space after `,`, `.`, `:`, `;`, `?`, `!`.
*   **Parentheses**:
    *   Outer space: Add a space outside the parentheses (e.g., `text (note)`).
    *   Inner space: No space inside (e.g., `(note)` is correct, `( note )` is wrong).

**Note**: Typst 公式中 `$$` 是不必要的。

### Backslash (反斜杠)
*   原文件中有许多不必要的反斜杠, 完成下列替换
    *   `\,` -> `,`
    *   `\;` -> `;`
    *   `\(` -> `(`
    *   `\)` -> `)`
    *   `\[` -> `[`
    *   `\]` -> `]`
*   注意, `$cases()$` 中的 `\` 是必要的。

## Images (图片)
*   **格式**: `#image("path/to/image.jpg", width: 25%)`
*   **宽度**: 常用宽度为 `20%` 到 `50%`，根据排版需要调整, 题目里的图片通常为 `25%`。
*   **位置**: 图片通常直接嵌入在题目文字下方或通过 `#grid` 并排布局。

## Mathematical Formulas (数学公式)

### Inline & Block
*   **Inline**: Enclose in `$`. 
    *   *Example*: Let $f(x) = x^2$.
*   **Display/Block**: Typst automatically handles block math if it's on its own line, but use standard spacing around it.
*   **Spacing**: Do not add a space after `)` at the very end of an inline formula (e.g., `$f(x)$` is correct, `$f(x) $` is incorrect).

### Symbol Standardization
*   **Vectors**: Use `arrow(v)` instead of `vec(v)` or bold.
    *   *Code*: `$arrow(A B)$`, `$arrow(a)$`
*   **Multiplication**:
    *   Dot product: `$dot.op$` (e.g., `$arrow(a) dot.op arrow(b)$`)
    *   Cross product: `$times$`
*   **Sets**:
    *   Element of: `$in$`
    *   Not element of: `$in.not$`
    *   `sect` 改成 `inter`
*   **Logic**:
    *   Therefore: `$therefore$`
    *   Because: `$because$`
*   **Geometry**:
    *   Parallel: `$\/\/$`
    *   Perpendicular: `$tack.t$`
    *   Triangle: `$triangle$`
    *   Angle: `$angle$`

### Variable Styling
*   Variables should be italic (default in math mode).
*   Avoid manual `upright(...)` wrappers unless standard for specific constants.

## Structure (结构)

### Header
All `.typ` files should start with standard imports and setup:
```typ
#import "/conf.typ": *
#show: conf-rules
#title[Title Name]
```

And typically followed by an outline:
```typ
#outline(depth: 1)
```

## Layout (排版)

### Question Blocks

- 将作为四级标题的青铜、白银、黄金、铂金及其下面的段落包装到对应的 block 中, 注意去掉青铜、白银、黄金、铂金后面的数字
*   `#bronze-block[...]`
*   `#silver-block[...]`
*   `#gold-block[...]`
*   `#platinum-block[...]`

### Example Blocks

- 将题目包装到 `#example[...]` 中, 包括选项和图片
- 将真题速递下面的内容也包装到 `#example[...]` 中
- 将 `【演练 x】` 包装到 `#example[...]` 中
- 去除题目前的序号
- 多选题将 `(多选)` 移到 `#example[]` 块的最前面

### Choices (选择题)
*   Use the `#choices()` function.
*   Format:
    ```typ
    #choices(
      ([Option A], [Option B], [Option C], [Option D]),
      colNum: 4
    )
    ```
*   根据选项长度自动选择列数: 1, 2, 或 4

## 后处理

- 一级标题前加 `#pagebreak()`
- `#example` 里面最后加 `#answer-block(10em)`, 如果有图, 加 `#answer-block(1em)`, 之前要有一空行
- 用 `#blank` 替换所有 `\_\_\_\_\_`, 前后都要有空格
- 用 `#parentheses` 替换所有选择题的 `()`, 前后都要有空格
    - 注意, 函数调用 `#func()` 不需要替换
- 不允许出现多个空行或空格
