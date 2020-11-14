import chalk from "chalk";
import { createState, S } from "@state-designer/react";
import * as Static from "./static";
import * as Types from "./types";

const state = createState({
  id: "global",
  data: {
    users: Static.allUsers,
    tests: Static.tests,
    selectedUserId: undefined as string | undefined,
    selectedTestId: undefined as string | undefined,
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
                CREATED_DRAFT: { to: "creatingDraft" },
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
            creatingDraft: {
              on: {
                BACKED: { to: "testsIdle" },
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
            CLOSED_PANEL: { do: "clearSelectedTest", to: "tests" },
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
                  },
                },
                creatingGoal: {
                  on: {
                    CLOSED_GOALS: { to: "goalsList" },
                    CREATED_GOAL: { to: "goalsList" },
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
                    CREATED_GOAL: { to: "creatingQuestion" },
                  },
                },
                creatingQuestion: {},
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
      return data.tests.find((t) => t.id === data.selectedTestId);
    },
    selectedUser(data) {
      return data.users.find((t) => t.id === data.selectedUserId);
    },
  },
  conditions: {
    selectedTestIsDraft(data, _, selectedTest) {
      if (selectedTest === undefined) return false;
      return selectedTest.status === "draft";
    },
    selectedTestIsComplete(data, _, selectedTest) {
      if (selectedTest === undefined) return false;
      return selectedTest.status === "complete";
    },
    selectedTestIsInProgress(data, _, selectedTest) {
      if (selectedTest === undefined) return false;
      return selectedTest.status === "inProgress";
    },
  },
  actions: {
    setSelectedTest(data, payload = {}) {
      const { test } = payload;
      data.selectedTestId = test.id;
    },
    clearSelectedTest(data) {
      data.selectedTestId = undefined;
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
      };

      data.tests.push(newTest);
      data.selectedTestId = newTest.id;
    },
    addUserToTest(
      data,
      { user }: { user: Types.User },
      selectedTest: Types.UserTest
    ) {
      if (!selectedTest) return;
      selectedTest.invitedUsers.push(user);
    },
    duplicateDraft(data, _, selectedTest: Types.UserTest) {
      if (!selectedTest) return;
      const newTest: Types.UserTest = {
        ...selectedTest,
        id: "test" + Date.now(),
        name: selectedTest.name + " Copy",
      };

      data.tests.push(newTest);
      data.selectedTestId = newTest.id;
    },
    deleteDraft(data, _, selectedTest: Types.UserTest) {
      if (!selectedTest) return;
      const index = data.tests.findIndex((t) => t.id === selectedTest.id);
      data.selectedTestId = undefined;
      data.tests.splice(index, 1);
    },
    completeDraft(data, _, selectedTest: Types.UserTest) {
      if (!selectedTest) return;
      selectedTest.status = "inProgress";
    },
    toggleMultipleTries(data, _, selectedTest: Types.UserTest) {
      if (!selectedTest) return;
      selectedTest.options.allowMultipleTries = !selectedTest.options
        .allowMultipleTries;
    },
    toggleTestDataProperty(data, { property }, selectedTest: Types.UserTest) {
      if (!selectedTest) return;
      selectedTest.options.data[property] = !selectedTest.options.data[
        property
      ];
    },
    setDraftName(data, payload, selectedTest: Types.UserTest) {
      if (!selectedTest) return;
      const { value = "" } = payload;
      selectedTest.name = value;
    },
    setTestDuration(data, payload = {}, selectedTest: Types.UserTest) {
      if (!selectedTest) return;
      const { value } = payload;
      selectedTest.options.testDuration = value * (1000 * 60 * 24);
    },
    removeUserFromDraft(data, _, selectedTest: Types.UserTest) {
      if (!selectedTest) return;
      console.log("removing", data.selectedUserId);
      const index = selectedTest.invitedUsers.findIndex(
        (t) => t.id === data.selectedUserId
      );
      selectedTest.invitedUsers.splice(index, 1);
    },
    // Selected User
    setSelectedUserId(data, { user }: { user: Types.User }) {
      data.selectedUserId = user.id;
    },
    clearSelectedUserId(data) {
      data.selectedUserId = "";
    },
  },
  values: {
    selectedTest(data) {
      return data.tests.find((t) => t.id === data.selectedTestId);
    },
  },
});

export default state;

// state.onUpdate((update) => {
// let colWidths = [0]
// let depths = [0]
// let treeHeight = 0

// let tree = [] as { name: string; row: number; col: number; width: number }[]
// let rows = [] as string[][]

// let currentRow = 0

// function addToTree(node: S.State<any, any>, row: number, col: number) {
//   if (rows[row] === undefined) rows[row] = []
//   rows[row][col] = (node.active ? "* " : "  ") + node.name
//   const children = Object.values(node.states)
//   if (children.length > 0) {
//     rows[row][col] += " >"
//     for (let i = 0; i < children.length; i++) {
//       addToTree(children[i], currentRow, col + 1)
//       currentRow++
//     }
//     if (!rows[currentRow]) rows[currentRow] = []
//     rows[currentRow][col + 1] = ""
//   }
// }

// addToTree(update.stateTree, 0, 0)

// rows.forEach((row, r) =>
//   row.forEach((col, c) => {
//     colWidths[c] = !colWidths[c]
//       ? col.length
//       : Math.max(colWidths[c], col.length)
//   })
// )

// rows.forEach((row, r) => {
//   for (let i = 0; i < row.length; i++) {
//     if (row[i] === undefined) {
//       rows[r][i] =
//         " " +
//         Array.from(Array(colWidths[i] + 1))
//           .map(() => " ")
//           .join("")
//     } else {
//       rows[r][i] =
//         " " +
//         rows[r][i] +
//         Array.from(Array(colWidths[i] + 1 - rows[r][i].length))
//           .map(() => (rows[r][i].endsWith(">") ? "-" : " "))
//           .join("")
//     }

//     rows[r][i] += " |"
//   }
// })

// console.log(
//   rows
//     .filter(Boolean)
//     .map((row) => row.join(""))
//     .join("\n")
// )
// })

type NodeType = "leaf" | "branch" | "root";

class Grid {
  rows = [] as string[][];

  chars = {
    active: ["┌", "─", "┒", "┃", "┛", "━", "┕", "│"],
    inactive: ["┌", "─", "┐", "│", "┘", "─", "└", "│"],
    root: ["┌", "╌", "┐", "╎", "┘", "╌", "└", "╎"],
  };

  insert(char: string, col: number, row: number, color = false) {
    if (this.rows[row] === undefined) {
      this.rows[row] = [];
    }

    for (let i = 0; i < col; i++) {
      if (this.rows[row][i] === undefined) this.rows[row][i] = " ";
    }
    this.rows[row][col] = color ? char : `\x1b[38;2;144;144;144m${char}\x1b[0m`;
  }

  drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    style: "active" | "inactive" | "root",
    active: boolean
  ) {
    let i: number;
    const chars = this.chars[style];
    this.insert(chars[0], x, y, active);
    this.insert(chars[2], x + width, y, active);
    this.insert(chars[4], x + width, y + height, active);
    this.insert(chars[6], x, y + height, active);
    for (i = 1; i < width; i++) {
      this.insert(chars[1], x + i, y, active);
      this.insert(chars[5], x + i, y + height, active);
    }
    for (i = 1; i < height; i++) {
      this.insert(chars[7], x, y + i, active);
      this.insert(chars[3], x + width, y + i, active);
    }
  }

  drawText(text: string, x: number, y: number, active: boolean) {
    for (let i = 0; i < text.length; i++) {
      this.insert(text[i], x + i, y, active);
    }
  }

  drawNode(node: TNode) {
    const { x, y, width, height, type, active, name } = node;
    const style = type === "root" ? "root" : active ? "active" : "inactive";
    if (node.hasChildren) {
      this.drawRect(x, y, width, height, style, active);
      this.insert(" ", x + 1, y, active);
      this.insert(" ", x + name.length + 2, y, active);
      this.drawText(name, x + 2, y, active);
    } else {
      this.drawText(name, x, y, active);
    }
  }

  clear(row: number, col: number) {
    if (this.rows[row]) {
      this.rows[row][col] = "";
    }
  }

  render() {
    console.log("\n");
    console.log(
      this.rows
        .map((row) => row.map((c) => (c === undefined ? " " : c)).join(""))
        .join("\n")
    );
  }
}

const grid = new Grid();

class TNode {
  name: string;
  active: boolean;
  parent: TNode | undefined;
  children: TNode[];
  x = 0;
  y = 0;

  constructor(state: S.State<any, any>, parent?: TNode) {
    this.name = state.name;
    this.active = state.active;
    this.parent = parent;
    this.children = Object.values(state.states).map((s) => new TNode(s, this));
  }

  get maxX() {
    return this.x + this.width;
  }

  get maxY() {
    return this.y + this.height;
  }

  get width() {
    if (!this.hasChildren) {
      return this.name.length;
    }

    let cx = Math.max(
      this.x + this.name.length + 5,
      ...this.children.map((c) => c.maxX)
    );

    if (this.children.find((c) => c.type === "branch")) cx++;

    cx++;

    return cx - this.x;
  }

  get height() {
    if (!this.hasChildren) {
      return 1;
    }

    let cy = Math.max(...this.children.map((c) => c.maxY));
    if (cy > this.y + 3) cy++;

    return cy - this.y;
  }

  get hasChildren() {
    return this.children.length > 0;
  }

  get type(): NodeType {
    if (!this.parent) return "root";
    if (this.children.length === 0) return "leaf";
    return "branch";
  }

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;

    let cx = x + 2;
    let cy = y + 1;
    let ch = 0;

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (cx > x + 50) {
        cx = x + 2;
        cy = y + 2 + ch;
        ch = 0;
      }
      child.moveTo(cx, cy);
      ch = Math.max(ch, child.height);
      cx += child.width + (child.type === "leaf" ? 1 : 2);
    }
  }

  render() {
    grid.drawNode(this);

    for (let child of this.children) {
      child.render();
    }
  }
}

state.onUpdate((update) => {
  const tTree = new TNode(update.stateTree);
  tTree.moveTo(0, 0);
  tTree.render();
  grid.render();
  console.log("Last Event:", update.log[0]);
});
