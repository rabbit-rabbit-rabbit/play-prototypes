export interface UserTest {
  id: string
  name: string
  status: TestStatus
  shareLink?: string
  invitedUsers: User[]
  timeRemaining: number
  lastPage: number
  options: {
    testDuration: number
    allowMultipleTries: boolean
    data: {
      frontFacingCamera: boolean
      microphone: boolean
      location: boolean
    }
  }
  survey: SurveyQuestion[]
  goals: TestGoal[]
}

export interface User {
  id: string
  name: string
  email: string
}

export type TestStatus = "inProgress" | "complete" | "draft"

export interface TestJourney {
  duration: number
  pages: number
  interactions: number
}

export interface TestGoal {
  description: string
  journey?: TestJourney
}

enum QuestionType {
  Open = "open",
  MultipleChoice = "multipleChoice",
  Scale = "scale",
}

export interface QuestionBase {
  id: string
  type: QuestionType
  description: string
}

interface OpenAnswerQuestion extends QuestionBase {
  type: QuestionType.Open
  multiline: boolean
}

interface MultipleChoiceQuestion extends QuestionBase {
  type: QuestionType.MultipleChoice
  options: string[]
}

interface ScaleQuestion extends QuestionBase {
  type: QuestionType.MultipleChoice
  min: number
  max: number
  step: number
  default: number
}

export type SurveyQuestion =
  | OpenAnswerQuestion
  | MultipleChoiceQuestion
  | ScaleQuestion
