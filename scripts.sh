#!/usr/bin/env bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
BASE_DIR="${PWD##*/}"

init() {
    deactivate || true
    rm -r $ROOT/venv || true
    mkdir -p $ROOT/venv
    python3 -m venv $ROOT/venv/$BASE_DIR &&
    source $ROOT/venv/$BASE_DIR/bin/activate &&
    pip install -r requirements.txt &&
    pip install -r requirements-dev.txt
}
