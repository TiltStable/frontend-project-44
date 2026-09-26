.PHONY: install brain-games test lint lint-fix publish

install:
	npm ci

brain-games:
	node bin/brain-games.js

test:
	npm test

lint:
	npx oxlint && npx oxfmt --ignore-path=.oxfmtignore --check

lint-fix:
	npx oxfmt && npx oxlint --fix

publish:
	npm publish --dry-run
