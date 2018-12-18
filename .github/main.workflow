workflow "New workflow" {
  on = "push"
  resolves = ["Npm install"]
}

action "Npm install" {
  uses = "actions/npm@6309cd9"
  runs = "yarn install"
}
