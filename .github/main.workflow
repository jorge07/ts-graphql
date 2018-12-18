workflow "New workflow" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@6309cd9"
  runs = "yarn install"
}

action "Test" {
  uses = "actions/npm@c555744"
  needs = ["Install"]
  runs = "yarn test"
}
