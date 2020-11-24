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
  id: string
  duration: number
  pages: number
  interactions: number
}

export interface TestGoal {
  id: string
  saved: boolean
  description: string
  journey?: TestJourney
}

export enum QuestionType {
  Open = "open",
  MultipleChoice = "multipleChoice",
  Scale = "scale",
}

export interface QuestionBase {
  id: string
  type: QuestionType
  description: string
  characterCount?: number
  optionCount?: number
  options?: string[]
  scaleAmount?: number
  selectMultiple?: boolean
  leftScaleLabel?: string
  rightScaleLabel?: string
  saved: boolean
}

interface OpenAnswerQuestion extends QuestionBase {
  type: QuestionType.Open
  characterCount: number
}

interface MultipleChoiceQuestion extends QuestionBase {
  type: QuestionType.MultipleChoice
  options: string[]
  selectMultiple: boolean
}

interface ScaleQuestion extends QuestionBase {
  type: QuestionType.MultipleChoice
  scaleAmount: number
  leftScaleLabel: string
  rightScaleLabel: string
}

export type SurveyQuestion =
  | OpenAnswerQuestion
  | MultipleChoiceQuestion
  | ScaleQuestion
