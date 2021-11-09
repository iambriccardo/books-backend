terraform {
  backend "remote" {
    organization = "systems-engineering-2021"

    workspaces {
      name = "books-backend-gh-action"
    }
  }
}