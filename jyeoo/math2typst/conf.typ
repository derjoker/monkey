#let conf-rules(doc) = {
  set text(font: "Songti SC")
  doc
}
#let title(x) = align(center, text(1.5em, weight: "bold", x))
#let example(body) = block(stroke: 1pt + gray, inset: 1em, width: 100%, body)
#let choices(opts, colNum: 4) = {
  // If opts is a tuple, use it. If array, spread it.
  // Typst grid takes children.
  let cells = if type(opts) == "array" { opts } else { opts }
  grid(columns: colNum, gutter: 1em, ..cells)
}
#let solution(body) = block(fill: luma(240), inset: 1em, width: 100%, body)
#let parentheses = " ( ) "
#let blank = " ______ "
