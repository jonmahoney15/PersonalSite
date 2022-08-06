### DEV
build-dev:
	cd PersonalSite_AuthService && $(MAKE) build-dev
	cd PersonalSite_BlogService && $(MAKE) build-dev
	cd PersonalSite_ContactService && $(MAKE) build-dev
	cd PersonalSite_Gateway && $(MAKE) build-dev

build-prod: 
	cd PersonalSite_AuthService && $(MAKE) build-prod
	cd PersonalSite_BlogService && $(MAKE) build-prod
	cd PersonalSite_ContactService && $(MAKE) build-prod
	cd PersonalSite_Gateway && $(MAKE) build-prod 

run-dev:	
	docker-compose -f docker-compose.yml up
