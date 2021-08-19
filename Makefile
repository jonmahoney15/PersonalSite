### DEV

build-dev:
	cd client && $(MAKE) build-dev

run-dev:
	docker-compose -f docker-compose-dev.yml up