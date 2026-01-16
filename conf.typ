// #import "@preview/ctheorems:1.1.3": *
// #show: thmrules

#let conf-rules = doc => {
  set text(font: "Songti SC")

  show math.equation: set text(font: "STIX Two Math")

  doc
}

#let parentheses = [(#h(3em))]

#let blank = box(width: 5em, stroke: (bottom: 0.05em + black))

// #let theorem = thmbox(
//   "theorem",
//   "Theorem",
//   fill: rgb("#e8e8f8"),
//   // inset: 0em
// )

#let example = c => {
  [*例题*] + c
}

#let exercise = c => {
  [*练习*] + c
}

#let choices = (answers, colNum: 1) => {
  grid(
    columns: (1fr,) * colNum,
    gutter: 0.5em,
    ..answers.enumerate().map(((i, ans)) => [
      #numbering("A.", i + 1) #ans
    ])
  )
}

#let answer-block = height => {
  block(height: height)
}

#let solution = c => {
  [*解: *] + c + v(1em)
}

#let platinum = c => { c }

#let question_block = (type, heading, doc) => {
  [==== #type #heading]

  doc
}

#let bronze-block = (heading, doc) => { question_block("青铜", heading, doc) }
#let silver-block = (heading, doc) => { question_block("白银", heading, doc) }
#let gold-block = (heading, doc) => { question_block("黄金", heading, doc) }
#let platinum-block = (heading, doc) => { question_block("铂金", heading, doc) }

#let hide_element = () => {
  return c => answer-block(10em)
}

#let remove_element = () => {
  return c => []
}

#let year = datetime.today().year()
