#!/bin/sh

GIT_REPO=$(git rev-parse --show-toplevel)
GIT_DIR=$(git rev-parse --git-dir)

# Git-hooks
cp ${GIT_REPO}/scripts/git_hooks/* ${GIT_DIR}/hooks
