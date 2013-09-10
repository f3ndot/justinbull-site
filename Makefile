BASE_DIR := $(shell pwd)

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
install: bower_install bootstrap_install jquery_install

.PHONY: bower_install
bower_install: 
	bower install

.PHONY: bootstrap_install
BOOTSTRAP_DIR = ${BASE_DIR}/bower_components/bootstrap
bootstrap_install:
	npm install -g grunt-cli
	cd ${BOOTSTRAP_DIR} && npm install
	cd ${BOOTSTRAP_DIR} && grunt dist
	ln -s ${BOOTSTRAP_DIR}/dist/css/bootstrap-theme.css ${BASE_DIR}/assets/css/bootstrap-theme.css
	ln -s ${BOOTSTRAP_DIR}/dist/css/bootstrap-theme.min.css ${BASE_DIR}/assets/css/bootstrap-theme.min.css
	ln -s ${BOOTSTRAP_DIR}/dist/css/bootstrap.css ${BASE_DIR}/assets/css/bootstrap.css
	ln -s ${BOOTSTRAP_DIR}/dist/css/bootstrap.min.css ${BASE_DIR}/assets/css/bootstrap.min.css
	ln -s ${BOOTSTRAP_DIR}/dist/js/bootstrap.min.js ${BASE_DIR}/assets/js/bootstrap.min.js
	ln -s ${BOOTSTRAP_DIR}/dist/js/bootstrap.js ${BASE_DIR}/assets/js/bootstrap.js
	cp -v ${BOOTSTRAP_DIR}/dist/fonts/* ${BASE_DIR}/assets/fonts/

.PHONY: jquery_install
JQUERY_DIR = ${BASE_DIR}/bower_components/jquery
jquery_install:
	ln -s ${JQUERY_DIR}/jquery.min.js ${BASE_DIR}/assets/js/jquery.min.js
	ln -s ${JQUERY_DIR}/jquery.map ${BASE_DIR}/assets/js/jquery.map

.PHONY: compile
compile:
	@echo "TODO!"

.PHONY: clean
clean:
	rm -vrf bower_components/
