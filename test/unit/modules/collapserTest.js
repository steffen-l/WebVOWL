describe("Collapsing", function () {
	var collapser;

	beforeEach(function () {
		this.addMatchers({
			toBeInstanceOf: function (expected) {
				return this.actual instanceof expected;
			}
		});
	});

	beforeEach(function () {
		collapser = webvowl.modules.collapser();
		collapser.enabled(true);
	});


	it("should remove datatypes with their properties", function () {
		var domain = new webvowl.nodes.owlclass(),
			datatypeProperty = new webvowl.labels.owldatatypeproperty(),
			datatypeClass = new webvowl.nodes.rdfsdatatype();

		datatypeProperty.domain(domain).range(datatypeClass);

		collapser.filter([domain, datatypeClass], [datatypeProperty]);

		expect(collapser.filteredNodes().length).toBe(1);
		expect(collapser.filteredNodes()[0]).toBeInstanceOf(webvowl.nodes.owlclass);
		expect(collapser.filteredProperties().length).toBe(0);
	});


	it("should remove subclasses and their properties", function () {
		var superClass = new webvowl.nodes.owlclass(),
			subProperty = new webvowl.labels.rdfssubclassof(),
			subclass = new webvowl.nodes.owldeprecatedclass();

		subProperty.domain(subclass).range(superClass);

		collapser.filter([superClass, subclass], [subProperty]);

		expect(collapser.filteredNodes().length).toBe(1);
		expect(collapser.filteredNodes()[0]).toBeInstanceOf(webvowl.nodes.owlclass);
		expect(collapser.filteredProperties().length).toBe(0);
	});

	it("should remove nested subclasses and their properties", function () {
		var superClass = new webvowl.nodes.owlclass(),
			subProperty = new webvowl.labels.rdfssubclassof(),
			subclass = new webvowl.nodes.owldeprecatedclass(),
			subSubProperty = new webvowl.labels.rdfssubclassof(),
			subSubclass = new webvowl.nodes.owldeprecatedclass();

		subProperty.domain(subclass).range(superClass);
		subSubProperty.domain(subSubclass).range(subclass);

		collapser.filter([superClass, subclass, subSubclass], [subProperty, subSubProperty]);

		expect(collapser.filteredNodes().length).toBe(1);
		expect(collapser.filteredNodes()[0]).toBeInstanceOf(webvowl.nodes.owlclass);
		expect(collapser.filteredProperties().length).toBe(0);
	});

	it("should not remove if a subclass is domain of another property", function() {
		var superClass = new webvowl.nodes.owlclass(),
			subProperty = new webvowl.labels.rdfssubclassof(),
			subclass = new webvowl.nodes.owldeprecatedclass(),
			otherProperty = new webvowl.labels.owlobjectproperty(),
			nodes = [superClass, subclass],
			properties = [subProperty, otherProperty];

		subProperty.domain(subclass).range(superClass);
		otherProperty.domain(subclass).range(superClass);

		collapser.filter(nodes, properties);

		expect(collapser.filteredNodes()).toEqual(nodes);
		expect(collapser.filteredProperties()).toEqual(properties);
	});

	it("should not remove if a subclass is range of another property", function() {
		var superClass = new webvowl.nodes.owlclass(),
			subProperty = new webvowl.labels.rdfssubclassof(),
			subclass = new webvowl.nodes.owldeprecatedclass(),
			otherProperty = new webvowl.labels.owlobjectproperty(),
			nodes = [superClass, subclass],
			properties = [subProperty, otherProperty];

		subProperty.domain(subclass).range(superClass);
		otherProperty.domain(superClass).range(subclass);

		collapser.filter(nodes, properties);

		expect(collapser.filteredNodes()).toEqual(nodes);
		expect(collapser.filteredProperties()).toEqual(properties);
	});

});
