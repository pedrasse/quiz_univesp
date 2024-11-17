const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom :)"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual das opções não pode ser considerada uma transformação física?",
    answers: [
      { text: "Dissolução do açúcar em água", correct: false },
      { text: "Ebulição da água", correct: false },
      { text: "Obtenção de vinho por meio da fermentação da uva", correct: true },
      { text: "Evaporação do álcool", correct: false }
    ]
  },
  {
    question: "Quais componentes celulares estão presentes tanto em células eucariontes quanto procariontes?",
    answers: [
      { text: "Membrana plasmática e ribossomos", correct: true },
      { text: "Ribossomos e lisossomos", correct: false },
      { text: "Membrana plasmática e mitocôndrias", correct: false },
      { text: "Lisossomos e membrana plasmática", correct: false }
    ]
  },
  {
    question: "Qual bioma brasileiro foi atingido pela maior tragédia de sua história em 2020, perdendo mais de 25% da área?",
    answers: [
      { text: "Pantanal", correct: true },
      { text: "Cerrado", correct: false },
      { text: "Mata Atlântica", correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: "O que causa o fenômeno da voçoroca?",
    answers: [
      { text: "Construção de moradias em locais inapropriados", correct: false },
      { text: "Degradação da vegetação, que deixa o solo vulnerável e prejudica a drenagem da chuva", correct: true }
    ]
  },
  {
    question: "EMBORA ela tenha feito o dever de casa, não foi bem na prova. Qual é o tipo da conjunção em destaque?",
    answers: [
      { text: "Comparativa", correct: false },
      { text: "Concessiva", correct: true },
      { text: "Consecutiva", correct: false },
      { text: "Causal", correct: false }
    ]
  },
  {
    question: "Um triângulo com 10 cm de base tem 30 cm² de área. Qual é a altura dele, em cm?",
    answers: [
      { text: "10", correct: false },
      { text: "6", correct: true },
      { text: "30", correct: false },
      { text: "60", correct: false }
    ]
  },
  {
    question: "Na extração do petróleo, também são extraídos componentes mais densos, como água salgada, areia e argila, que serão removidos na primeira etapa do beneficiamento. Que etapa é essa?",
    answers: [
      { text: "Filtração", correct: false },
      { text: "Destilação", correct: false },
      { text: "Catação", correct: false },
      { text: "Decantação", correct: true },
    ]
  },
]
