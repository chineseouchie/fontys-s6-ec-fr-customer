const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		supportFile: false,
		videoUploadOnPasses: false,
	},
	component: {
		supportFile: false,
		videoUploadOnPasses: false
	},
});
