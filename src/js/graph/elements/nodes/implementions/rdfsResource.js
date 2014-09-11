webvowl.nodes.rdfsresource = (function () {

	var o = function () {
		webvowl.nodes.RoundNode.call(this);

		var superDrawFunction = this.drawNode;

		this.attributes(["rdf"])
			.label("Resource")
			.radius(30)
			.styleClass("rdfsresource")
			.type("rdfs:Resource");

		this.drawNode = function (element) {
			superDrawFunction(element, ["rdf", "special"]);
		};
	};
	o.prototype = Object.create(webvowl.nodes.RoundNode.prototype);
	o.prototype.constructor = o;

	return o;
}());