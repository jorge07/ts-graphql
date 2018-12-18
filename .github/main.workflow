workflow "New workflow" {
  on = "push"
  resolves = ["Test"]
}

action "Test" {
  uses = "actions/npm@6309cd9"
  runs = "yarn install; yarn test"
}
