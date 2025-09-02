const prompt = [
  {
    name: "useRouter",
    type: () => "toggle",
    message: "Add Vue Router for Single Page Application development?",
    initial: true,
    active: "Yes",
    inactive: "No",
  },
  {
    name: "usePinia",
    type: () => "toggle",
    message: "Add Pinia for state management?",
    initial: true,
    active: "Yes",
    inactive: "No",
  },

  {
    name: "useVueUse",
    type: () => "toggle",
    message:
      "Add VueUse for a collection of essential Vue composition utilities?",
    initial: false,
    active: "Yes",
    inactive: "No",
  },

  {
    name: "useTanStackVueQuery",
    type: () => "toggle",
    message: "Add TanStack Vue Query for server state management?",
    initial: true,
    active: "Yes",
    inactive: "No",
  },

  {
    name: "useDevTool",
    type: () => "toggle",
    message: "Add Vue DevTools to enhance the development experience?",
    initial: true,
    active: "Yes",
    inactive: "No",
  },

  {
    name: "useVitest",
    type: () => "toggle",
    message: "Add Vitest for unit testing?",
    initial: true,
    active: "Yes",
    inactive: "No",
  },
];
export default prompt;
