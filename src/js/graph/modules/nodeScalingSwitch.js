/**
 * This module abuses the filter function a bit like the statistics module. Nothing is filtered
 * but if enabled, it enables an attribute of each passed node.
 *
 * @returns {{}}
 */
webvowl.modules.nodeScalingSwitch = function (graph) {

	var filter = {},
		nodes,
		properties,
		enabled = true,
		filteredNodes,
		filteredProperties;


	/**
	 * If enabled, the scaling of nodes according to instances will be enabled.
	 * @param untouchedNodes
	 * @param untouchedProperties
	 */
	filter.filter = function (untouchedNodes, untouchedProperties) {
		nodes = untouchedNodes;
		properties = untouchedProperties;

		graph.options().scaleNodesByInstances(enabled);

		filteredNodes = nodes;
		filteredProperties = properties;
	};

	filter.enabled = function (p) {
		if (!arguments.length) return enabled;
		enabled = p;
		return filter;
	};


	// Functions a filter must have
	filter.filteredNodes = function () {
		return filteredNodes;
	};

	filter.filteredProperties = function () {
		return filteredProperties;
	};


	return filter;
};
