PATH := node_modules/.bin:$(PATH)		# Adds node_modules executables to PATH
SHELL := /bin/bash 						# macOS requires this to export PATH

# Default Target
# ----------------------------------------------------------------------------
default: build

# Transpiles all source files.
# ----------------------------------------------------------------------------
build: install
	tsc --build

build.watch: install
	tsc --watch

# Installs dependencies.
# ----------------------------------------------------------------------------
install: node_modules

# Watches source files for transpilation.
# ----------------------------------------------------------------------------
watch: build.watch

# Cleans the project of all generated files.
# ----------------------------------------------------------------------------
clean:
	cat .cleanrc | sed -E '/^#.*$$/ d' | sed '/^\\s*$$/ d' | xargs rm -rf

# Runs all verifications on a clean build.
# ----------------------------------------------------------------------------
verify: clean build test

# Runs all tests.
# ----------------------------------------------------------------------------
test: install
	jest $(test_target)

test.watch: install
	jest --watch

# Runs a specific test file.
%.test.ts: FORCE
	@make test test_target="$@"

# Lists all available targets.
# ----------------------------------------------------------------------------
list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

# List of targets that don't correspond to a file/directory.
.PHONY: default build.watch install watch clean verify test test.watch list %.test.ts FORCE

# Prevents make from treating test file targets as intermediate files. Prevents deletion.
.PRECIOUS: %.test.ts

node_modules: package.json
	yarn install
	@touch node_modules 		# ensures the timestamp for node_modules is updated
