const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		supportFile: false,
		videoUploadOnPasses: false,
	},
	env: {
		baseUrl: "http://localhost"
	},
	component: {
		supportFile: false,
		videoUploadOnPasses: false
	},
});
