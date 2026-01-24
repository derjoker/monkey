#import "conf.typ": *

#let question-counter = counter("question")

#let example = c => {
  question-counter.step()
  context grid(
    columns: (1.5em, 1fr),
    [*#question-counter.display().*], c,
  )
}

#let exam-rules = doc => {
  set text(font: "Songti SC")

  // 这个不知道为啥不起作用
  // show heading.where(level: 1): it => heading(level: 3, it.body)

  show heading.where(level: 1): it => {
    set text(size: 0.8em, weight: "bold")
    v(0.5em)
    it.body
    v(0.2em)
  }

  doc
}
