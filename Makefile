### DEV
build-dev:
	cd PersonalSite_AuthService && $(MAKE) build-dev
	cd PersonalSite_BlogService && $(MAKE) build-dev
	cd PersonalSite_ContactService && $(MAKE) build-dev
	cd PersonalSite_Gateway && $(MAKE) build-dev

run-dev:	
	docker-compose -f docker-compose.yml up
