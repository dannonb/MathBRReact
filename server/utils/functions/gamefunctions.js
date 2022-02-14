import { additionQuestion, subtractionQuestion, multiplicationQuestion, exponentQuestion } from './questions.js'

export const deathmatchHandler = (time, gamestate, io) => {
    

}

export const battleRoyaleHandler = (time, gamestate, io) => {

}

export const generateQuestion = (currentRound, type, difficulty) => {
    if (type === 0) {
        if (currentRound === 1) {
            return additionQuestion(difficulty)
        }
        if (currentRound === 2) {
            return subtractionQuestion(difficulty)
        }
        if (currentRound === 3) {
            return multiplicationQuestion(difficulty)
        }
    }
    if (type === 1) {
        return additionQuestion(difficulty)
    }
    if (type === 2) {
        return subtractionQuestion(difficulty)
    }
    if (type === 3) {
        return multiplicationQuestion(difficulty)
    }
    if (type === 4) {
        return exponentQuestion(difficulty)
    }
    if (type === 5) {
        const problems = [additionQuestion, subtractionQuestion, multiplicationQuestion, exponentQuestion]
        const random = Math.floor(Math.random() * 2);
        return problems[random](difficulty)
        
        
    }
}
