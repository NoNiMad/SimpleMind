import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	base: "/SimpleMind/",
	build: {
		minify: false
	},
  	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: tag => [ "svg-icon" ].includes(tag)
				}
			}
		})
	],
})
