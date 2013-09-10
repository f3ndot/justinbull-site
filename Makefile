.PHONY: all
all: help

.PHONY: help
help:
	@echo ""
	@echo "justinbull-site Makefile"
	@echo "========================"
	@echo ""
	@echo "Makefile Commands:"
	@echo "------------------------"
	@echo "all      Display this help message"
	@echo "help     Display this help message"
	@echo "install  Install bower components and dependencies"
	@echo "compile  Compile site and bower components for deployment to production"
	@echo ""

.PHONY: install
install: bootstrap_install bower_install

.PHONY: bootstrap_install
bootstrap_install:
	npm install -g grunt-cli
	cd bower_components/bootstrap/
	npm install
	grunt
	cd ../../

.PHONY: bower_install
bower_install: 
	bower install

.PHONY: compile
compile:
	@echo "TODO!"
