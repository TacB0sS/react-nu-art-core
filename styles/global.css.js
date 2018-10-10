/**
 * Created by tacb0ss on 08/10/2018.
 */


const createDimension = (width, height) => {
	return {width: width, height: height};
};

const createSpacing = (propType, type, t, r = t, b = r, l = b) => {
	const toRet = {};

	switch (type) {
		case general.All:
			toRet[propType] = t;
			break;

		case general.Bounds:
			toRet[`${propType}Left`] = l;
			toRet[`${propType}Right`] = r;
			toRet[`${propType}Top`] = t;
			toRet[`${propType}Bottom`] = b;
			break;

		case general.Horizontal:
			toRet[`${propType}Right`] = r;
			toRet[`${propType}Left`] = l;
			break;

		case general.Vertical:
			toRet[`${propType}Top`] = t;
			toRet[`${propType}Bottom`] = b;
			break;

		default:
			throw new Error(`Unknown margin type: ${type}`)
	}

};

const createLinearLayout = (orientation, alignItems, justifyContent, wrap, reverse) => {
	const getAlignItems = function (align) {
		switch (align) {
			case general.Start:
			case general.Top:
				return "flex-start";

			case general.End:
			case general.Bottom:
				return "flex-end";

			case general.Center:
				return "center";

			case general.Stretch:
				return "stretch";

			default:
				throw new Error(`Unknown alignItems: ${align}`)
		}
	};

	const getJustifyContent = function (content) {
		switch (content) {
			case general.Start:
				return "flex-start";

			case general.End:
				return "flex-end";

			case general.Center:
				return "center";

			case general.Between:
				return "space-between";

			case general.Around:
				return "space-around";

			case general.Evenly:
				return "space-evenly";

			default:
				throw new Error(`Unknown justifyContent: ${content}`)
		}
	};

	const toRet = {
		display: "flex",
		flexFlow: orientation === general.Vertical ? "column" : "row",
		flexWrap: wrap,
	};

	toRet.flexDirection = reverse ? toRet.flexFlow + "-reverse" : toRet.flexFlow;
	toRet.alignItems = getAlignItems(alignItems);
	toRet.justifyContent = getJustifyContent(justifyContent);

	return toRet;
};

const createStyle = (key, creator, ...args) => {
	let key = `${key}-${args.join("-")}`;

	let toRet = general.cache[key];
	if (toRet)
		return toRet;

	toRet = creator(args);
	toRet.freeze();
	return general.cache[key] = toRet;
};

let general = {
	cache: {},

	/*
	 * Orientation
	 */
	All: "All",
	Bounds: "Bounds",
	Horizontal: "Horizontal",
	Vertical: "Vertical",

	/*
	 * Alignment
	 */
	Start: "Start",
	End: "End",
	Top: "Top",
	Bottom: "Bottom",
	Center: "Center",
	Stretch: "Stretch",

	/*
	 * Spacing
	 */
	Between: "Between",
	Around: "Around",
	Evenly: "Evenly",

	/*
	 * Wrapping
	 */
	NoWrap: "nowrap",
	Wrap: "wrap",
	Reverse: "Reverse",

	LinearLayout: (orientation = general.Horizontal, alignItems = general.Center, justifyContent = general.Center, wrap = false, reverse = false) => {
		return createStyle("LinearLayout", createLinearLayout, orientation, alignItems, justifyContent, wrap, reverse);
	},

	Dimension(width, height) {
		return createStyle("Dimension", createDimension, width, height);
	},

	Margin(type, top, right, bottom, left) {
		return createStyle("Margin", createSpacing, "margin", type, top, right, bottom, left);
	},

	Padding(type, top, right, bottom, left) {
		return createStyle("Padding", createSpacing, "padding", type, top, right, bottom, left);
	},

	Border() {

	},

	Animate() {

	},

};

export default general
