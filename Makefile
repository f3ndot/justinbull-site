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
	@echo "clean    Remove all bower and compiled assets"
	@echo ""

.PHONY: install
install: bower_install bootstrap_install

.PHONY: bower_install
bower_install: 
	bower install

.PHONY: bootstrap_install
BOOTSTRAP_DIR = bower_components/bootstrap/
bootstrap_install:
	npm install -g grunt-cli
	cd ${BOOTSTRAP_DIR} && npm install
	cd ${BOOTSTRAP_DIR} && grunt dist

.PHONY: compile
compile:
	@echo "TODO!"

.PHONY: clean
clean:
	rm -vrf bower_components/
