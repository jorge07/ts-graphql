.PHONY: dev
dev:
	docker-compose -f etc/docker/dev/docker-compose.yaml up -d

.PHONY: start-ci
start-ci:
	docker-compose -f etc/docker/ci/docker-compose.yaml up -d elasticsearch postgress
	sleep 30

.PHONY: build-ci
build-ci:
	docker-compose -f etc/docker/ci/docker-compose.yaml build

.PHONY: test-ci
test-ci: start-ci
	docker-compose -f etc/docker/ci/docker-compose.yaml run app sh -lc 'yarn test'

.PHONY: sh-ci
sh-ci:
	docker-compose -f etc/docker/ci/docker-compose.yaml run app sh -l