### DEV

build-dev:
	cd client && $(MAKE) build-dev

run-dev:
	docker-compose -f docker-compose-dev.yml up

### PROD

build-prod:
	cd client && $(MAKE) build-prod

run-prod:
	docker-compose -f docker-compose.yml up 
