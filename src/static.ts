import * as Types from "./types"

export const maxDuration = 1000 * 60 * 24 * 5

export const allUsers = [
  {
    id: "user0",
    name: "Steve",
    email: "steve@aol.com",
  },
  {
    id: "user1",
    name: "Joon Park",
    email: "joon@createwithplay.com",
  },
  {
    id: "user2",
    name: "Deagle",
    email: "deagle@createwithplay.com",
  },
  {
    id: "user3",
    name: "Timo",
    email: "timo@createwithplay.com",
  },
  {
    id: "user4",
    name: "Tom",
    email: "tom@createwithplay.com",
  },
]

type TestOptions = {
  name?: string
  status?: Types.TestStatus
  users?: number
  progress?: number
}

export function getNewTest(options: TestOptions = {}) {
  const {
    name = "New Test",
    status = "draft",
    users = 0,
    progress = 0,
  } = options
  return {
    id: "test" + Math.floor(Math.random() * 999999),
    name,
    invitedUsers: allUsers.slice(0, users),
    timeRemaining: maxDuration * (1 - progress),
    status,
    lastPage: 0,
    options: {
      testDuration: maxDuration,
      allowMultipleTries: false,
      data: {
        frontFacingCamera: true,
        microphone: true,
        location: true,
      },
    },
    survey: [],
    goals: [],
  }
}

export const tests: Types.UserTest[] = [
  getNewTest({
    name: "Header Test A",
    status: "inProgress",
    users: 3,
    progress: 0.32,
  }),
  getNewTest({
    name: "Header Test B",
    status: "inProgress",
    users: 3,
    progress: 0,
  }),
  getNewTest({ name: "Toolbar Test", status: "draft", users: 0, progress: 0 }),
  getNewTest({ name: "New Menu", status: "complete", users: 1, progress: 1 }),
  getNewTest({
    name: "Sidebar Shuffle",
    status: "inProgress",
    users: 2,
    progress: 1,
  }),
]
