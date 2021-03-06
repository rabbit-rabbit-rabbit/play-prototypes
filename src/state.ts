import { renderState } from "./renderState"
import { createState, S } from "@state-designer/react"
import * as Static from "./static"
import * as Types from "./types"
import uniqueId from "lodash/uniqueId"

const state = createState({
  id: "global",
  data: {
    users: Static.allUsers,
    tests: Static.tests,
    selectedUserId: undefined as string | undefined,
    selectedTestId: undefined as string | undefined,
    selectedGoalId: undefined as string | undefined,
    selectedQuestionId: undefined as string | undefined,
  },
  states: {
    page: {
      initial: "tests",
      states: {
        tests: {
          initial: "testsIdle",
          states: {
            testsIdle: {
              on: {
                CREATED_DRAFT: { to: "creatingDraftDialog" },
                SELECTED_TEST: [
                  {
                    do: "setSelectedTest",
                  },
                  {
                    get: "selectedTest",
                    if: "selectedTestIsDraft",
                    to: "draftTest",
                  },
                  {
                    if: "selectedTestIsComplete",
                    to: "completeTest",
                  },
                  {
                    if: "selectedTestIsInProgress",
                    to: "inProgressTest",
                  },
                ],
              },
            },
            creatingDraftDialog: {
              on: {
                BACKED: { to: "testsIdle" },
                CLOSED_DIALOG: { to: "testsIdle" },
                CREATED_DRAFT: {
                  do: "createDraft",
                  to: ["testsIdle", "draftTest"],
                },
              },
            },
          },
        },
        draftTest: {
          on: {
            CLOSED_DRAFT_PANEL: {
              get: "selectedTest",
              if: "selectedTestIsValid",
              do: "clearSelectedTest",
              to: "tests",
            },
            RENAMED_DRAFT: { get: "selectedTest", do: "setDraftName" },
            TOGGLED_DATA_PROPERTY: {
              get: "selectedTest",
              do: "toggleTestDataProperty",
            },
          },
          initial: "newDraft",
          states: {
            newDraft: {
              initial: "draftIdle",
              states: {
                draftIdle: {
                  on: {
                    OPENED_MENU: { to: "draftTestDialog" },
                    CONTINUED: { to: "goals" },
                  },
                },
                draftTestDialog: {
                  on: {
                    CLOSED_DIALOG: { to: "draftIdle" },
                    DUPLICATED_DRAFT: {
                      get: "selectedTest",
                      do: "duplicateDraft",
                      to: "draftIdle",
                    },
                    DELETED_DRAFT: {
                      get: "selectedTest",
                      do: "deleteDraft",
                      to: "tests",
                    },
                  },
                },
              },
            },
            goals: {
              initial: "goalsList",
              states: {
                goalsList: {
                  on: {
                    CONTINUED: { to: "survey" },
                    BACKED: { to: "newDraft" },
                    STARTED_CREATING_GOAL: { to: "creatingGoal" },
                    DELETED_GOAL: {
                      get: "selectedTest",
                      do: "deleteGoal",
                    },
                    REORDERED_GOALS: {
                      get: "selectedTest",
                      do: "reorderGoals",
                    },
                  },
                },
                creatingGoal: {
                  initial: "createGoalIdle",
                  onEnter: {
                    get: "selectedTest",
                    do: "createUnsavedGoal",
                  },
                  onExit: {
                    get: "selectedTest",
                    do: ["cleanupGoals", "clearSelectedGoalId"],
                  },
                  states: {
                    createGoalIdle: {
                      on: {
                        CHANGED_GOAL_DESCRIPTION: {
                          get: "selectedTest",
                          do: "setGoalDescription",
                        },
                        CLOSED_GOALS: { to: "closeGoalDialog" },
                        RECORDED_JOURNEY: { to: "recordJourneyDialog" },
                        SELECTED_JOURNEY: { to: "journeyDialog" },
                        CREATED_GOAL: {
                          get: "selectedTest",
                          do: "saveSelectedGoal",
                          to: "goalsList",
                        },
                      },
                    },
                    closeGoalDialog: {
                      on: {
                        CLOSED_DIALOG: { to: "createGoalIdle" },
                        CONFIRMED_CLOSE: { to: "goalsList" },
                      },
                    },
                    recordJourneyDialog: {
                      on: {
                        CLOSED_DIALOG: {
                          to: "createGoalIdle",
                        },
                        STARTED_RECORDING_JOURNEY: {
                          to: "recordingJourney",
                        },
                        OPENED_JOURNEY: {
                          to: "existingJourneyDialog",
                        },
                      },
                    },
                    journeyDialog: {
                      on: {
                        RERECORDED: { to: "recordingJourney" },
                        DELETED_JOURNEY: {
                          get: "selectedTest",
                          do: "deleteJourneyFromSelectedGoal",
                          to: "createGoalIdle",
                        },
                        CLOSED_DIALOG: { to: "createGoalIdle" },
                      },
                    },
                    recordingJourney: {
                      initial: "loading",
                      states: {
                        loading: {
                          on: {
                            READY: {
                              to: "recordingJourney.active",
                            },
                          },
                        },
                        active: {
                          onEnter: {
                            wait: 4,
                            to: "recordingJourney.complete",
                          },
                        },
                        complete: {
                          on: {
                            RERECORDED: { to: "recordingJourney.loading" },
                            FINISHED_RECORDING: {
                              get: "selectedTest",
                              do: "addJourneyToSelectedGoal",
                              to: "createGoalIdle",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            survey: {
              initial: "questionsList",
              states: {
                questionsList: {
                  on: {
                    CONTINUED: { to: "publish" },
                    BACKED: { to: "goals" },
                    STARTED_CREATING_QUESTION: { to: "selectingQuestionType" },
                    DELETED_QUESTION: {
                      get: "selectedTest",
                      do: "deleteQuestion",
                    },
                    REORDERED_QUESTIONS: {
                      get: "selectedTest",
                      do: "reorderQuestions",
                    },
                  },
                },
                selectingQuestionType: {
                  on: {
                    SELECTED_OPEN: {
                      to: "question.openAnswerQuestion",
                    },
                    SELECTED_MULTIPLE: {
                      to: "question.multipleChoiceQuestion",
                    },
                    SELECTED_SCALE: { to: "question.scaleQuestion" },
                    CLOSED_DIALOG: { to: "questionsList" },
                  },
                },
                creatingQuestion: {
                  states: {
                    question: {
                      onEnter: {
                        get: "selectedTest",
                        do: "createUnsavedQuestion",
                      },
                      on: {
                        ATTEMPTED_CLOSED: {
                          to: "questionDialog.confirmingClose",
                        },
                        CHANGED_QUESTION_DESCRIPTION: {
                          get: "selectedTest",
                          do: "updateQuestionDescription",
                        },
                        CREATED_QUESTION: {
                          get: "selectedTest",
                          do: [
                            "saveSelectedQuestion",
                            "cleanupQuestions",
                            "clearSelectedQuestion",
                          ],
                          to: "questionsList",
                        },
                      },
                      initial: "openAnswerQuestion",
                      states: {
                        openAnswerQuestion: {
                          on: {
                            SET_CHARACTER_COUNT: {
                              get: "selectedTest",
                              do: "updateQuestionCharacterCount",
                            },
                          },
                        },
                        multipleChoiceQuestion: {
                          on: {
                            SET_CHOICES_COUNT: {
                              get: "selectedTest",
                              do: "updateQuestionChoicesCount",
                            },
                            SET_CHOICES_MULTIPLE: {
                              get: "selectedTest",
                              do: "updateQuestionMultiple",
                            },
                            EDITED_CHOICE: {
                              get: "selectedTest",
                              do: "updateChoiceTitle",
                            },
                          },
                        },
                        scaleQuestion: {
                          on: {
                            SET_LEFT_LABEL: {
                              get: "selectedTest",
                              do: "updateQuestionLeftLabel",
                            },
                            SET_RIGHT_LABEL: {
                              get: "selectedTest",
                              do: "updateQuestionRightLabel",
                            },
                            SET_SCALE_AMOUNT: {
                              get: "selectedTest",
                              do: "updateScaleAmount",
                            },
                          },
                        },
                      },
                    },
                    questionDialog: {
                      initial: "idle",
                      states: {
                        idle: {},
                        confirmingClose: {
                          on: {
                            CLOSED_DIALOG: { to: "questionDialog.idle" },
                            CONFIRMED_CLOSE: {
                              get: "selectedTest",
                              do: "cleanupQuestions",
                              to: "questionsList",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            publish: {
              initial: "publishIdle",
              states: {
                publishIdle: {
                  on: {
                    TOGGLED_MULTIPLE_TRIES: {
                      get: "selectedTest",
                      do: "toggleMultipleTries",
                    },
                    SET_LIFESPAN: {
                      get: "selectedTest",
                      do: "setTestDuration",
                    },
                    BACKED: { to: "survey" },
                    STARTED_SEARCHING_FOR_USERS: {
                      to: ["publish.findingUsers", "findingUsersModal"],
                    },
                    OPENED_USER_DIALOG: {
                      do: "setSelectedUserId",
                      to: "invitedUserDialog",
                    },
                    CONTINUED: { to: "publishDialog" },
                  },
                },
                invitedUserDialog: {
                  on: {
                    CLOSED_DIALOG: { to: "publishIdle" },
                    REMOVED_USER: {
                      get: "selectedTest",
                      do: ["removeUserFromDraft", "clearSelectedUserId"],
                      to: "publishIdle",
                    },
                  },
                },
                findingUsers: {
                  on: {
                    CLOSED_MODAL: { to: ["noModal", "publishIdle"] },
                    SELECTED_USER: {
                      get: "selectedTest",
                      do: "addUserToTest",
                      to: ["noModal", "publishIdle"],
                    },
                  },
                },
                publishDialog: {
                  on: {
                    CLOSED_DIALOG: { to: "publishIdle" },
                    CREATED_DRAFT: {
                      get: "selectedTest",
                      do: "completeDraft",
                      to: "tests",
                    },
                  },
                },
              },
            },
          },
        },
        completeTest: {
          on: {
            CLOSED_PANEL: { do: "clearSelectedTest", to: "tests" },
          },
        },
        inProgressTest: {
          initial: "inProgressIdle",
          states: {
            inProgressIdle: {
              on: {
                CLOSED_PANEL: { do: "clearSelectedTest", to: "tests" },
                STARTED_SEARCHING_FOR_USERS: {
                  to: ["inProgressTest.findingUsers", "findingUsersModal"],
                },
                OPENED_USER_DIALOG: {
                  do: "setSelectedUserId",
                  to: "inProgressTest.invitedUserDialog",
                },
              },
            },
            findingUsers: {
              on: {
                CLOSED_MODAL: { to: ["noModal", "inProgressIdle"] },
                SELECTED_USER: {
                  get: "selectedTest",
                  do: "addUserToTest",
                  to: ["noModal", "inProgressIdle"],
                },
              },
            },
            invitedUserDialog: {
              on: {
                CLOSED_DIALOG: { to: "inProgressIdle" },
                REMOVED_USER: {
                  get: "selectedTest",
                  do: ["removeUserFromDraft", "clearSelectedUserId"],
                  to: "inProgressIdle",
                },
              },
            },
          },
        },
      },
    },
    modals: {
      initial: "noModal",
      states: {
        noModal: {},
        findingUsersModal: {},
      },
    },
  },
  results: {
    selectedTest(data) {
      return data.tests.find((t) => t.id === data.selectedTestId)
    },
    selectedGoal(data) {
      return data.tests
        .find((t) => t.id === data.selectedTestId)
        ?.goals.find((goal) => goal.id === data.selectedGoalId)
    },
    selectedUser(data) {
      return data.users.find((t) => t.id === data.selectedUserId)
    },
    selectedQuestion(data) {
      return data.tests
        .find((t) => t.id === data.selectedTestId)
        ?.survey.find((question) => question.id === data.selectedQuestionId)
    },
  },
  conditions: {
    selectedTestIsValid(data, _, selectedTest: Types.UserTest) {
      return selectedTest.name.length > 0
    },
    selectedTestIsDraft(data, _, selectedTest) {
      if (selectedTest === undefined) return false
      return selectedTest.status === "draft"
    },
    selectedTestIsComplete(data, _, selectedTest) {
      if (selectedTest === undefined) return false
      return selectedTest.status === "complete"
    },
    selectedTestIsInProgress(data, _, selectedTest) {
      if (selectedTest === undefined) return false
      return selectedTest.status === "inProgress"
    },
  },
  actions: {
    setSelectedTest(data, payload = {}) {
      const { test } = payload
      data.selectedTestId = test.id
    },
    clearSelectedTest(data) {
      data.selectedTestId = undefined
    },
    createDraft(data, { name }: { name: string }) {
      const newTest: Types.UserTest = {
        id: "test" + Date.now(),
        name,
        invitedUsers: [],
        timeRemaining: Static.maxDuration,
        status: "draft",
        lastPage: 0,
        options: {
          testDuration: 1000 * 60 * 60 * 24 * 5,
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

      data.tests.push(newTest)
      data.selectedTestId = newTest.id
    },
    addUserToTest(
      data,
      { user }: { user: Types.User },
      selectedTest: Types.UserTest
    ) {
      if (!selectedTest) return
      selectedTest.invitedUsers.push(user)
    },
    duplicateDraft(data, _, selectedTest: Types.UserTest) {
      if (!selectedTest) return
      const newTest: Types.UserTest = {
        ...selectedTest,
        id: "test" + Date.now(),
        name: selectedTest.name + " Copy",
      }

      data.tests.push(newTest)
      data.selectedTestId = newTest.id
    },
    deleteDraft(data, _, selectedTest: Types.UserTest) {
      if (!selectedTest) return
      const index = data.tests.findIndex((t) => t.id === selectedTest.id)
      data.selectedTestId = undefined
      data.tests.splice(index, 1)
    },
    completeDraft(data, _, selectedTest: Types.UserTest) {
      if (!selectedTest) return
      selectedTest.status = "inProgress"
    },
    toggleMultipleTries(data, _, selectedTest: Types.UserTest) {
      if (!selectedTest) return
      selectedTest.options.allowMultipleTries = !selectedTest.options
        .allowMultipleTries
    },
    toggleTestDataProperty(data, { property }, selectedTest: Types.UserTest) {
      if (!selectedTest) return
      selectedTest.options.data[property] = !selectedTest.options.data[property]
    },
    setDraftName(data, payload, selectedTest: Types.UserTest) {
      if (!selectedTest) return
      const { value = "" } = payload
      selectedTest.name = value
    },
    setTestDuration(data, payload = {}, selectedTest: Types.UserTest) {
      if (!selectedTest) return
      const { value } = payload
      selectedTest.options.testDuration = value * (1000 * 60 * 24)
    },
    removeUserFromDraft(data, _, selectedTest: Types.UserTest) {
      if (!selectedTest) return
      const index = selectedTest.invitedUsers.findIndex(
        (t) => t.id === data.selectedUserId
      )
      selectedTest.invitedUsers.splice(index, 1)
    },
    // Selected User
    setSelectedUserId(data, { user }: { user: Types.User }) {
      data.selectedUserId = user.id
    },
    clearSelectedUserId(data) {
      data.selectedUserId = ""
    },
    // Goals
    deleteGoal(data, { index }, selectedTest: Types.UserTest) {
      selectedTest.goals.splice(index, 1)
    },
    reorderGoals(data, { from, to }, selectedTest: Types.UserTest) {
      const t = selectedTest.goals[from]
      selectedTest.goals[from] = selectedTest.goals[to]
      selectedTest.goals[to] = t
    },
    moveGoal(
      data,
      { id, delta }: { id: string; delta: number },
      selectedTest: Types.UserTest
    ) {
      const index = selectedTest.goals.findIndex((g) => g.id === id)
      selectedTest.goals.splice(
        index + delta,
        0,
        ...selectedTest.goals.splice(index, 1)
      )
    },
    setGoalDescription(
      data,
      { text }: { text: string },
      selectedTest: Types.UserTest
    ) {
      selectedTest.goals.find(
        (g) => g.id === data.selectedGoalId
      ).description = text
    },
    createUnsavedGoal(data, _, selectedTest: Types.UserTest) {
      const id = uniqueId()
      data.selectedGoalId = id
      selectedTest.goals.push({
        id,
        saved: false,
        description: "",
        journey: undefined,
      })
    },
    addJourneyToSelectedGoal(data, _, selectedTest: Types.UserTest) {
      selectedTest.goals.find((g) => g.id === data.selectedGoalId).journey = {
        id: uniqueId(),
        duration: 236,
        pages: 8,
        interactions: 24,
      }
    },
    deleteJourneyFromSelectedGoal(data, _, selectedTest: Types.UserTest) {
      selectedTest.goals.find(
        (g) => g.id === data.selectedGoalId
      ).journey = undefined
    },
    saveSelectedGoal(data, _, selectedTest: Types.UserTest) {
      selectedTest.goals.find((g) => g.id === data.selectedGoalId).saved = true
    },
    clearSelectedGoalId(data) {
      data.selectedGoalId = undefined
    },
    cleanupGoals(data, _, selectedTest: Types.UserTest) {
      selectedTest.goals = selectedTest.goals.filter((g) => g.saved)
    },
    // Survey Questions
    createUnsavedQuestion(
      data,
      type = Types.QuestionType.Open,
      selectedTest: Types.UserTest
    ) {
      const id = uniqueId()
      data.selectedQuestionId = id
      selectedTest.survey.push({
        id,
        type,
        saved: false,
        characterCount: 160,
        description: "",
        optionCount: 3,
        scaleAmount: 5,
        leftScaleLabel: "",
        rightScaleLabel: "",
        selectMultiple: false,
        options: Array.from(Array(10)).map((_, i) => ""),
      })
    },
    updateQuestionDescription(data, { text }, selectedTest: Types.UserTest) {
      selectedTest.survey.find(
        (q) => q.id === data.selectedQuestionId
      ).description = text
    },
    updateQuestionCharacterCount(
      data,
      { count },
      selectedTest: Types.UserTest
    ) {
      selectedTest.survey.find(
        (q) => q.id === data.selectedQuestionId
      ).characterCount = Math.round(count)
    },
    updateQuestionChoicesCount(data, { count }, selectedTest: Types.UserTest) {
      selectedTest.survey.find(
        (q) => q.id === data.selectedQuestionId
      ).optionCount = Math.floor(count)
    },
    updateQuestionMultiple(data, value, selectedTest: Types.UserTest) {
      selectedTest.survey.find(
        (q) => q.id === data.selectedQuestionId
      ).selectMultiple = value
    },
    updateChoiceTitle(
      data,
      { index, text }: { index: number; text: string },
      selectedTest: Types.UserTest
    ) {
      selectedTest.survey.find((q) => q.id === data.selectedQuestionId).options[
        index
      ] = text
    },
    updateQuestionLeftLabel(data, { text }, selectedTest: Types.UserTest) {
      selectedTest.survey.find(
        (q) => q.id === data.selectedQuestionId
      ).leftScaleLabel = text
    },
    updateQuestionRightLabel(data, { text }, selectedTest: Types.UserTest) {
      selectedTest.survey.find(
        (q) => q.id === data.selectedQuestionId
      ).rightScaleLabel = text
    },
    updateScaleAmount(data, { count }, selectedTest: Types.UserTest) {
      selectedTest.survey.find(
        (q) => q.id === data.selectedQuestionId
      ).scaleAmount = Math.floor(count)
    },
    cleanupQuestions(data, _, selectedTest: Types.UserTest) {
      selectedTest.survey = selectedTest.survey.filter((g) => g.saved)
    },
    clearSelectedQuestion(data) {
      data.selectedQuestionId = undefined
    },
    saveSelectedQuestion(data, _, selectedTest: Types.UserTest) {
      selectedTest.survey.find(
        (q) => q.id === data.selectedQuestionId
      ).saved = true
    },
    deleteQuestion(data, { index }, selectedTest: Types.UserTest) {
      selectedTest.survey.splice(index, 1)
    },
    reorderQuestions(data, { from, to }, selectedTest: Types.UserTest) {
      const t = selectedTest.survey[from]
      selectedTest.survey[from] = selectedTest.survey[to]
      selectedTest.survey[to] = t
    },
  },
  values: {
    selectedTest(data) {
      return data.tests.find((t) => t.id === data.selectedTestId)
    },
    selectedGoal(data) {
      return data.tests
        .find((t) => t.id === data.selectedTestId)
        ?.goals.find((goal) => goal.id === data.selectedGoalId)
    },
    selectedQuestion(data) {
      return data.tests
        .find((t) => t.id === data.selectedTestId)
        ?.survey.find((goal) => goal.id === data.selectedQuestionId)
    },
  },
})

export default state

renderState(state)
