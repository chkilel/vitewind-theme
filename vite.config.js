import WindiCSS from 'vite-plugin-windicss'

import {resolve} from 'path'

export default ({command}) => ({
    base: command === 'serve' ? '' : '/themes/vitewind/public/build/',
    publicDir: 'fake_dir_so_nothing_gets_copied',
    processCssUrls: true,
    build: {
        manifest: true,
        outDir: 'public/build',
        rollupOptions: {
            input: [
                'resources/js/app.js',
                'resources/js/home.js'
            ],
        },
    },
    plugins: [
        WindiCSS(),
        {
            name: 'reload-template',
            handleHotUpdate({file, server}) {
                if (file.endsWith('.htm')) {
                    server.ws.send({
                        type: 'full-reload',
                        path: '*',
                    });
                }
            },
        },

    ],

    // See https://dev.to/jarraga/comment/1c7ok
    // resolve: {
    //     alias: {
    //         '@': resolve(__dirname, './resources/js')
    //     }
    // }
});
