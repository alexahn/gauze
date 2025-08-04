import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
	{
		ignores: ["src/views/gauze/v1/build", "src/views/gauze/v2/build", "src/views/project/build"],
	},
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
	pluginJs.configs.recommended,
	pluginReactConfig,
	{
		rules: {
			"no-unexpected-multiline": "off",
			"no-unused-vars": "off",
			"no-undef": "off",
			"no-empty": "off",
		},
	},
];
